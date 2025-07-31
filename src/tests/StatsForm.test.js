import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import StatsForm from "../components/auth/StatsForm";
import { BrowserRouter } from "react-router-dom";
import { useGetTransaction } from "../hooks/useTransactionUser";

jest.mock("../api/api", () => ({
    __esModule: true,
    default: {
        get: jest.fn(),
        post: jest.fn(),
    },
}));

jest.mock("../hooks/useTransactionUser");

const mockTransactions = {
    data: [
        { type: "income", amount: 1000, date: "2025-07-01", category: "Salary" },
        { type: "expense", amount: 500, date: "2025-07-02", category: "Food" },
        { type: "expense", amount: 300, date: "2025-07-03", category: "Travel" },
        { type: "income", amount: 2000, date: "2025-08-01", category: "Freelance" },
        { type: "expense", amount: 800, date: "2025-08-02", category: "Rent" },
    ],
};

beforeAll(() => {
    global.ResizeObserver = class {
        observe() {}
        unobserve() {}
        disconnect() {}
    };
});

const renderStatsForm = () => {
    render(
        <BrowserRouter>
            <StatsForm />
        </BrowserRouter>
    );
};

describe("StatsForm", () => {
    beforeEach(() => {
        localStorage.setItem("username", "TestUser");
        useGetTransaction.mockReturnValue({
            data: mockTransactions,
            isSuccess: true,
        });
    });

    test("Shows fallback message if no transactions", () => {
        useGetTransaction.mockReturnValue({ data: { data: [] }, isSuccess: true });
        renderStatsForm();
        expect(screen.getAllByText(/No/i)).toHaveLength(3); // Pie, Bar, Line
    });
});
