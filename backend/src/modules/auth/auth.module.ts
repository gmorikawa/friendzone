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
            useValue: new NodemailerMailSender(
                process.env.SMTP_HOST ?? "",
                Number(process.env.SMTP_PORT) || 587,
                process.env.SMTP_USER ?? "",
                process.env.SMTP_PASS ?? "",
            )
        }
    ]
})
export class AuthModule { }
