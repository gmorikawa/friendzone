import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { CreatePostDTO, UpdatePostDTO } from "./post.dto";
import { Post, PostDocument } from "./post.schema";
import { LoggedUser } from "../user/interfaces/logged-user.interface";
import { UnauthorizedAccessError } from "../auth/auth.errors";
import { PostNotFoundError } from "./post.error";

@Injectable()
export class PostService {
    constructor(
        @InjectModel(Post.name) private model: Model<Post>,
    ) { }

    public async findAll(): Promise<PostDocument[]> {
        return this.model.find()
            .populate("createdBy", "-password -createdAt -updatedAt -biography -status")
            .sort({ "createdAt": -1 });
    }

    public async findById(id: string): Promise<PostDocument | null> {
        return this.model.findById(id)
            .populate("createdBy", "-password -createdAt -updatedAt -biography -status");
    }

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

    public async update(loggedUser: LoggedUser, id: string, updatePost: UpdatePostDTO) {
        const post = await this.model.findById(id)
            .populate("createdBy", "-password -createdAt -updatedAt -biography -status");
        
        if (!post) {
            throw new PostNotFoundError(id);
        }

        if (post.createdBy.id !== loggedUser.id) {
            throw new UnauthorizedAccessError();
        }

        post.content = updatePost.content;

        return post.save();
    }

    public async delete(loggedUser: LoggedUser, id: string) {
        const post = await this.model.findById(id)
            .populate("createdBy", "-password -createdAt -updatedAt -biography -status");
        
        if (!post) {
            throw new PostNotFoundError(id);
        }

        if (post.createdBy.id !== loggedUser.id) {
            throw new UnauthorizedAccessError();
        }

        return this.model.findByIdAndDelete(id);
    }
}
