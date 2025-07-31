import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import GoalList from "../components/auth/GoalList";
import { MemoryRouter } from "react-router-dom";

// Mocks
const mockGoals = [
    {
        _id: "1",
        title: "Trip to Pokhara",
        targetAmount: 10000,
        currentAmount: 2000,
        deadline: "2025-12-31",
    },
];

const mockMutate = jest.fn();

jest.mock("../hooks/useGoalUser", () => ({
    useGetGoals: () => ({
        data: { data: mockGoals },
        isLoading: false,
        refetch: jest.fn(),
    }),
    useDeleteGoal: () => ({
        mutate: mockMutate,
    }),
}));

// Mock modals to simplify rendering (optional for focus)
jest.mock("../modal/GoalModal", () => ({ isOpen }) =>
    isOpen ? <div data-testid="goal-modal">GoalModal Open</div> : null
);
jest.mock("../modal/ContributeModal", () => ({ isOpen }) =>
    isOpen ? <div data-testid="contribute-modal">ContributeModal Open</div> : null
);
jest.mock("../modal/ConfirmDeleteGoalModal", () => ({
    ConfirmDeleteModal: ({ isOpen }) =>
        isOpen ? <div data-testid="delete-modal">DeleteModal Open</div> : null
}));

describe("GoalList", () => {
    test("Fetches and displays goals from API", () => {
        render(
            <MemoryRouter>
                <GoalList />
            </MemoryRouter>
        );

        expect(screen.getByText("Trip to Pokhara")).toBeInTheDocument();
        expect(screen.getByText("Your Goals")).toBeInTheDocument();
    });

    test("Opens GoalModal on edit click", async () => {
        render(
            <MemoryRouter>
                <GoalList />
            </MemoryRouter>
        );

        const editButton = screen.getByTitle("Edit Goal");
        fireEvent.click(editButton);

        await waitFor(() =>
            expect(screen.getByTestId("goal-modal")).toBeInTheDocument()
        );
    });

    test("Opens ContributeModal on contribute click", async () => {
        render(
            <MemoryRouter>
                <GoalList />
            </MemoryRouter>
        );

        const contributeButton = screen.getByTitle("Contribute to Goal");
        fireEvent.click(contributeButton);

        await waitFor(() =>
            expect(screen.getByTestId("contribute-modal")).toBeInTheDocument()
        );
    });

    test("Opens ConfirmDeleteModal on delete click", async () => {
        render(
            <MemoryRouter>
                <GoalList />
            </MemoryRouter>
        );

        const deleteButton = screen.getByTitle("Delete Goal");
        fireEvent.click(deleteButton);

        await waitFor(() =>
            expect(screen.getByTestId("delete-modal")).toBeInTheDocument()
        );
    });
});
