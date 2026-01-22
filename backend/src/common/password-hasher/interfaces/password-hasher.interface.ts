export type PlainPassword = string;
export type HashedPassword = string;

export interface PasswordHasher {
    hash(password: PlainPassword): Promise<HashedPassword>;
    compare(password: PlainPassword, hashed: HashedPassword): Promise<boolean>;
}
