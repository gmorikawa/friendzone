import { CreateUserDTO } from "../../../../modules/user/user.dto";
import { User } from "../../../..//modules/user/user.schema";

export class MockUserService {
    async create(createUserDto: CreateUserDTO): Promise<User> {
        return {
            name: createUserDto.name,
            email: createUserDto.email,
            password: createUserDto.password,
        } as User;
    }
}
