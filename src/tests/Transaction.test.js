import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TransactionForm from "../components/auth/TransactionForm";
import {
    useAddTransaction,
    useUpdateTransaction,
    useDeleteTransaction,
} from "../hooks/useTransactionUser";

// Mocks for react-query mutation hooks
jest.mock("../hooks/useTransactionUser", () => ({
    useAddTransaction: jest.fn(),
    useUpdateTransaction: jest.fn(),
    useDeleteTransaction: jest.fn(),
}));

describe("TransactionForm", () => {
    const mockOnClose = jest.fn();
    const mockOnSuccess = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        useAddTransaction.mockReturnValue({ mutate: jest.fn(), isPending: false });
        useUpdateTransaction.mockReturnValue({ mutate: jest.fn(), isPending: false });
        useDeleteTransaction.mockReturnValue({ mutate: jest.fn(), isPending: false });
    });

    test("renders in Add mode and submits valid form", async () => {
        const mutateAdd = jest.fn((_, { onSuccess }) => onSuccess?.());
        useAddTransaction.mockReturnValue({ mutate: mutateAdd, isPending: false });

        render(<TransactionForm onClose={mockOnClose} onSuccess={mockOnSuccess} />);

        const dropdowns = screen.getAllByRole("combobox");
        fireEvent.change(dropdowns[0], { target: { value: "income" } }); // type
        const inputs = screen.getAllByRole("textbox");
        fireEvent.change(inputs[0], { target: { value: "2025-07-01" } });
        fireEvent.change(screen.getByPlaceholderText(/e\.g\. 1200/i), { target: { value: "1000" } });
        fireEvent.change(dropdowns[1], { target: { value: "Salary" } }); // Category
        fireEvent.change(dropdowns[2], { target: { value: "Cash" } });   // Account

        fireEvent.change(screen.getByPlaceholderText(/Add a note/i), {
            target: { value: "Bonus" },
        });

        fireEvent.submit(screen.getByRole("button", { name: /Add Transaction/i }));

        await waitFor(() => {
            expect(mutateAdd).toHaveBeenCalled();
            expect(mockOnSuccess).toHaveBeenCalled();
            expect(mockOnClose).toHaveBeenCalled();
        });
    });

    test("shows validation errors when submitting empty form", async () => {
        render(<TransactionForm onClose={mockOnClose} onSuccess={mockOnSuccess} />);

        fireEvent.submit(screen.getByRole("button", { name: /Add Transaction/i }));

        const errors = await screen.findAllByText(/required/i);
        expect(errors.length).toBeGreaterThanOrEqual(4);
    });

    test("renders edit mode with prefilled values", () => {
        render(
            <TransactionForm
                onClose={mockOnClose}
                onSuccess={mockOnSuccess}
                initialData={{
                    _id: "abc123",
                    type: "expense",
                    amount: "500",
                    category: "Food",
                    account: "Wallet",
                    date: "2025-07-01",
                    note: "Lunch",
                    description: "With friends",
                }}
            />
        );

        expect(screen.getByDisplayValue("500")).toBeInTheDocument();
        expect(screen.getByDisplayValue("Lunch")).toBeInTheDocument();
        expect(screen.getByDisplayValue("With friends")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Update Transaction/i })).toBeInTheDocument();
    });

    test("opens delete modal when delete button clicked", async () => {
        render(
            <TransactionForm
                onClose={mockOnClose}
                onSuccess={mockOnSuccess}
                initialData={{
                    _id: "xyz123",
                    type: "expense",
                    amount: "400",
                    category: "Health",
                    account: "Bank",
                    date: "2025-07-05",
                    note: "Checkup",
                    description: "",
                }}
            />
        );

        const deleteBtn = screen.getByTitle("Delete Transaction");
        fireEvent.click(deleteBtn);

        // Option 1: Wait for the modal confirm button
        await waitFor(() => {
            expect(screen.getByRole("button", { name: /Yes, Delete/i })).toBeInTheDocument();
        });

        // Optional: assert modal itself if you use headings like "Confirm Deletion"
        // expect(screen.getByText(/Are you sure/i)).toBeInTheDocument();
    });

});
