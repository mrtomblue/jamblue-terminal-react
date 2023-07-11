import { PropsWithChildren } from "react";
import JamblueTerminal, { TerminalItem } from "@jamblue/terminal";
import React = require("react");
type DashboardConsoleContextValue = {
    Terminal: typeof JamblueTerminal.prototype;
    ConsoleLines: TerminalItem[];
    setConsoleLines: React.Dispatch<React.SetStateAction<TerminalItem[]>>;
};
export declare const DashboardConsoleContext: React.Context<DashboardConsoleContextValue>;
export declare const useDashboardConsoleContext: () => DashboardConsoleContextValue;
export declare function DashboardConsoleContextProvider(props: PropsWithChildren): import("react/jsx-runtime").JSX.Element;
export declare function DashboardConsole(): import("react/jsx-runtime").JSX.Element;
export {};
