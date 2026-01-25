import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { CreatePostDTO } from "./post.dto";
import { Post } from "./post.schema";
import { LoggedUser } from "../user/interfaces/logged-user.interface";
import { UnauthorizedAccessError } from "../auth/auth.errors";

@Injectable()
export class PostService {
    constructor(
        @InjectModel(Post.name) private model: Model<Post>,
    ) { }

    public async create(loggedUser: LoggedUser, createPost: CreatePostDTO) {
        if (createPost.createdBy !== loggedUser.id) {
            throw new UnauthorizedAccessError();
        }

        const createdPost = new this.model({
            content: createPost.content,
            createdBy: createPost.createdBy,
        });

        return createdPost.save();
    }
}
