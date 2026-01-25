import { Test, TestingModule } from "@nestjs/testing";
import { getModelToken } from "@nestjs/mongoose";

import { UserService } from "../user.service";
import { User } from "../user.schema";
import { EmailAlreadyExistsError, UserNotFoundError } from "../user.errors";
import type { PasswordHasher } from "../interfaces/password-hasher.interface";
import { BcryptPasswordHasher } from "../../../common/password-hasher/bcrypt.password-hasher";
import { UserModel } from "./mocks/user.model";
import { UserStatus } from "../user.enum";

describe("UserService", () => {
    let service: UserService;
    let passwordHasher: PasswordHasher;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getModelToken(User.name),
                    useValue: UserModel,
                },
                {
                    provide: "PasswordHasher",
                    useClass: BcryptPasswordHasher,
                },
            ],
        }).compile();

        service = module.get<UserService>(UserService);
        passwordHasher = module.get<PasswordHasher>("PasswordHasher");
    });

    describe("findById", () => {
        let createdUser: User;
        beforeEach(async () => {
            createdUser = await service.create({
                name: {
                    first: "Existing",
                    last: "User"
                },
                email: "existing.user@email.com",
                password: "password123",
            });
        });

        it("should return a user by ID", async () => {
            const result = await service.findById(createdUser.id);

            expect(result).toBeDefined();
        });

        // it("should throw UserNotFoundError when user does not exist", async () => {
        //     await expect(service.findById("nonExistentUserId")).rejects.toThrow(UserNotFoundError);
        // });

        afterEach(async () => {
            await UserModel.reset();
        });
    });

    describe("create", () => {
        const createUserDto = {
            name: {
                first: "Test",
                last: "User"
            },
            email: "test@email.com",
            password: "password123",
        };

        it("should create and return a new user", async () => {
            const result = await service.create(createUserDto);

            expect(result).toBeDefined();
            expect(result.name.first).toEqual(createUserDto.name.first);
            expect(result.name.last).toEqual(createUserDto.name.last);
            expect(result.email).toEqual(createUserDto.email);
        });

        it("should throw EmailAlreadyExistsError when email already exists", async () => {
            await expect(service.create(createUserDto)).rejects.toThrow(EmailAlreadyExistsError);
        });
    });

    describe("checkPassword", () => {
        it("should return true when password matches", async () => {
            const plainPassword = "password123";
            const hashedPassword = await passwordHasher.hash(plainPassword);
            const result = await service.checkPassword(plainPassword, hashedPassword);

            expect(result).toBe(true);
        });

        it("should return false when password does not match", async () => {
            const plainPassword = "password123";
            const hashedPassword = await passwordHasher.hash(plainPassword);
            const result = await service.checkPassword("wrongpassword", hashedPassword);

            expect(result).toBe(false);
        });
    });

    describe("changeStatus", () => {
        it("should change user status to ACTIVE", async () => {
            const user = await service.create({
                name: {
                    first: "Status",
                    last: "Changer"
                },
                email: "status.changer@email.com",
                password: "password123",
            });

            expect(user.status).toBe(UserStatus.INACTIVE);

            await service.activateUser(user.id);

            const updatedUser = await service.findByEmail(user.email);
            expect(updatedUser?.status).toBe(UserStatus.ACTIVE);
        });
    });
});
