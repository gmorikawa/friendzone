export class SelfFriendAttemptError extends Error {
    constructor() {
        super("A user cannot befriend themselves.");
        this.name = "SelfFriendAttemptError";
    }
}