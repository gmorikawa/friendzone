import { Model } from "mongoose";

import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { User, UserDocument } from "./user.schema";
import { CreateUserDTO, UpdateUserDTO } from "./user.dto";
import type { HashedPassword, PasswordHasher, PlainPassword } from "./interfaces/password-hasher.interface";
import { EmailAlreadyExistsError } from "./user.errors";
import { LoggedUser } from "./interfaces/logged-user.interface";
import { UserStatus } from "./user.enum";

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private model: Model<User>,
        @Inject("PasswordHasher") private passwordHasher: PasswordHasher,
    ) { }

    public async findByEmail(email: string, excludeUserId?: string): Promise<UserDocument | null> {
        return this.model.findOne({ email, _id: { $ne: excludeUserId } });
    }

    public async findAll(loggedUser: LoggedUser): Promise<UserDocument[]> {
        return this.model.find({ status: UserStatus.ACTIVE })
            .populate({
                path: "friendship",
                justOne: true,
                match: {
                    "user": loggedUser.id
                },
            });
    }

    public async findById(id: string): Promise<UserDocument | null> {
        const user = await this.model.findById(id);

        return user;
    }

    public async create(createUser: CreateUserDTO): Promise<UserDocument> {
        if (await this.findByEmail(createUser.email)) {
            throw new EmailAlreadyExistsError(createUser.email);
        }

        const createdUser = new this.model({
            name: createUser.name,
            email: createUser.email,
            password: await this.passwordHasher.hash(createUser.password),
        });

        return createdUser.save();
    }

    public async update(id: string, updateUser: UpdateUserDTO): Promise<UserDocument | null> {
        const user = await this.model.findById(id);

        if (!user) {
            return null;
        }

        const validPassword = await this.checkPassword(updateUser.currentPassword, user.password);

        if (!validPassword) {
            return null;
        }

        if (await this.findByEmail(updateUser.email, id)) {
            throw new EmailAlreadyExistsError(updateUser.email);
        }

        user.email = updateUser.email ?? user.email;
        user.name.first = updateUser.name?.first ?? user.name.first;
        user.name.last = updateUser.name?.last ?? user.name.last;
        user.biography = updateUser.biography ?? user.biography;

        if (updateUser.password
            && updateUser.password.length > 0
            && updateUser.password === updateUser.confirmPassword
        ) {
            user.password = await this.passwordHasher.hash(updateUser.password);
        }

        return user.save();
    }

    public async changePassword(id: string, newPassord: PlainPassword): Promise<UserDocument | null> {
        const hashedPassword = await this.passwordHasher.hash(newPassord);

        return this.model.findByIdAndUpdate(id, { password: hashedPassword }, { returnDocument: "after" });
    }

    public async checkPassword(password: PlainPassword, hashedPassword: HashedPassword): Promise<boolean> {
        return this.passwordHasher.compare(password, hashedPassword);
    }

    public async activateUser(id: string): Promise<UserDocument | null> {
        return this.model.findByIdAndUpdate(id, { status: "ACTIVE" }, { returnDocument: "after" });
    }
}
