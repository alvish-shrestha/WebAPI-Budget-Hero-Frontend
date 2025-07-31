import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RegisterForm from "../components/auth/RegisterForm.jsx";
import { BrowserRouter } from "react-router-dom";

// Mock useNavigate from react-router-dom
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
}));

// Mock registerUser hook
jest.mock("../hooks/useRegisterUser.js", () => ({
    useRegisterUser: () => ({
        mutate: jest.fn((data, { onSuccess }) => onSuccess && onSuccess()),
        isPending: false,
    }),
}));

const renderWithRouter = (ui) => {
    return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("RegisterForm", () => {
    test("submits form with valid data", async () => {
        renderWithRouter(<RegisterForm />);

        fireEvent.change(screen.getByLabelText("Username:"), {
            target: { value: "testuser" },
        });
        fireEvent.change(screen.getByLabelText("Email:"), {
            target: { value: "test@example.com" },
        });
        fireEvent.change(screen.getByLabelText("Password:"), {
            target: { value: "Test@1234" },
        });
        fireEvent.change(screen.getByLabelText("Confirm Password:"), {
            target: { value: "Test@1234" },
        });

        fireEvent.click(screen.getByRole("button", { name: "SIGN UP" }));

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith("/login");
        });
    });

    test("handles successful redirect to login", async () => {
        renderWithRouter(<RegisterForm />);

        fireEvent.change(screen.getByLabelText("Username:"), {
            target: { value: "anotheruser" },
        });
        fireEvent.change(screen.getByLabelText("Email:"), {
            target: { value: "another@example.com" },
        });
        fireEvent.change(screen.getByLabelText("Password:"), {
            target: { value: "Another@1234" },
        });
        fireEvent.change(screen.getByLabelText("Confirm Password:"), {
            target: { value: "Another@1234" },
        });

        fireEvent.click(screen.getByRole("button", { name: "SIGN UP" }));

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith("/login");
        });
    });
});
