export class WrongContextError extends Error {
    constructor() {
        super("Invalid token context");
        this.name = "WrongContextError";
    }
}