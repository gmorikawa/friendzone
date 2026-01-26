import { Body, Controller, Get, Param, Post, Put, Req } from "@nestjs/common";

import type { CreateUserDTO, UpdateUserDTO } from "./user.dto";
import type {  } from "./user.dto";
import { User, UserDocument } from "./user.schema";
import { UserService } from "./user.service";
import { UserNotFoundError } from "./user.errors";
import { LoggedUser } from "./interfaces/logged-user.interface";

@Controller("api/users")
export class UserController {

    constructor(
        private service: UserService
    ) { }

    @Get()
    public async findAll(
        @Req() { user }: Request & { user: LoggedUser }
    ): Promise<User[]> {
        return this.service.findAll(user)
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

    @Put(":id")
    public async update(
        @Param("id") id: string,
        @Body() user: UpdateUserDTO
    ): Promise<User> {
        return this.service.update(id, user)
            .then((user: UserDocument | null) => {
                if (!user) {
                    throw new UserNotFoundError(id);
                }

                return user.toJSON();
            });
    }

}
