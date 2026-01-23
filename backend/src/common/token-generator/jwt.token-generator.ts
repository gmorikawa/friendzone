import jwt from "jsonwebtoken";

import { Injectable } from "@nestjs/common";

import type { ValidPeriodMilliseconds, SecretKey, Token, TokenGenerator } from "../../modules/auth/interfaces/token.interface";

@Injectable()
export class JwtTokenGenerator implements TokenGenerator {

    public async issue<Payload extends Object>(payload: Payload, secretKey: SecretKey, expiresIn?: ValidPeriodMilliseconds): Promise<string> {
        return jwt.sign(payload, secretKey, { expiresIn });
    }

    public async verify<Payload extends Object>(token: Token, secretKey: SecretKey): Promise<Payload> {
        return jwt.verify(token, secretKey) as Payload;
    }

}