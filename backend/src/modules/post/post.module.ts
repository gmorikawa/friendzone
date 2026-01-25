import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { PostController } from "./post.controller";
import { PostService } from "./post.service";
import { PostFeature } from "./post.schema";

@Module({
    imports: [
        MongooseModule.forFeature([PostFeature])
    ],
    exports: [
        PostService
    ],
    controllers: [
        PostController
    ],
    providers: [
        PostService
    ]
})
export class PostModule { }
