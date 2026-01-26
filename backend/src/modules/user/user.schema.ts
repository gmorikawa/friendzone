import { HydratedDocument } from "mongoose";

import { Prop, raw, Schema, SchemaFactory, Virtual } from "@nestjs/mongoose";

import type { Name } from "./interfaces/name.interface";
import { UserStatus } from "./user.enum";
import { Friend } from "../friend/friend.schema";

export type UserDocument = HydratedDocument<User>;

@Schema({
    timestamps: true,
    toJSON: {
        virtuals: true,
        versionKey: false,
        transform: (_doc, ret: Record<string, any>) => {
            delete ret._id;
        },
    },
    collection: "users",
})
export class User {
    @Virtual({
        get: function (this: UserDocument) {
            return this._id.toString();
        },
    })
    id: string;

    @Prop({
        type: String,
        enum: UserStatus,
        default: UserStatus.INACTIVE,
    })
    status: UserStatus;

    @Prop(raw({
        first: {
            type: String,
            required: true,
            trim: true,
        },
        last: {
            type: String,
            required: true,
            trim: true,
        },
    }))
    name: Name;

    @Prop({
        unique: true,
        required: true,
        trim: true,
    })
    email: string;

    @Prop({
        required: true,
    })
    password: string;

    @Prop({
        required: false,
        default: "",
    })
    biography: string;

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

    friendship?: Friend;
}

const UserSchema = SchemaFactory.createForClass(User);
UserSchema
    .virtual("friendship", {
        ref: "Friend",
        localField: "_id",
        foreignField: "partner"
    });

export { UserSchema }
export const UserFeature = { name: User.name, schema: UserSchema };
