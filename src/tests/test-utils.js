import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthContextProvider from "../auth/AuthProvider";

const queryClient = new QueryClient();

const customRender = (ui, options) =>
    render(
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <AuthContextProvider>{ui}</AuthContextProvider>
            </QueryClientProvider>
        </BrowserRouter>,
        options
    );

export * from "@testing-library/react";
export { customRender as render };
