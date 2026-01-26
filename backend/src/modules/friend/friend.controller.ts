import { Request } from "express";

import { Controller, Delete, Get, Param, Patch, Post, Req } from "@nestjs/common";

import { FriendService } from "./friend.service";
import { LoggedUser } from "../user/interfaces/logged-user.interface";
import { FriendStatus } from "./friend.enum";

@Controller("api/users/:userId/friends")
export class FriendController {
    constructor(
        private service: FriendService,
    ) { }

    @Get("status/:status")
    public async getFriendsByStatus(
        @Req() { user }: Request & { user: LoggedUser },
        @Param("status") status: FriendStatus
    ) {
        return this.service.findByStatus(user.id, status);
    }

    @Post(":partnerId")
    public async requestFriendship(
        @Req() { user }: Request & { user: LoggedUser },
        @Param("userId") userId: string,
        @Param("partnerId") partnerId: string,
    ) {
        return this.service.requestFriendship(user, userId, partnerId);
    }

    @Patch(":partnerId/accept")
    public async acceptFriendship(
        @Req() { user }: Request & { user: LoggedUser },
        @Param("userId") userId: string,
        @Param("partnerId") partnerId: string,
    ) {
        return this.service.acceptFriendship(user, userId, partnerId);
    }

    @Patch(":partnerId/decline")
    public async declineFriendship(
        @Req() { user }: Request & { user: LoggedUser },
        @Param("userId") userId: string,
        @Param("partnerId") partnerId: string,
    ) {
        return this.service.declineFriendship(user, userId, partnerId);
    }

    @Delete(":partnerId")
    public async removeFriendship(
        @Req() { user }: Request & { user: LoggedUser },
        @Param("userId") userId: string,
        @Param("partnerId") partnerId: string,
    ) {
        return this.service.removeFriendship(user, userId, partnerId);
    }
}
