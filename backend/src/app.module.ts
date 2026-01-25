import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

import { UserModule } from "./modules/user/user.module";
import { AuthModule } from './modules/auth/auth.module';
import { PostModule } from './modules/post/post.module';
import { AuthorizationMiddleware } from "./common/middlewares/authorization.middleware";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        MongooseModule.forRoot(process.env.MONGO_URI ?? ""),
        AuthModule,
        UserModule,
        PostModule,
    ],
    controllers: [
        AppController
    ],
    providers: [
        AppService
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthorizationMiddleware)
            .exclude(
                "/api/auth/sign-up",
                "/api/auth/log-in",
                "/api/auth/confirm-email",
                "/api/auth/password-reset",
            )
            .forRoutes("*");
    }
}
