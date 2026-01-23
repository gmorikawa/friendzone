import { Context, SecretKey, Token, TokenGenerator, ValidPeriodMilliseconds } from "../../interfaces/token.interface";

export class MockTokenGenerator implements TokenGenerator {
    private payload: any;

    public async issue<Payload extends Object>(context: Context, payload: Payload, secretKey: SecretKey, expiresIn: ValidPeriodMilliseconds): Promise<string> {
        this.payload = payload;
        return "mockedToken";
    }

    public async verify<Payload extends Object>(context: Context, token: Token, secretKey: SecretKey): Promise<Payload> {
        return this.payload as Payload;
    }
}