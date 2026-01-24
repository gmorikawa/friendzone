import { UserStatus } from "../../enums/status.enum";
import { User } from "../../user.schema";

export class UserModel {
    private static users: User[] = [];
    protected entity: User;

    constructor(createUser: User) {
        this.entity = createUser;
    }

    static async findById(id: string): Promise<User | null> {
        return UserModel.users.find((user) => user.id === id) ?? null;
    }

    static async findByIdAndUpdate(id: string, update: Partial<User>): Promise<User | null> {
        const userIndex = UserModel.users.findIndex((user) => user.id === id);
        if (userIndex === -1) {
            return null;
        }

        UserModel.users[userIndex] = {
            ...UserModel.users[userIndex],
            ...update,
        };

        return UserModel.users[userIndex];
    }

    static async findOne({ email }: { email: string }): Promise<User | null> {
        return UserModel.users.find((user) => user.email === email) ?? null;
    }

    static async find(): Promise<User[]> {
        return UserModel.users;
    }

    static async reset(): Promise<void> {
        UserModel.users = [];
    }

    async save(): Promise<User> {
        this.entity.id = (UserModel.users.length + 1).toString();
        this.entity.status = UserStatus.INACTIVE;
        UserModel.users.push(this.entity);

        return this.entity;
    }

    toJSON(): User {
        return this.entity;
    }
}
