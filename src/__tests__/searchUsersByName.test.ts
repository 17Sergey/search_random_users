// src/utils/searchUsers.test.ts
import { searchUsersByName } from "../utils/searchUsersByName";
import { UserType } from "../utils/types";

describe("searchUsersByName", () => {
    const users: UserType[] = [
        {
            username: "john_doe",
            email: "john@example.com",
            img: "example.com/john.jpg",
            name: { title: "Mr", first: "John", last: "Doe" },
        },
        {
            username: "jane_doe",
            email: "jane@example.com",
            img: "example.com/jane.jpg",
            name: { title: "Ms", first: "Jane", last: "Doe" },
        },
        {
            username: "mark_smith",
            email: "mark@example.com",
            img: "example.com/mark.jpg",
            name: { title: "Mr", first: "Mark", last: "Smith" },
        },
    ];

    it("returns users matching the search value", () => {
        const result = searchUsersByName(users, "john");
        expect(result).toHaveLength(1);
        expect(result[0].username).toBe("john_doe");
    });

    it("returns no users if there are no matches", () => {
        const result = searchUsersByName(users, "nonexistent");
        expect(result).toHaveLength(0);
    });

    it("is case insensitive", () => {
        const result = searchUsersByName(users, "JANE");
        expect(result).toHaveLength(1);
        expect(result[0].username).toBe("jane_doe");
    });

    it("matches partial names", () => {
        const result = searchUsersByName(users, "Doe");
        expect(result).toHaveLength(2);
    });
});
