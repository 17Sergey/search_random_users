// src/utils/formatUsers.test.ts
import { formatUsers } from "../utils/formatUsers";
import { APIUserType } from "../utils/types";

describe("formatUsers", () => {
    const apiUsers: APIUserType[] = [
        {
            login: { username: "john_doe" },
            email: "john@example.com",
            picture: { large: "example.com/john.jpg" },
            name: { title: "Mr", first: "John", last: "Doe" },
        },
        {
            login: { username: "jane_doe" },
            email: "jane@example.com",
            picture: { large: "example.com/jane.jpg" },
            name: { title: "Ms", first: "Jane", last: "Doe" },
        },
    ];

    it("formats API users correctly", () => {
        const formattedUsers = formatUsers(apiUsers);
        expect(formattedUsers).toHaveLength(2);
        expect(formattedUsers[0]).toEqual({
            username: "john_doe",
            email: "john@example.com",
            img: "example.com/john.jpg",
            name: { title: "Mr", first: "John", last: "Doe" },
        });
    });

    it("handles empty array input", () => {
        const formattedUsers = formatUsers([]);
        expect(formattedUsers).toHaveLength(0);
    });
});
