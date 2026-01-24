import { BrowserRouter, Routes, Route } from "react-router";

import { AuthLayout } from "@/shared/layout/auth";
import { BaseLayout } from "@/shared/layout/base";

import { SignUpPage } from "@/features/auth/pages/sign-up";
import { LogInPage } from "@/features/auth/pages/log-in";
import { ConfirmEmailPage } from "@/features/auth/pages/confirm-email";
import { PasswordResetPage } from "@/features/auth/pages/password-reset";
import { PasswordResetConfirmationPage } from "@/features/auth/pages/password-reset-confirmation";
import { PasswordRecoveryPage } from "@/features/auth/pages/password-recovery";

import { UserListPage } from "@/features/user/pages/list";
import { PasswordRecoveryConfirmationPage } from "@/features/auth/pages/password-recovery-confirmation";

export function RouteProvider() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<BaseLayout />}>
                    <Route path="auth" element={<AuthLayout />}>
                        <Route path="sign-up" element={<SignUpPage />} />
                        <Route path="log-in" element={<LogInPage />} />
                        <Route path="confirm-email" element={<ConfirmEmailPage />} />
                        <Route path="password-reset" element={<PasswordResetPage />} />
                        <Route path="password-reset/confirmation" element={<PasswordResetConfirmationPage />} />
                        <Route path="password-recovery" element={<PasswordRecoveryPage />} />
                        <Route path="password-recovery/confirmation" element={<PasswordRecoveryConfirmationPage />} />
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
