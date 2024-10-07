import { APIUserType } from "./types";

export const formatUsers = (users: APIUserType[]) => {
    return users?.map((user: APIUserType) => {
        return {
            username: user?.login?.username,
            email: user.email,
            img: user?.picture?.large,
            name: user?.name,
        };
    });
};
