import { Module } from "@nestjs/common";
import { FriendController } from "./friend.controller";
import { FriendService } from "./friend.service";
import { MongooseModule } from "@nestjs/mongoose";
import { FriendFeature } from "./friend.schema";

@Module({
    imports: [
        MongooseModule.forFeature([FriendFeature])
    ],
    exports: [
        FriendService
    ],
    controllers: [
        FriendController
    ],
    providers: [
        FriendService
    ]
})
export class FriendModule {}
