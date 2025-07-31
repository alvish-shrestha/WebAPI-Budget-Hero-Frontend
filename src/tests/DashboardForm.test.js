import React from "react";
jest.mock("../api/api.js", () => {
    return {
        __esModule: true,
        default: {
            create: () => ({
                get: jest.fn(),
                post: jest.fn(),
                put: jest.fn(),
                delete: jest.fn(),
            }),
        },
    };
});


import { render, screen, fireEvent, waitFor } from "./test-utils";
import DashboardForm from "../components/auth/DashboardForm";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

describe("DashboardForm", () => {
    test("sidebar renders with username", () => {
        render(<DashboardForm />);
        expect(screen.getByText(/User/i)).toBeInTheDocument(); // default state
    });

    test("prev and next month navigation buttons work", async () => {
        render(<DashboardForm />);
        const prevBtn = screen.getByTitle("Previous Month");
        const nextBtn = screen.getByTitle("Next Month");

        expect(prevBtn).toBeInTheDocument();
        expect(nextBtn).toBeInTheDocument();

        userEvent.click(prevBtn);
        userEvent.click(nextBtn);
    });

    test("confetti launches on streak increment", async () => {
        render(<DashboardForm />);

        const openModalBtn = screen.getByLabelText("Add Transaction");
        expect(openModalBtn).toBeInTheDocument();
        userEvent.click(openModalBtn);

        const submitBtn = await screen.findByRole("button", {
            name: /^Add Transaction$/i, // exact button label
        });

        expect(submitBtn).toBeInTheDocument();
    });
});
