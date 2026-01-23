export type Token = string;
export type Context = string;
export type ValidPeriodMilliseconds = number;
export type SecretKey = string | Buffer;

export interface TokenGenerator {
    issue<Payload extends Object>(context: Context, payload: Payload, secretKey: SecretKey, expiresIn: ValidPeriodMilliseconds): Promise<Token>;
    verify<Payload extends Object>(context: Context, token: Token, secretKey: SecretKey): Promise<Payload>
}
