import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

import { UserModule } from "./modules/user/user.module";
import { AuthController } from './modules/auth/auth.controller';
import { AuthService } from './modules/auth/auth.service';
import { AuthModule } from './modules/auth/auth.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        MongooseModule.forRoot(process.env.MONGO_URI ?? ""),
        UserModule,
        AuthModule,
    ],
    controllers: [
        AppController,
        AuthController,
    ],
    providers: [
        AppService,
        AuthService,
    ],
})
export class AppModule { }
