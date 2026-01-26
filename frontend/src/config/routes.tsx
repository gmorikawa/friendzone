import { BrowserRouter, Routes, Route, Navigate } from "react-router";

import { BaseLayout } from "@/shared/layout/base";
import { AuthLayout } from "@/shared/layout/auth";
import { AppLayout } from "@/shared/layout/app";

import { SignUpPage } from "@/features/auth/pages/sign-up";
import { LogInPage } from "@/features/auth/pages/log-in";
import { ConfirmEmailPage } from "@/features/auth/pages/confirm-email";
import { PasswordResetPage } from "@/features/auth/pages/password-reset";
import { PasswordResetConfirmationPage } from "@/features/auth/pages/password-reset-confirmation";
import { PasswordRecoveryPage } from "@/features/auth/pages/password-recovery";
import { PasswordRecoveryConfirmationPage } from "@/features/auth/pages/password-recovery-confirmation";

import { UserListPage } from "@/features/user/pages/list";
import { UserSettings } from "@/features/user/pages/settings";
import { PostCreatePage } from "@/features/post/pages/post-create";
import { PostUpdatePage } from "@/features/post/pages/post-update";
import { FeedPage } from "@/features/post/pages/feed";
import { FriendListPage } from "@/features/friend/pages/friend-list";

export function RouteProvider() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<BaseLayout />}>
                    <Route index element={<Navigate to="/auth/log-in" replace />} />

                    <Route path="auth" element={<AuthLayout />}>
                        <Route index element={<Navigate to="/auth/log-in" replace />} />
                        <Route path="sign-up" element={<SignUpPage />} />
                        <Route path="log-in" element={<LogInPage />} />
                        <Route path="confirm-email" element={<ConfirmEmailPage />} />
                        <Route path="password-reset" element={<PasswordResetPage />} />
                        <Route path="password-reset/confirmation" element={<PasswordResetConfirmationPage />} />
                        <Route path="password-recovery" element={<PasswordRecoveryPage />} />
                        <Route path="password-recovery/confirmation" element={<PasswordRecoveryConfirmationPage />} />
                    </Route>

                    <Route path="app" element={<AppLayout />}>
                        <Route path="users" element={<UserListPage />} />
                        <Route path="settings" element={<UserSettings />} />
                        <Route path="posts" element={<PostCreatePage />} />
                        <Route path="posts/:id" element={<PostUpdatePage />} />
                        <Route path="feed" element={<FeedPage />} />
                        <Route path="friends" element={<FriendListPage />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default RouteProvider;
