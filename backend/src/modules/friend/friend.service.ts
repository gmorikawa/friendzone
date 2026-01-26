import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { Friend } from "./friend.schema";
import { FriendStatus } from "./friend.enum";
import { LoggedUser } from "../user/interfaces/logged-user.interface";
import { UnauthorizedAccessError } from "../auth/auth.errors";
import { SelfFriendAttemptError } from "./friend.error";

@Injectable()
export class FriendService {

    constructor(
        @InjectModel(Friend.name) private model: Model<Friend>,
    ) { }

    public async findByStatus(userId: string, status: FriendStatus) {
        return this.model.find({ user: userId, status })
            .populate("partner", "name email");
    }

    public async requestFriendship(loggedUser: LoggedUser, senderId: string, partnerId: string) {
        if (loggedUser.id !== senderId) {
            throw new UnauthorizedAccessError();
        }

        if (senderId === partnerId) {
            throw new SelfFriendAttemptError();
        }

        await this.model.create({
            user: senderId,
            partner: partnerId,
            status: FriendStatus.SENT,
        });

        await this.model.create({
            user: partnerId,
            partner: senderId,
            status: FriendStatus.REQUESTED,
        });

        return true;
    }

    public async acceptFriendship(loggedUser: LoggedUser, receiverId: string, partnerId: string) {
        if (loggedUser.id !== receiverId) {
            throw new UnauthorizedAccessError();
        }

        await this.model.updateOne(
            { user: receiverId, partner: partnerId },
            { status: FriendStatus.CONNECTED },
        );

        await this.model.updateOne(
            { user: partnerId, partner: receiverId },
            { status: FriendStatus.CONNECTED },
        );

        return true;
    }

    public async declineFriendship(loggedUser: LoggedUser, receiverId: string, partnerId: string) {
        if (loggedUser.id !== receiverId) {
            throw new UnauthorizedAccessError();
        }

        await this.model.deleteOne({ user: receiverId, partner: partnerId });
        await this.model.deleteOne({ user: partnerId, partner: receiverId });

        return true;
    }

    public async removeFriendship(loggedUser: LoggedUser, removerId: string, partnerId: string) {
        if (loggedUser.id !== removerId) {
            throw new UnauthorizedAccessError();
        }

        await this.model.deleteOne({ user: removerId, partner: partnerId });
        await this.model.deleteOne({ user: partnerId, partner: removerId });

        return true;
    }
}
