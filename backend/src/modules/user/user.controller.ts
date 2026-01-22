import { Body, Controller, Get, Post } from "@nestjs/common";

import type { CreateUserDTO } from "./dtos/create-user.dto";
import { UserModel } from "./user.schema";
import { UserService } from "./user.service";

@Controller("users")
export class UserController {

    constructor(
        private service: UserService
    ) { }

    @Get()
    public async findAll(): Promise<UserModel[]> {
        return this.service.findAll();
    }

    @Post()
    public async create(
        @Body("user") createUser: CreateUserDTO
    ): Promise<UserModel> {
        return this.service.create(createUser);
    }

}
