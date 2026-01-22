import { HydratedDocument } from "mongoose";

import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";

import type { Name } from "./interfaces/name.interface";

export type UserDocument = HydratedDocument<UserModel>;

@Schema({
    timestamps: true,
    toJSON: {
        virtuals: true,
        versionKey: false,
        transform: (_doc, ret: Record<string, any>) => {
            delete ret._id;
            delete ret.password;
        },
    },
    collection: "users",
})
export class UserModel {
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
        select: false,
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

export const UserSchema = SchemaFactory.createForClass(UserModel);
export const UserFeature = { name: UserModel.name, schema: UserSchema };
