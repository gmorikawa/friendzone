import { Title, type TitleProps } from "@/components/typography/title";
import { Environment } from "@/config/environment";

export interface LogoProps extends Omit<TitleProps, "level" | "textAlign"> { }

export function Logo({ sx, ...props }: LogoProps) {
    return (
        <Title
            level={4}
            textAlign="center"
            sx={{
                fontFamily: "'Walter Turncoat', cursive",
                fontWeight: 400,
                fontStyle: "normal",
                marginBottom: 2,
                ...sx
            }}
            {...props}
        >
            {Environment.APPLICATION_NAME}
        </Title>
    );
}