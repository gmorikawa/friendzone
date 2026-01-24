import { Title } from "@/components/typography/title";
import { Environment } from "@/config/environment";

export function Logo() {
    return (
        <Title
            level={4}
            textAlign="center"
            sx={{
                fontFamily: "'Walter Turncoat', cursive",
                fontWeight: 400,
                fontStyle: "normal",
                marginBottom: 2,
            }}
        >
            {Environment.APPLICATION_NAME}
        </Title>
    );
}