import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import type { CreatePostDTO, UpdatePostDTO } from './post.dto';
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

    @Get(":id")
    public async findById(
        @Param("id") id: string
    ) {
       return this.service.findById(id);
    }

    @Post()
    public async create(
        @Req() { user }: Request & { user: LoggedUser },
        @Body() createPost: CreatePostDTO,
    ) {
        return this.service.create(user, createPost);
    }

    @Put(":id")
    public async update(
        @Req() { user }: Request & { user: LoggedUser },
        @Param("id") id: string,
        @Body() updatePost: UpdatePostDTO,
    ) {
        return this.service.update(user, id, updatePost);
    }

    @Delete(":id")
    public async delete(
        @Req() { user }: Request & { user: LoggedUser },
        @Param("id") id: string,
    ) {
        return this.service.delete(user, id);
    }
}
