import { Inject, Injectable } from "@nestjs/common";

import { UserService } from "../user/user.service";
import { CreateUserDTO } from "../user/dtos/create-user.dto";
import { UserDocument } from "../user/user.schema";
import { UserSession } from "./interfaces/user-session.interface";
import { AuthenticationError, InvalidConfirmationToken } from "./auth.errors";
import type { SecretKey, Token, TokenGenerator } from "./interfaces/token.interface";
import { LoggedUser } from "../user/interfaces/logged-user.interface";
import type { MailSender } from "../../common/mail-sender/interfaces/mail-sender.interface";
import { TokenContext } from "./enums/token-context";
import { PlainPassword } from "../user/interfaces/password-hasher.interface";

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

    public async confirmEmail(token: Token): Promise<boolean> {
        const secretKey = process.env.JWT_SECRET_KEY as SecretKey;
        const payload = await this.tokenGenerator.verify<LoggedUser>(TokenContext.CONFIRM_EMAIL, token, secretKey);

        const user = await this.userService.findById(payload.id);

        if (!user) {
            throw new InvalidConfirmationToken();
        }

        return this.userService.activateUser(payload.id)
            .then(() => true);
    }

    public async requestPasswordReset(email: string): Promise<boolean> {
        const user = await this.userService.findByEmail(email);

        if (user) {
            this.sendPasswordResetEmail(user);
        }

        return true;
    }

    public async resetPassword(token: Token, password: PlainPassword): Promise<boolean> {
        const secretKey = process.env.JWT_SECRET_KEY as SecretKey;
        const payload = await this.tokenGenerator.verify<LoggedUser>(TokenContext.RESET_PASSWORD, token, secretKey);

        const user = await this.userService.findById(payload.id);

        if (!user) {
            throw new InvalidConfirmationToken();
        }

        return this.userService.changePassword(payload.id, password)
            .then(() => true);
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
            id: user._id?.toString(),
            name: user.name,
            email: user.email,
        };
        const secretKey = process.env.JWT_SECRET_KEY as SecretKey;
        const expiresIn = 1000 * 60 * 60 * 24 * 7;

        const token = await this.tokenGenerator.issue<LoggedUser>(
            TokenContext.AUTHENTICATION,
            loggedUser,
            secretKey,
            expiresIn
        );

        return { loggedUser, token};
    }

    private async sendConfirmationEmail(user: UserDocument): Promise<void> {
        const secretKey = process.env.JWT_SECRET_KEY as SecretKey;
        const expiresIn = 1000 * 60 * 60 * 24 * 7;

        const loggedUser: LoggedUser = {
            id: user._id?.toString(),
            name: user.name,
            email: user.email,
        };

        const token = await this.tokenGenerator.issue<LoggedUser>(TokenContext.CONFIRM_EMAIL, loggedUser, secretKey, expiresIn);
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

    private async sendPasswordResetEmail(user: UserDocument): Promise<void> {
        const secretKey = process.env.JWT_SECRET_KEY as string;
        const expiresIn = 1000 * 60 * 60 * 24 * 7;

        const loggedUser: LoggedUser = {
            id: user._id?.toString(),
            name: user.name,
            email: user.email,
        };

        const token = await this.tokenGenerator.issue<LoggedUser>(TokenContext.RESET_PASSWORD, loggedUser, secretKey, expiresIn);
        const frontendUrl = process.env.FRONTEND_URL as string;
        const passwordResetLink = `${frontendUrl}/auth/password-recovery?token=${token}`;

        return this.mailSender.send(
            user.email,
            "Reset your password!",
            `Hello ${user.name.first},<br><br>` +
                `Thank you for requesting a password reset.<br>` +
                `Please reset your password by clicking the following link: <br><br>
                <a href="${passwordResetLink}">${passwordResetLink}</a><br><br>` +
                `Best regards,<br>` +
                `The Team`
        );
    }
}
