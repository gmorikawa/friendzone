import { BcryptPasswordHasher } from "../bcrypt.password-hasher";

describe("BcryptPasswordHasher", () => {
    let passwordHasher: BcryptPasswordHasher;

    beforeEach(async () => {
        passwordHasher = new BcryptPasswordHasher();
    });

    describe("hash password", () => {
        it("should return a string different from the original input", async () => {
            const plainPassword = "password123";
            const hashedPassword = await passwordHasher.hash(plainPassword);

            expect(hashedPassword).not.toBe(plainPassword);
        });
    });

    describe("compare password", () => {
        it("should return true for matching passwords", async () => {
            const plainPassword = "password123";
            const hashedPassword = await passwordHasher.hash(plainPassword);
            const isMatch = await passwordHasher.compare(plainPassword, hashedPassword);

            expect(isMatch).toBe(true);
        });

        it("should return false for non-matching passwords", async () => {
            const plainPassword = "password123";
            const hashedPassword = await passwordHasher.hash(plainPassword);
            const isMatch = await passwordHasher.compare("wrongpassword", hashedPassword);

            expect(isMatch).toBe(false);
        });
    });
});
