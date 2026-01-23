import { BrowserRouter, Routes, Route } from "react-router";
import { SignInPage } from "@/features/auth/pages/sign-in.page";

export function RouteProvider() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/auth/sign-in" element={<SignInPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default RouteProvider;