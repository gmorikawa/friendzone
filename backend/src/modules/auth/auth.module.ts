import { Module } from "@nestjs/common";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserModule } from "../user/user.module";
import { JwtTokenGenerator } from "../../common/token-generator/jwt.token-generator";

@Module({
    imports: [
        UserModule
    ],
    controllers: [
        AuthController
    ],
    providers: [
        AuthService,
        {
            provide: "TokenGenerator",
            useClass: JwtTokenGenerator
        }
    ]
})
export class AuthModule { }
