import { useNavigate as useReactRouter } from "react-router";

export interface NavigationController {
    to: (path: string) => void;
}

export function useNavigate(): NavigationController {
    const navigate = useReactRouter();

    const to = (path: string) => {
        navigate(path);
    }

    return {
        to
    };
}
