import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { CreateCommentDTO, CreatePostDTO, UpdatePostDTO } from "./post.dto";
import { Post, PostDocument } from "./post.schema";
import { LoggedUser } from "../user/interfaces/logged-user.interface";
import { UnauthorizedAccessError } from "../auth/auth.errors";
import { ContentTooLongError, EmptyPostContentError, PostNotFoundError } from "./post.error";

@Injectable()
export class PostService {
    constructor(
        @InjectModel(Post.name) private model: Model<Post>,
    ) { }

    public async findAll(): Promise<PostDocument[]> {
        return this.model.find()
            .populate("createdBy", "-password -createdAt -updatedAt -biography -status")
            .sort({ "createdAt": -1 })
            .populate("comments.createdBy", "-password -createdAt -updatedAt -biography -status");
    }

    public async findById(id: string): Promise<PostDocument | null> {
        return this.model.findById(id)
            .populate("createdBy", "-password -createdAt -updatedAt -biography -status")
            .populate("comments.createdBy", "-password -createdAt -updatedAt -biography -status");
    }

    public async create(loggedUser: LoggedUser, createPost: CreatePostDTO) {
        if (createPost.createdBy !== loggedUser.id) {
            throw new UnauthorizedAccessError();
        }

        const content = createPost.content?.trim();
        if (!content || content.length === 0) {
            throw new EmptyPostContentError();
        }

        if (content.length > 255) {
            throw new ContentTooLongError(255);
        }

        const createdPost = new this.model({
            content: content,
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

        const content = updatePost.content?.trim();
        if (!content || content.length === 0) {
            throw new EmptyPostContentError();
        }

        if (content.length > 255) {
            throw new ContentTooLongError(255);
        }

        post.content = content;

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

    public async addComment(loggedUser: LoggedUser, id: string, comment: CreateCommentDTO) {
        const post = await this.model.findById(id);

        if (!post) {
            throw new PostNotFoundError(id);
        }

        post.comments = [
            {
                content: comment?.content,
                createdBy: loggedUser?.id,
                createdAt: new Date(),
            },
            ...post.comments
        ];

        return post.save()
            .then((updatedPost) => {
                return this.model.findById(updatedPost.id)
                    .populate("createdBy", "-password -createdAt -updatedAt -biography -status")
                    .populate("comments.createdBy", "-password -createdAt -updatedAt -biography -status");
            });
    }
}
