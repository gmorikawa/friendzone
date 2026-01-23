import { JwtTokenGenerator } from "../jwt.token-generator";

type UserPayload = {
    id: string;
    email: string;
    name: {
        first: string;
        last: string;
    };
}

describe("JwtTokenGenerator", () => {
    let tokenGenerator: JwtTokenGenerator;
    let token = "";

    const user: UserPayload = { id: "user123", email: "user@example.com", name: { first: "John", last: "Doe" } };
    const secretKey = "secretKey123";

    beforeEach(async () => {
        tokenGenerator = new JwtTokenGenerator();
    });

    describe("generate token", () => {
        it("should return a string different from the original input", async () => {
            token = await tokenGenerator.issue<UserPayload>(user, secretKey, 3600000);

            expect(token).not.toBe(user);
        });
    });

    describe("verify token", () => {
        it("should return the payload", async () => {
            const payload = await tokenGenerator.verify<UserPayload>(token, secretKey);

            expect(payload).toHaveProperty("id", user.id);
            expect(payload).toHaveProperty("email", user.email);
            expect(payload.name).toHaveProperty("first", user.name.first);
            expect(payload.name).toHaveProperty("last", user.name.last);
        });
    });
});
