import { Inject, Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { CreateUserDTO } from "../user/dtos/create-user.dto";
import { User, UserDocument } from "../user/user.schema";
import { UserSession } from "./interfaces/user-session.interface";
import { AuthenticationError, InvalidConfirmationToken } from "./auth.errors";
import type { TokenGenerator } from "./interfaces/token.interface";
import { LoggedUser } from "../user/interfaces/logged-user.interface";
import type { MailSender } from "../../common/mail-sender/interfaces/mail-sender.interface";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        @Inject("TokenGenerator") private tokenGenerator: TokenGenerator,
        @Inject("MailSender") private mailSender: MailSender,
    ) { }

    public async signUp(createUser: CreateUserDTO): Promise<UserDocument> {
        const user = await this.userService.create(createUser);

        this.sendConfirmationEmail(user);

        return user;
    }

    public async confirmEmail(token: string): Promise<boolean> {
        const secretKey = process.env.JWT_SECRET_KEY as string;
        const payload = await this.tokenGenerator.verify<LoggedUser>("confirm_email", token, secretKey);

        const user = await this.userService.findByEmail(payload.email);

        if (!user) {
            throw new InvalidConfirmationToken();
        }

        await this.userService.activateUser(user.id);

        return true;
    }

    public async logIn(email: string, password: string): Promise<UserSession> {
        const user = await this.userService.findByEmail(email);

        if (!user) {
            throw new AuthenticationError();
        }

        const isPasswordValid = await this.userService.checkPassword(password, user.password);

        if (!isPasswordValid) {
            throw new AuthenticationError();
        }

        const loggedUser: LoggedUser = {
            id: user.id,
            name: user.name,
            email: user.email,
        };
        const secretKey = process.env.JWT_SECRET_KEY as string;
        const expiresIn = 1000 * 60 * 60 * 24 * 7;

        const token = await this.tokenGenerator.issue<LoggedUser>(
            "authentication",
            loggedUser,
            secretKey,
            expiresIn
        );

        return { loggedUser, token};
    }

    private async sendConfirmationEmail(user: User): Promise<void> {
        const secretKey = process.env.JWT_SECRET_KEY as string;
        const expiresIn = 1000 * 60 * 60 * 24 * 7;

        const loggedUser: LoggedUser = {
            id: user.id,
            name: user.name,
            email: user.email,
        }

        const token = await this.tokenGenerator.issue<LoggedUser>("confirm_email", loggedUser, secretKey, expiresIn);
        const frontendUrl = process.env.FRONTEND_URL as string;
        const confirmationLink = `${frontendUrl}/auth/confirm-email?token=${token}`;

        return this.mailSender.send(
            user.email,
            "Activate your account!",
            `Hello ${user.name.first},<br><br>` +
                `Thank you for signing up! We're excited to have you on board.<br>` +
                `Please confirm your email by clicking the following link: <br><br>
                <a href="${confirmationLink}">${confirmationLink}</a><br><br>` +
                `Best regards,<br>` +
                `The Team`
        );
    }
}
