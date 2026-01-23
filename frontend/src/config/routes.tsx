import { BrowserRouter, Routes, Route } from "react-router";

import { SignInPage } from "@/features/auth/pages/sign-in";
import { AuthLayout } from "@/shared/layout/auth";
import { BaseLayout } from "@/shared/layout/base";

export function RouteProvider() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<BaseLayout />}>
                    <Route path="auth" element={<AuthLayout />}>
                        <Route path="sign-in" element={<SignInPage />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default RouteProvider;
