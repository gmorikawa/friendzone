import { Inject, Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { CreateUserDTO } from "../user/dtos/create-user.dto";
import { UserDocument } from "../user/user.schema";
import { UserSession } from "./interfaces/user-session.interface";
import { AuthenticationError } from "./auth.errors";
import type { TokenGenerator } from "./interfaces/token.interface";
import { LoggedUser } from "../user/interfaces/logged-user.interface";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        @Inject("TokenGenerator") private tokenGenerator: TokenGenerator
    ) { }

    public async signUp(createUser: CreateUserDTO): Promise<UserDocument> {
        return this.userService.create(createUser);
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
            loggedUser,
            secretKey,
            expiresIn
        );

        return { loggedUser, token};
    }
}
