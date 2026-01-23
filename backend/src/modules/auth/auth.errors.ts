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
