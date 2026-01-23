import { Test, TestingModule } from "@nestjs/testing";

import { AuthService } from "../auth.service";
import { MockUserService } from "./mocks/user.service";
import { UserService } from "../../../modules/user/user.service";
import { CreateUserDTO } from "../../../modules/user/dtos/create-user.dto";
import { JwtTokenGenerator } from "../../../common/token-generator/jwt.token-generator";
import { MockTokenGenerator } from "./mocks/token-generator.mock";

describe("AuthService", () => {
    let service: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AuthService,
                {
                    provide: UserService,
                    useClass: MockUserService,
                },
                {
                    provide: "TokenGenerator",
                    useClass: MockTokenGenerator
                },
                {
                    provide: "MailSender",
                    useValue: { send: async (to: string, subject: string, body: string) => Promise.resolve()},
                }
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });

    it("should sign up a user", async () => {
        const createUserDto: CreateUserDTO = {
            name: {
                first: "Test",
                last: "User",
            },
            email: "test@example.com",
            password: "password123",
        };

        const user = await service.signUp(createUserDto);
        expect(user).toBeDefined();
        expect(user.email).toBe(createUserDto.email);
        expect(user.name.first).toBe(createUserDto.name.first);
        expect(user.name.last).toBe(createUserDto.name.last);
    });
});
