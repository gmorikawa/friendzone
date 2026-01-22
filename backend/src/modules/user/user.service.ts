import { Model } from "mongoose";

import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { UserModel } from "./user.schema";
import { CreateUserDTO } from "./dtos/create-user.dto";
import type { PasswordHasher } from "src/common/password-hasher/interfaces/password-hasher.interface";
import { EmailAlreadyExistsError } from "./user.errors";

@Injectable()
export class UserService {
    constructor(
        @InjectModel(UserModel.name) private model: Model<UserModel>,
        @Inject("PasswordHasher") private passwordHasher: PasswordHasher,
    ) { }

    public async findByEmail(email: string): Promise<UserModel | null> {
        return this.model.findOne({ email });
    }

    public async findAll(): Promise<UserModel[]> {
        return this.model.find();
    }

    public async create(createUser: CreateUserDTO): Promise<UserModel> {
        const existingUser = await this.findByEmail(createUser.email);

        if (existingUser) {
            throw new EmailAlreadyExistsError(createUser.email);
        }

        const createdUser = new this.model({
            name: createUser.name,
            email: createUser.email,
            password: await this.passwordHasher.hash(createUser.password),
        });

        return createdUser.save()
            .then(user => user.toJSON());
    }
}
