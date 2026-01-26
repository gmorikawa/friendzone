import { HttpException, HttpStatus } from "@nestjs/common";

export class EmailAlreadyExistsError extends HttpException {
    constructor(email: string) {
        super(`User with email ${email} already exists.`, HttpStatus.CONFLICT);
        this.name = "EmailAlreadyExistsError";
    }
}

export class UserNotFoundError extends HttpException {
    constructor(id: string) {
        super(`User with id ${id} not found.`, HttpStatus.NOT_FOUND);
        this.name = "UserNotFoundError";
    }
}
