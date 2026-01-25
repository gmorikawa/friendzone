import { Module } from "@nestjs/common";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserModule } from "../user/user.module";
import { JwtTokenGenerator } from "../../common/token-generator/jwt.token-generator";
import { NodemailerMailSender } from "../../common/mail-sender/nodemailer.mail-sender";

@Module({
    imports: [
        UserModule
    ],
    exports: [
        {
            provide: "TokenGenerator",
            useClass: JwtTokenGenerator
        },
    ],
    controllers: [
        AuthController
    ],
    providers: [
        AuthService,
        {
            provide: "TokenGenerator",
            useClass: JwtTokenGenerator
        },
        {
            provide: "MailSender",
            useClass: NodemailerMailSender
        }
    ]
})
export class AuthModule { }
