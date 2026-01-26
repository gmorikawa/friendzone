import { HttpException, HttpStatus } from "@nestjs/common";

export class AuthenticationError extends HttpException {
    constructor() {
        super("Incorrect email or password.", HttpStatus.UNAUTHORIZED);
        this.name = "AuthenticationError";
    }
}

export class UnauthorizedAccessError extends HttpException {
    constructor() {
        super("You are not authorized to access this resource.", HttpStatus.FORBIDDEN);
        this.name = "UnauthorizedAccessError";
    }
}

export class InvalidConfirmationToken extends HttpException {
    constructor() {
        super("The confirmation token is invalid or has expired.", HttpStatus.BAD_REQUEST);
        this.name = "InvalidConfirmationToken";
    }
}
