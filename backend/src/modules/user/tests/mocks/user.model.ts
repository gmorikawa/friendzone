import { User } from "../../user.schema";

export class UserModel {
    private static users: User[] = [];
    protected entity: User;

    constructor(createUser: User) {
        this.entity = createUser;
    }

    static async findOne({ email }: { email: string }): Promise<User | null> {
        return UserModel.users.find((user) => user.email === email) ?? null;
    }

    static async find(): Promise<User[]> {
        return UserModel.users;
    }

    async save(): Promise<User> {
        UserModel.users.push(this.entity);

        return this.entity;
    }
}
