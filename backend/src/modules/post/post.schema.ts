import mongoose, { HydratedDocument } from "mongoose";

import { Prop, raw, Schema, SchemaFactory, Virtual } from "@nestjs/mongoose";
import { User } from "../user/user.schema";
import { Comment } from "./post.interface";

export type PostDocument = HydratedDocument<Post>;

@Schema({
    timestamps: true,
    toJSON: {
        virtuals: true,
        versionKey: false,
        transform: (_doc, ret: Record<string, any>) => {
            ret.id = ret._id.toString();
            delete ret._id;
        },
    },
    collection: "posts",
})
export class Post {
    @Virtual({
        get: function (this: PostDocument) {
            return this._id.toString();
        },
    })
    id: string;

    @Prop({
        type: String,
        minLength: 1,
        maxLength: 255,
        required: true,
        trim: true,
    })
    content: string;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: User.name,
        required: true,
    })
    createdBy: User;

    @Prop(raw([{
        content: {
            type: String,
            required: true,
            trim: true,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: User.name,
            required: true,
        },
        createdAt: {
            type: Date,
            default: () => new Date(),
        },
    }]))
    comments: Comment[];

    @Prop({
        type: Date,
        default: () => new Date(),
    })
    createdAt: Date;

    @Prop({
        type: Date,
        default: () => new Date(),
    })
    updatedAt: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);
export const PostFeature = { name: Post.name, schema: PostSchema };