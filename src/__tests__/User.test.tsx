import { render, screen } from "@testing-library/react";
import { User } from "../components/User";

describe("User", () => {
    const mockUser = {
        username: "john_doe",
        email: "john@example.com",
        img: "example.com/john.jpg",
        name: { title: "Mr.", first: "John", last: "Doe" },
    };

    it("renders user information correctly", () => {
        render(<User user={mockUser} />);
        expect(screen.getByText(/john doe/i)).toBeInTheDocument();
        expect(screen.getByText(/@john_doe/i)).toBeInTheDocument();
        expect(screen.getByText(/john@example.com/i)).toBeInTheDocument();
        expect(screen.getByRole("img")).toHaveAttribute("src", "example.com/john.jpg");
    });
});
