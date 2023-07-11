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
import {
    PropsWithChildren,
    ReactPropTypes,
    createContext,
    useContext,
    useState,
} from "react";
// import Terminal as JamblueTerminal from "@jamblue/terminal";
import JamblueTerminal, {
    TerminalConfig,
    TerminalItem,
} from "@jamblue/terminal";
import React = require("react");

type TerminalWindowContextValue = {
    Terminal: typeof JamblueTerminal.prototype;
    // ConsoleLines: Array<TerminalItem>;
    ConsoleLines: TerminalItem[];
    // setConsoleLines: React.Dispatch<React.SetStateAction<Array<TerminalItem>>>;
    setConsoleLines: React.Dispatch<React.SetStateAction<TerminalItem[]>>;
};

// // * modified version of from https://stackoverflow.com/a/64266985/17443354
// // const useContextAndErrorIfNull = <TerminalWindowContextValue>(context: React.Context<TerminalWindowContextValue | null>): TerminalWindowContextValue => {
// const useContextAndErrorIfNull = (context: React.Context<TerminalWindowContextValue | null>): TerminalWindowContextValue => {
// // const useContextAndErrorIfNull = (context: React.Context<TerminalWindowContextValue>): TerminalWindowContextValue => {
//   const contextValue = useContext(context);
//   if (contextValue === null) {
//     throw Error("Context has not been Provided!");
//   }
//   return contextValue;
// }

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

    return React.createElement(TerminalWindowContext.Provider, {
        value: { Terminal, ConsoleLines, setConsoleLines, ...props },
        ...React.Children.toArray(props.children),
    });
    // (
    // <TerminalWindowContext.Provider
    //     value={{ Terminal, ConsoleLines, setConsoleLines }}
    //     {...props}>
    //     {props.children}
    // </TerminalWindowContext.Provider>
    // );
}

interface TerminalWindowProps {
    styles: {
        lines: object;
        icons: object;
        texts: object;
        header: object;
        footer: object;
        form: object;
    };
    classNames: { lines: string; icons: string; texts: string };
    props: { lines: object; icons: object; texts: object };
}

export function TerminalWindow(props: TerminalWindowProps) {
    const { Terminal, ConsoleLines, setConsoleLines } = useTerminalWindow();
    const [active, { toggle }] = useDisclosure(false);

    const form = {
        text: (value) =>
            /^[a-z0-9-_ ]*$/i.test(value)
                ? null
                : /^([-+/*]\d+(\.\d+)?)*/.test(value)
                ? () => {
                      return null;
                  }
                : `Invalid Command Characters, only alphanumeric characters, "-", "_" accepted`,
    };

    const [ActiveLineIcon, setActiveLineIcon] = useState({
        icon: IconChevronRight,
        color: "",
        variant: "",
    });
    const [ActiveLineType, setActiveLineType] = useState("normal");
    // const [ActiveLineIcon, setActiveLineType] = useState(IconChevronRight);

    const ConsoleLineTextColorSelector = (item: TerminalItem, theme) => {
        switch (item.type) {
            case "system":
                return theme.colors.gray[6];
            case "error":
                return theme.colors.red[6];
            case "normal":
            default:
                return theme.black;
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
                {/* <Container sx={{ width: 16, height: 16 }}> */}
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
                {/* </Container> */}
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
            <Box>
                <Paper radius={"md"} p={"md"} withBorder shadow="xl">
                    <Stack sx={{ width: 480 }}>
                        <div className={classes.consoleHeader}>
                            Command Prompt
                        </div>
                        <Divider></Divider>
                        <FocusTrap active={active}>
                            <ScrollArea
                                onClick={toggle}
                                offsetScrollbars
                                type={"auto"}
                                h={180}>
                                {StyledConsoleLines}
                                <form
                                    onSubmit={form.onSubmit((value) =>
                                        // value.forEach((item, ii) => {
                                        // console.log(value)
                                        // })
                                        {
                                            console.log(
                                                "hahahah",
                                                Terminal.commands
                                            );

                                            console.log(value);
                                            Terminal.addLine(value.command);
                                            Terminal.parse(value.command.text);
                                            form.setFieldValue(
                                                "command.text",
                                                ""
                                            );

                                            // Terminal.removeAllLines();
                                        }
                                    )}>
                                    <div
                                        gap="xs"
                                        justify="flex-start"
                                        align="flex-start"
                                        direction="row"
                                        wrap="nowrap"
                                        className={classes.consoleLine}>
                                        <ThemeIcon
                                            color={ActiveLineIcon.color}
                                            variant={ActiveLineIcon.variant}
                                            radius="xl">
                                            <ActiveLineIcon.icon
                                                className={
                                                    classes.consoleLineIcon
                                                }
                                                size={16}></ActiveLineIcon.icon>
                                        </ThemeIcon>
                                        <Input
                                            styles={(theme) => ({
                                                input: { border: "none" },
                                            })}
                                            sx={(theme) => ({
                                                color: theme.black,
                                            })}
                                            className={classes.consoleLineText}
                                            data-autofocus
                                            {...form.getInputProps(
                                                "command.text"
                                            )}
                                        />
                                    </div>
                                </form>
                            </ScrollArea>
                        </FocusTrap>
                        <Divider></Divider>
                        <div className={classes.consoleFooter}></div>
                    </Stack>
                </Paper>
            </Box>
        </>
    );
}
