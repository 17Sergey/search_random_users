import { escapeRegExp } from "./escapeRegExp";
import { UserType } from "./types";

export const searchUsersByName = (users: UserType[], searchValue: string): UserType[] => {
    return users.filter((user) => {
        const escapedSearchValue = escapeRegExp(searchValue);
        const regex = new RegExp(escapedSearchValue, "i");
        const name = Object.values(user.name).join(" ");
        return regex.test(name);
    });
};
