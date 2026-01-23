export type Token = string;
export type ValidPeriodMilliseconds = number;
export type SecretKey = string | Buffer;

export interface TokenGenerator {
    issue<Payload extends Object>(payload: Payload, secretKey: SecretKey, expiresIn: ValidPeriodMilliseconds): Promise<string>;
    verify<Payload extends Object>(token: Token, secretKey: SecretKey): Promise<Payload>
}
