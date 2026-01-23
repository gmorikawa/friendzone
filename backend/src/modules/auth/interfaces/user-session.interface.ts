import { LoggedUser } from "../../../modules/user/interfaces/logged-user.interface";
import { Token } from "./token.interface";

export interface UserSession {
    token: Token;
    loggedUser: LoggedUser;
}
