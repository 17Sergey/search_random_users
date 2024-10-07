// src/components/UsersList.test.tsx
import { render, screen } from "@testing-library/react";
import { UsersList } from "../components/UsersList";

describe("UsersList", () => {
    it("displays a message when no users are found", () => {
        render(<UsersList users={[]} />);
        expect(screen.getByText(/unfortunately, no users were found/i)).toBeInTheDocument();
    });

    it("renders users correctly", () => {
        const mockUsers = [
            {
                username: "john_doe",
                email: "john@example.com",
                img: "example.com/john.jpg",
                name: { title: "", first: "John", last: "Doe" },
            },
        ];

        render(<UsersList users={mockUsers} />);
        expect(screen.getByText(/john doe/i)).toBeInTheDocument();
        expect(screen.getByText(/john_doe/i)).toBeInTheDocument();
    });
});
