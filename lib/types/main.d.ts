import JamblueTerminal, { TerminalItem } from "@jamblue/terminal";
import { Dispatch, PropsWithChildren, SetStateAction } from "react";
type TerminalWindowContextValue = {
    Terminal: typeof JamblueTerminal.prototype;
    ConsoleLines: TerminalItem[];
    setConsoleLines: Dispatch<SetStateAction<TerminalItem[]>>;
};
export declare const useTerminalWindow: () => TerminalWindowContextValue;
export declare function TerminalWindowContextProvider(props: PropsWithChildren): import("react/jsx-runtime").JSX.Element;
interface TerminalWindowProps {
    styles: {
        container: object;
        header: object;
        footer: object;
        form: object;
        lines: object;
        icons: object;
        texts: object;
        divider: object;
    };
    classNames: {
        container: string;
        header: string;
        footer: string;
        form: string;
        lines: string;
        icons: string;
        texts: string;
        divider: string;
    };
    props: {
        container: object;
        header: object;
        footer: object;
        form: object;
        lines: object;
        icons: object;
        texts: object;
        divider: object;
    };
}
export declare function TerminalWindow(props: TerminalWindowProps): import("react/jsx-runtime").JSX.Element;
export {};
