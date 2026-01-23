export class AuthenticationError extends Error {
    constructor() {
        super("Incorrect email or password.");
        this.name = "AuthenticationError";
    }
}

export class UnauthorizedAccessError extends Error {
    constructor() {
        super("You are not authorized to access this resource.");
        this.name = "UnauthorizedAccessError";
    }
}

export class InvalidConfirmationToken extends Error {
    constructor() {
        super("The confirmation token is invalid or has expired.");
        this.name = "InvalidConfirmationToken";
    }
}
