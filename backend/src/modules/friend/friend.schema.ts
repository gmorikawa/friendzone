import mongoose, { HydratedDocument } from "mongoose";

import { Prop, Schema, SchemaFactory, Virtual } from "@nestjs/mongoose";
import { User } from "../user/user.schema";
import { FriendStatus } from "./friend.enum";

export type FriendDocument = HydratedDocument<Friend>;

@Schema({
    timestamps: true,
    toJSON: {
        virtuals: true,
        versionKey: false,
        transform: (_doc, ret: Record<string, any>) => {
            delete ret._id;
        },
    },
    collection: "friends",
})
export class Friend {
    @Virtual({
        get: function (this: FriendDocument) {
            return this._id.toString();
        },
    })
    id: string;

    @Prop({
        type: String,
        enum: FriendStatus,
        default: FriendStatus.REQUESTED,
    })
    status: FriendStatus;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: User.name,
        required: true,
    })
    user: User | string;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: User.name,
        required: true,
    })
    partner: User | string;

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

export const FriendSchema = SchemaFactory
    .createForClass(Friend)
    .index({ user: 1, partner: 1 }, { unique: true });
export const FriendFeature = { name: Friend.name, schema: FriendSchema };
