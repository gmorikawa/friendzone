import { HydratedDocument } from "mongoose";

import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";

import type { Name } from "./interfaces/name.interface";
import { UserStatus } from "./enums/status.enum";

export type UserDocument = HydratedDocument<User>;

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
    collection: "users",
})
export class User {
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
}

export const UserSchema = SchemaFactory.createForClass(User);
export const UserFeature = { name: User.name, schema: UserSchema };
