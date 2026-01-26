import { HttpException, HttpStatus } from "@nestjs/common";

export class SelfFriendAttemptError extends HttpException {
    constructor() {
        super("A user cannot befriend themselves.", HttpStatus.BAD_REQUEST);
        this.name = "SelfFriendAttemptError";
    }
}