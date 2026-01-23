import { Body, Controller, Patch, Post, Put } from "@nestjs/common";

import { AuthService } from "./auth.service";
import type { CreateUserDTO } from "../user/dtos/create-user.dto";
import { User } from "../user/user.schema";
import type { UserSession } from "./interfaces/user-session.interface";
import type { Token } from "./interfaces/token.interface";

@Controller("auth")
export class AuthController {
    
    constructor(
        private service: AuthService
    ) { }

    @Post("sign-up")
    public async signUp(
        @Body("user") createUser: CreateUserDTO
    ): Promise<User> {
        return this.service.signUp(createUser);
    }

    @Post("log-in")
    public async logIn(
        @Body("email") email: string,
        @Body("password") password: string
    ): Promise<UserSession> {
        return this.service.logIn(email, password);
    }

    @Patch("confirm-email")
    public async confirmEmail(
        @Body("token") token: Token
    ): Promise<boolean> {
        return this.service.confirmEmail(token);
    }
}
