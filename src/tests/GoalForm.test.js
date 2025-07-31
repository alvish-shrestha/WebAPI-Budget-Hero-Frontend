import React from "react";
import { render, screen, fireEvent, waitFor } from "../tests/test-utils.js";
import GoalForm from "../components/auth/Goal/GoalForm.jsx";
import { toast } from "react-toastify";

// Mock hooks
jest.mock("../hooks/useGoalUser.js", () => ({
    useCreateGoal: () => ({
        mutate: jest.fn((_, { onSuccess }) => onSuccess?.()),
        isPending: false,
    }),
    useUpdateGoal: () => ({
        mutate: jest.fn((_, { onSuccess }) => onSuccess?.()),
        isPending: false,
    }),
    useDeleteGoal: () => ({
        mutate: jest.fn((_, { onError }) => onError?.()),
        isPending: false,
    }),
}));

// Mock toast
jest.mock("react-toastify", () => ({
    toast: { error: jest.fn(), success: jest.fn() },
}));

describe("GoalForm", () => {
    const mockOnClose = jest.fn();
    const mockOnSuccess = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("updates existing goal with pre-filled data", async () => {
        const initialData = {
            _id: "goal123",
            title: "Buy a laptop",
            targetAmount: 1500,
            currentAmount: 500,
            deadline: "2025-12-31T00:00:00.000Z",
        };

        render(
            <GoalForm
                initialData={initialData}
                onClose={mockOnClose}
                onSuccess={mockOnSuccess}
            />
        );

        expect(screen.getByDisplayValue("Buy a laptop")).toBeInTheDocument();
        expect(screen.getByDisplayValue("1500")).toBeInTheDocument();
        expect(screen.getByDisplayValue("2025-12-31")).toBeInTheDocument();

        fireEvent.click(screen.getByRole("button", { name: /Update Goal/i }));

        await waitFor(() => {
            expect(mockOnClose).toHaveBeenCalled();
            expect(mockOnSuccess).toHaveBeenCalled();
        });
    });

    test("opens delete modal for goal", () => {
        const initialData = {
            _id: "goal123",
            title: "Buy a car",
            targetAmount: 3000,
            currentAmount: 1000,
            deadline: "2025-10-01T00:00:00.000Z",
        };

        render(<GoalForm initialData={initialData} />);

        fireEvent.click(screen.getByTitle("Delete Goal"));

        expect(
            screen.getByText(/Are you sure you want to delete "Buy a car"/i)
        ).toBeInTheDocument();
    });

    test("calls onClose and onSuccess after delete", async () => {
        const initialData = {
            _id: "goal123",
            title: "Buy a phone",
            targetAmount: 2000,
            currentAmount: 1000,
            deadline: "2025-09-01T00:00:00.000Z",
        };

        render(<GoalForm initialData={initialData} onClose={mockOnClose} onSuccess={mockOnSuccess} />);

        fireEvent.click(screen.getByTitle("Delete Goal"));
        fireEvent.click(screen.getByRole("button", { name: /Yes, Delete/i }));

        await waitFor(() => {
            expect(mockOnClose).toHaveBeenCalled();
            expect(mockOnSuccess).toHaveBeenCalled();
        });
    });

    test("shows error toast on goal delete failure", async () => {
        const initialData = {
            _id: "goal123",
            title: "Failing Goal",
            targetAmount: 999,
            currentAmount: 0,
            deadline: "2025-08-01T00:00:00.000Z",
        };

        render(<GoalForm initialData={initialData} onClose={mockOnClose} onSuccess={mockOnSuccess} />);

        fireEvent.click(screen.getByTitle("Delete Goal"));
        fireEvent.click(screen.getByRole("button", { name: /Delete/i }));

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith("Failed to delete goal");
        });
    });
});
