import { Model } from "mongoose";

import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { User, UserDocument } from "./user.schema";
import { CreateUserDTO } from "./dtos/create-user.dto";
import type { HashedPassword, PasswordHasher, PlainPassword } from "./interfaces/password-hasher.interface";
import { EmailAlreadyExistsError, UserNotFoundError } from "./user.errors";

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private model: Model<User>,
        @Inject("PasswordHasher") private passwordHasher: PasswordHasher,
    ) { }

    public async findByEmail(email: string): Promise<UserDocument | null> {
        return this.model.findOne({ email });
    }

    public async findAll(): Promise<UserDocument[]> {
        return this.model.find();
    }

    public async findById(id: string): Promise<UserDocument | null> {
        const user = await this.model.findById(id);

        return user;
    }

    public async create(createUser: CreateUserDTO): Promise<UserDocument> {
        const existingUser = await this.findByEmail(createUser.email);

        if (existingUser) {
            throw new EmailAlreadyExistsError(createUser.email);
        }

        const createdUser = new this.model({
            name: createUser.name,
            email: createUser.email,
            password: await this.passwordHasher.hash(createUser.password),
        });

        return createdUser.save();
    }

    public async checkPassword(password: PlainPassword, hashedPassword: HashedPassword): Promise<boolean> {
        return this.passwordHasher.compare(password, hashedPassword);
    }

    public async activateUser(id: string): Promise<UserDocument | null> {
        return this.model.findByIdAndUpdate(id, { status: "ACTIVE" }, { returnDocument: "after" });
    }
}
