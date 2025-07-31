import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginForm from "../components/auth/LoginForm";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Mock hooks and modules
jest.mock("../hooks/useLoginUser", () => ({
    useLoginUser: jest.fn(),
}));
jest.mock("../api/api", () => ({
    __esModule: true,
    default: {
        post: jest.fn(),
        get: jest.fn(),
    },
}));
jest.mock("firebase/auth", () => ({
    signInWithPopup: jest.fn(() => Promise.resolve()),
}));
jest.mock("../firebase", () => ({
    auth: {},
    googleProvider: {},
    facebookProvider: {},
}));

const mockMutate = jest.fn();

const renderForm = () => {
    const queryClient = new QueryClient();
    render(
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <LoginForm />
            </BrowserRouter>
        </QueryClientProvider>
    );
};

describe("LoginForm", () => {
    beforeEach(() => {
        const { useLoginUser } = require("../hooks/useLoginUser");
        useLoginUser.mockReturnValue({ mutate: mockMutate, isPending: false });
        mockMutate.mockClear();
    });

    test("Submits login with valid credentials", async () => {
        renderForm();
        fireEvent.change(screen.getByLabelText(/email/i), {
            target: { value: "test@example.com" },
        });
        fireEvent.change(screen.getByLabelText(/password/i), {
            target: { value: "Test@12345" },
        });
        fireEvent.click(screen.getByRole("button", { name: /^sign in$/i }));

        await waitFor(() => {
            expect(mockMutate).toHaveBeenCalledWith(
                {
                    email: "test@example.com",
                    password: "Test@12345",
                },
                expect.any(Object)
            );

        });
    });

    test("Opens forgot password modal", async () => {
        renderForm();
        fireEvent.click(screen.getByText(/forgot password/i));
        expect(await screen.findByRole("heading", { name: /forgot password/i })).toBeInTheDocument();
    });

    test("Handles Google login (mock popup)", async () => {
        const { signInWithPopup } = require("firebase/auth");
        renderForm();
        fireEvent.click(screen.getByRole("button", { name: /google/i }));

        await waitFor(() => {
            expect(signInWithPopup).toHaveBeenCalled();
        });
    });
});
