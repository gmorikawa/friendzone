import {
    Tabs as MuiTabs,
    Tab as MuiTab
} from "@mui/material";
import { Container } from "../containers/container";

export interface TabOption<Value extends string | number> {
    label: string;
    value: Value;
}

export interface TabContainerProps<Value extends string | number> extends React.PropsWithChildren {
    value: Value;
    selected: Value;
}

export function TabContainer<Value extends string | number>({ value, selected, children }: TabContainerProps<Value>) {
    return value === selected
        ? (
            <Container sx={{ height: "100%" }}>
                {children}
            </Container>
        )
        : null;
}

export interface TabNavigationProps<Value extends string | number> {
    value: Value;
    tabs: TabOption<Value>[];

    onChange?: (newOption: Value) => void;
}

export function TabNavigation<Value extends string | number>({ value, tabs, onChange }: TabNavigationProps<Value>) {
    const handleChange = (_: React.SyntheticEvent, newValue: Value) => {
        if (onChange) {
            onChange(newValue);
        }
    };

    return (
        <MuiTabs value={value} onChange={handleChange} centered>
            {tabs.map((tab: TabOption<Value>) => (
                <MuiTab key={tab.value} label={tab.label} value={tab.value} />
            ))}
        </MuiTabs>
    );
}
