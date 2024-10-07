// src/api/usersAPI.test.ts
import { usersAPI } from "../api/usersAPI";
import { formatUsers } from "../utils/formatUsers";

import { describe, it, expect, vi } from "vitest";

global.fetch = vi.fn();

describe("usersAPI", () => {
    describe("getAll", () => {
        it("fetches users successfully from API", async () => {
            const mockUsers = [
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
            (fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: async () => ({ results: mockUsers }),
            });
            const users = await usersAPI.getAll();
            expect(users).toEqual(mockUsers);
        });
        it("throws an error when the fetch fails", async () => {
            (fetch as jest.Mock).mockResolvedValueOnce({
                ok: false,
                status: 404,
            });
            await expect(usersAPI.getAll()).rejects.toThrow("Oops...Error 404");
        });
    });

    describe("searchUsers", () => {
        it("returns all users if search value is empty", async () => {
            const mockUsers = [
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
            (fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: async () => ({ results: mockUsers }),
            });
            const result = await usersAPI.searchUsers("");
            expect(result).toEqual(formatUsers(mockUsers));
        });

        it("returns filtered users based on search value", async () => {
            const mockUsers = [
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
            (fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: async () => ({ results: mockUsers }),
            });
            const result = await usersAPI.searchUsers("john");
            expect(result).toHaveLength(1);
            expect(result[0].username).toBe("john_doe");
        });

        it("throws an error if fetching users fails", async () => {
            (fetch as jest.Mock).mockResolvedValueOnce({
                ok: false,
                status: 500,
            });
            await expect(usersAPI.searchUsers("john")).rejects.toThrow("Oops...Error 500");
        });
    });
});
