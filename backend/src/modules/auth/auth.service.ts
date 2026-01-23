import { Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { CreateUserDTO } from "../user/dtos/create-user.dto";
import { UserDocument } from "../user/user.schema";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService
    ) { }

    public async signUp(createUser: CreateUserDTO): Promise<UserDocument> {
        return this.userService.create(createUser);
    }
}
