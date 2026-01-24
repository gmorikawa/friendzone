import { useSearchParams } from "react-router";

type RouteQuery<Query> = Query;

export function useQuery<Query = any>(): RouteQuery<Query> {
    const [searchParams] = useSearchParams();
    const query: any = {};

    searchParams.forEach((value, key) => {
        query[key] = value;
    });

    return query as Query;
}
