import type { User } from "@/features/user/types/user";

export function buildFullName(user: User) {
    return `${user.name.first} ${user.name.last}`;
}
