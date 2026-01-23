import { Body, Controller, Post } from "@nestjs/common";

import { AuthService } from "./auth.service";
import type { CreateUserDTO } from "../user/dtos/create-user.dto";
import { User } from "../user/user.schema";

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
}
