import { BrowserRouter, Routes, Route } from "react-router";

import { AuthLayout } from "@/shared/layout/auth";
import { BaseLayout } from "@/shared/layout/base";

import { SignUpPage } from "@/features/auth/pages/sign-up";
import { LogInPage } from "@/features/auth/pages/log-in";

import { UserListPage } from "@/features/user/pages/list";

export function RouteProvider() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<BaseLayout />}>
                    <Route path="auth" element={<AuthLayout />}>
                        <Route path="sign-up" element={<SignUpPage />} />
                        <Route path="log-in" element={<LogInPage />} />
                    </Route>

                    <Route path="app">
                        <Route path="user" element={<UserListPage />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default RouteProvider;
