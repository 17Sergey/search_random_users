import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { UserSearch } from "../components/UserSearch";
import { usersAPI } from "../api/usersAPI";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, it, beforeEach, expect, vi } from "vitest";

vi.mock("../api/usersAPI", () => ({
    usersAPI: {
        getAll: vi.fn(),
        searchUsers: vi.fn(),
    },
}));

const queryClient = new QueryClient();

const renderWithProvider = (ui: JSX.Element) => {
    return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
};

describe("UserSearch", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders the search input and button", () => {
        renderWithProvider(<UserSearch />);
        expect(screen.getByPlaceholderText(/search users.../i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
    });

    it("displays a hint when no users are searched", () => {
        renderWithProvider(<UserSearch />);
        expect(screen.getByText(/type the value and press "search"!/i)).toBeInTheDocument();
    });

    it("fetches and displays users on search", async () => {
        const mockUsers = [
            {
                username: "john_doe",
                email: "john@example.com",
                img: "example.com/john.jpg",
                name: { title: "", first: "John", last: "Doe" },
            },
        ];
        (usersAPI.searchUsers as jest.Mock).mockResolvedValueOnce(mockUsers);

        renderWithProvider(<UserSearch />);
        fireEvent.change(screen.getByPlaceholderText(/search users.../i), {
            target: { value: "john" },
        });
        fireEvent.click(screen.getByRole("button", { name: /search/i }));

        await waitFor(() => {
            expect(screen.getByText(/john doe/i)).toBeInTheDocument();
        });
    });
});
