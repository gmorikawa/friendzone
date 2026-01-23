import bcrypt from "bcrypt";

import { Injectable } from "@nestjs/common";

import { PasswordHasher } from "../../modules/user/interfaces/password-hasher.interface";

@Injectable()
export class BcryptPasswordHasher implements PasswordHasher {
    public async hash(password: string): Promise<string> {
        return bcrypt.genSalt(10)
            .then((salt: string) => {
                return bcrypt.hash(password, salt);
            });
    }

    public async compare(password: string, hashed: string): Promise<boolean> {
        return bcrypt.compare(password, hashed);
    }
}
