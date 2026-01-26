import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

import { UserModule } from "./modules/user/user.module";
import { AuthModule } from './modules/auth/auth.module';
import { PostModule } from './modules/post/post.module';
import { AuthorizationMiddleware } from "./common/middlewares/authorization.middleware";
import { FriendModule } from './modules/friend/friend.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        MongooseModule.forRoot(process.env.MONGO_URI ?? ""),
        AuthModule,
        UserModule,
        PostModule,
        FriendModule,
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
                { path: "api/auth/sign-up", method: RequestMethod.POST },
                { path: "api/auth/log-in", method: RequestMethod.POST },
                { path: "api/auth/password-reset", method: RequestMethod.POST },
                { path: "api/auth/confirm-email", method: RequestMethod.PATCH },
                { path: "api/auth/password-reset", method: RequestMethod.PATCH },
            )
            .forRoutes("*");
    }
}
