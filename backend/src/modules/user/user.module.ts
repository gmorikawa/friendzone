import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { BcryptPasswordHasher } from "src/common/password-hasher/bcrypt.password-hasher";

import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserFeature } from "./user.schema";

@Module({
    imports: [
        MongooseModule.forFeature([UserFeature])
    ],
    controllers: [
        UserController,
    ],
    providers: [
        UserService,
        {
            provide: "PasswordHasher",
            useClass: BcryptPasswordHasher,
        }
    ]
})
export class UserModule { }
