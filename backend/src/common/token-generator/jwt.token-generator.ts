import jwt from "jsonwebtoken";

import { Injectable } from "@nestjs/common";

import type { ValidPeriodMilliseconds, SecretKey, Token, TokenGenerator, Context } from "../../modules/auth/interfaces/token.interface";
import { WrongContextError } from "./errors/wrong-context.error";

@Injectable()
export class JwtTokenGenerator implements TokenGenerator {

    public async issue<Payload extends Object>(context: Context, payload: Payload, secretKey: SecretKey, expiresIn?: ValidPeriodMilliseconds): Promise<Token> {
        return jwt.sign(
            {
                data: payload,
                context: context,
            },
            secretKey,
            { expiresIn }
        );
    }

    public async verify<Payload extends Object>(context: Context, token: Token, secretKey: SecretKey): Promise<Payload> {
        const decoded = jwt.verify(token, secretKey) as { data: Payload, context: Context };

        if (decoded.context !== context) {
            throw new WrongContextError();
        }

        return decoded.data;
    }

}
