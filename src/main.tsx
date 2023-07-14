// import {
//     Box,
//     Container,
//     createStyles,
//     Divider,
//     Flex,
//     FocusTrap,
//     Group,
//     Input,
//     Paper,
//     ScrollArea,
//     Stack,
//     Text,
//     ThemeIcon,
// } from "@mantine/core";
// import { useForm } from "@mantine/form";
// import { useDisclosure } from "@mantine/hooks";
// import { IconExclamationCircle } from "@tabler/icons-react";
// import {
//     IconAlertTriangle,
//     IconChevronRight,
//     IconCode,
//     IconTerminal,
//     IconTerminal2,
// } from "@tabler/icons-react";
import JamblueTerminal, {
    TerminalConfig,
    TerminalItem,
} from "@jamblue/terminal";

import {
    Dispatch,
    PropsWithChildren,
    SetStateAction,
    createContext,
    createElement,
    useContext,
    useState,
} from "react";

type TerminalWindowContextValue = {
    Terminal: typeof JamblueTerminal.prototype;
    ConsoleLines: TerminalItem[];
    setConsoleLines: Dispatch<SetStateAction<TerminalItem[]>>;
};

// export const TerminalWindowContext = createContext(null);
const TerminalWindowContext = createContext<TerminalWindowContextValue>(
    {} as TerminalWindowContextValue
);
export const useTerminalWindow = () => useContext(TerminalWindowContext);
// useContextAndErrorIfNull(TerminalWindowContext);

export function TerminalWindowContextProvider(props: PropsWithChildren) {
    const [ConsoleLines, setConsoleLines] = useState([
        {
            text: "Welcome :)",
            // type: "normal",
            type: "system",
            // mode: "command",
            icon: "terminal",
        },
    ]);

    const Terminal = new JamblueTerminal(ConsoleLines, {} as TerminalConfig);

    return (
        <TerminalWindowContext.Provider
            value={{ Terminal, ConsoleLines, setConsoleLines }}
            {...props}>
            {...props.children}
        </TerminalWindowContext.Provider>
    );
}

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

export function TerminalWindow(props: TerminalWindowProps) {
    const { Terminal, ConsoleLines, setConsoleLines } = useTerminalWindow();
    // const [active, { toggle }] = useDisclosure(false);

    const form = {
        text: (value: any) =>
            /^[a-z0-9-_ ]*$/i.test(value)
                ? null
                : /^([-+/*]\d+(\.\d+)?)*/.test(value)
                ? () => {
                      return null;
                  }
                : `Invalid Command Characters, only alphanumeric characters, "-", "_" accepted`,
    };

    const [ActiveLineIcon, setActiveLineIcon] = useState({
        icon: "IconChevronRight",
        color: "",
        variant: "",
    });
    const [ActiveLineType, setActiveLineType] = useState("normal":);
    // const [ActiveLineIcon, setActiveLineIcon] = useState("normal");
    const [ActiveLineText, setActiveLineText] = useState("");
    // const [ActiveLineIcon, setActiveLineType] = useState(IconChevronRight);

    const ConsoleLineTextColorSelector = (item: TerminalItem, theme?: any) => {
        switch (item.type) {
            case "system":
                // return theme.colors.gray[6];
                return "gray";
            case "error":
                // return theme.colors.red[6];
                return "red";
            case "normal":
            default:
                // return theme.black;
                return "black";
        }
    };

    interface ConsoleLineIconColorSelectorResult {
        color: string | null;
        variant: string | null;
    }

    const ConsoleLineIconColorSelector = (item: TerminalItem) => {
        const result: ConsoleLineIconColorSelectorResult = {
            color: "",
            variant: "light",
        };

        switch (item.type) {
            case "system":
                result.color = "gray";
                result.variant = "light";
                break;
            case "error":
                result.color = "red";
                result.variant = "light";
                break;
            case "normal":
            default:
                // result.color = null;
                // result.variant = null;
                // result.color = "currentcolor";
                // result.variant = "currentcolor";
                result.color = "";
                result.variant = "";
        }

        console.log("colored: ", item.type, result);

        return result;
    };

    const ConsoleLineFontStyleSelector = (item: TerminalItem) => {
        switch (item.type) {
            case "system":
                return "italic";
            case "normal":
            default:
                // return null;
                return "";
        }
    };

    // Terminal.log("ahah")

    const StyledConsoleLines = ConsoleLines.map((item, ii) => {
        return (
            <div
                {...props.props?.lines}
                className={
                    props.classNames?.lines ? props.classNames.lines : ""
                }
                style={
                    props.styles?.lines
                        ? { ...props.styles.lines }
                        : {
                              display: "flex",
                              justifyContent: "flex-start",
                              alignItems: "flex-start",
                              flexDirection: "row",
                              flexWrap: "nowrap",
                              gap: "4px",
                          }
                }
                key={ii}>
                <div
                    {...props.props?.lines}
                    className={
                        props.classNames?.icons ? props.classNames.icons : ""
                    }
                    style={
                        props.styles?.icons
                            ? props.styles.icons
                            : {
                                  // backgroundColor:
                                  // ConsoleLineIconColorSelector(item).variant === "light"? "currentcolor" :,
                                  borderRadius: 24,
                                  color: ConsoleLineIconColorSelector(item)
                                      .color,
                              }
                    }>
                    <item.icon style={{ width: 16, height: 16 }}></item.icon>
                </div>

                <div
                    {...props.props?.texts}

                    className={
                        props.classNames?.texts ? props.classNames.texts : ""
                    }

                    style={
                        props.styles?.texts
                            ? props.styles.texts
                            : {
                                  color: ConsoleLineTextColorSelector(item),
                                  fontStyle: ConsoleLineFontStyleSelector(item),
                              }
                    }>
                    {item.text}
                </div>
            </div>
        );
    });

    return (
        <>
            <div
                style={
                    props.styles?.container
                        ? props.styles.container
                        : {
                              width: 480,
                              borderRadius: 12,
                              padding: 12,
                              boxShadow: "",
                          }
                }
                className={
                    props.classNames?.container
                        ? props.classNames.container
                        : ""
                }>
                <div
                    {...props.props?.header}
                    className={
                        props.classNames?.header ? props.classNames.header : ""
                    }
                    style={props.styles?.header ? props.styles.header : {}}>
                    Terminal UI
                </div>

                <div
                    {...props.props?.divider}
                    className={
                        props.classNames?.divider
                            ? props.classNames.divider
                            : ""
                    }
                    style={
                        props.styles?.divider ? props.styles.divider : {}
                    }></div>
                <div>
                    {StyledConsoleLines}
                    <form
                        name={"New Terminal Line"}
                        onSubmit={(event: any) => {
                            event.preventDefault();

                            console.log("hahahah", Terminal.commands);

                            console.log(event);
                            Terminal.addLine({
                                text: ActiveLineText,
                                type: ActiveLineType,
                                icon: ActiveLineIcon,
                            });
                            Terminal.parse("value.command.text");
                            // form.setFieldValue("command.text", "");

                            // Terminal.removeAllLines();
                        }}>
                        <div
                            style={{
                                gap: 12,
                                justifyContent: "flex-start",
                                alignItems: "flex-start",
                                flexDirection: "row",
                                flexWrap: "nowrap",
                            }}
                            className={""}>
                            <div
                                {...props.props?.lines}
                                className={
                                    props.classNames?.icons
                                        ? props.classNames.icons
                                        : ""
                                }
                                style={
                                    props.styles?.icons
                                        ? props.styles.icons
                                        : {
                                              // backgroundColor:
                                              // ConsoleLineIconColorSelector(item).variant === "light"? "currentcolor" :,
                                              borderRadius: 24,
                                              color: ActiveLineIcon.color,
                                          }
                                }>
                                <ActiveLineIcon.icon
                                    className={""}
                                    style={{
                                        width: 16,
                                        height: 16,
                                    }}></ActiveLineIcon.icon>
                            </div>
                            <input
                                onChange={(event) =>
                                    setActiveLineText(event.currentTarget.value)
                                }
                                value={ActiveLineText}
                                style={{ border: "none" }}
                                className={""}
                            />
                        </div>
                    </form>
                </div>
                {/* </div> */}

                <div
                    {...props.props?.divider}
                    className={
                        props.classNames?.divider
                            ? props.classNames.divider
                            : ""
                    }
                    style={
                        props.styles?.divider ? props.styles.divider : {}
                    }></div>
                <div
                    {...props.props?.footer}
                    className={
                        props.classNames?.footer ? props.classNames.footer : ""
                    }
                    style={
                        props.styles?.footer ? props.styles.footer : {}
                    }></div>
            </div>
        </>
    );
}
