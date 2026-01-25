import { Request, Response, NextFunction } from "express";

import { Inject, Injectable, NestMiddleware } from "@nestjs/common";
import type { TokenGenerator } from "../../modules/auth/interfaces/token.interface";
import { LoggedUser } from "../../modules/user/interfaces/logged-user.interface";
import { UnauthorizedAccessError } from "../../modules/auth/auth.errors";
import { TokenContext } from "../../modules/auth/enums/token-context";

@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
    constructor(
        @Inject("TokenGenerator") private tokenGenerator: TokenGenerator,
    ) { }

    private getTokenFromHeader(req: Request): string | null {
        const authHeader = req.headers["authorization"];

        if (authHeader && authHeader.startsWith("Bearer ")) {
            return authHeader.slice(7, authHeader.length);
        }

        return null;
    }

    use(req: Request & { user?: LoggedUser }, res: Response, next: NextFunction) {
        const token = this.getTokenFromHeader(req);

        if (!token) {
            next(new UnauthorizedAccessError());
            return;
        }

        const secretKey = process.env.JWT_SECRET_KEY as string;

        this.tokenGenerator.verify<LoggedUser>(TokenContext.AUTHENTICATION, token, secretKey)
            .then((loggedUser: LoggedUser) => {
                req.user = loggedUser;
                next();
            })
            .catch((err) => {
                next(new UnauthorizedAccessError())
            });
    }
}
