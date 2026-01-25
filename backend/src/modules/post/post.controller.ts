import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import type { CreatePostDTO } from './post.dto';
import { PostService } from './post.service';
import { LoggedUser } from '../user/interfaces/logged-user.interface';

@Controller("posts")
export class PostController {

    constructor(
        private service: PostService
    ) { }

    @Get()
    public async findAll() {
        return this.service.findAll();
    }

    @Post()
    public async create(
        @Body() createPost: CreatePostDTO,
        @Req() { user }: Request & { user: LoggedUser }
    ) {
        return this.service.create(user, createPost);
    }
}
