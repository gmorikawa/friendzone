import { Body, Controller, Get, Param, Post } from "@nestjs/common";

import type { CreateUserDTO } from "./dtos/create-user.dto";
import { User, UserDocument } from "./user.schema";
import { UserService } from "./user.service";
import { UserNotFoundError } from "./user.errors";

@Controller("users")
export class UserController {

    constructor(
        private service: UserService
    ) { }

    @Get()
    public async findAll(): Promise<User[]> {
        return this.service.findAll()
            .then((users) => users.map((user) => user.toJSON()));
    }

    @Get(":id")
    public async findById(
        @Param("id") id: string
    ): Promise<User> {
        return this.service.findById(id)
            .then((user: UserDocument | null) => {
                if (!user) {
                    throw new UserNotFoundError(id);
                }

                return user.toJSON();
            });
    }

    @Post()
    public async create(
        @Body("user") createUser: CreateUserDTO
    ): Promise<User> {
        return this.service.create(createUser)
            .then((user) => user.toJSON());
    }

}
