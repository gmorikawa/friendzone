import { HttpException, HttpStatus } from "@nestjs/common";

export class PostNotFoundError extends HttpException {
    constructor(id: string) {
        super(`Post with id ${id} not found.`, HttpStatus.NOT_FOUND);
        this.name = "PostNotFoundError";
    }
}

export class EmptyPostContentError extends HttpException {
    constructor() {
        super(`Post content cannot be empty.`, HttpStatus.BAD_REQUEST);
        this.name = "EmptyPostContentError";
    }
}

export class ContentTooLongError extends HttpException {
    constructor(maxLength: number) {
        super(`Post content exceeds maximum length of ${maxLength} characters.`, HttpStatus.BAD_REQUEST);
        this.name = "ContentTooLongError";
    }
}