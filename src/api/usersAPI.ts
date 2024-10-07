import { formatUsers } from "../utils/formatUsers";
import { searchUsersByName } from "../utils/searchUsers";

const getAll = async () => {
    const response = await fetch(`https://randomuser.me/api/?results=100&seed=foobar`);
    if (!response.ok) throw new Error(`Oops...Error ${response.status}`);

    const data = await response.json();
    return data.results;
};

const searchUsers = async (searchValue: string) => {
    const users = await getAll();
    const formattedUsers = formatUsers(users);

    if (!searchValue) return formattedUsers;

    const foundUsers = searchUsersByName(formattedUsers, searchValue);

    return foundUsers;
};

export const usersAPI = {
    getAll,
    searchUsers,
};
