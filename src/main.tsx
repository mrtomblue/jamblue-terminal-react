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

type DashboardConsoleContextValue = {
    Terminal: typeof JamblueTerminal.prototype;
    // ConsoleLines: Array<TerminalItem>;
    ConsoleLines: TerminalItem[];
    // setConsoleLines: React.Dispatch<React.SetStateAction<Array<TerminalItem>>>;
    setConsoleLines: React.Dispatch<React.SetStateAction<TerminalItem[]>>;
};

// // * modified version of from https://stackoverflow.com/a/64266985/17443354
// // const useContextAndErrorIfNull = <DashboardConsoleContextValue>(context: React.Context<DashboardConsoleContextValue | null>): DashboardConsoleContextValue => {
// const useContextAndErrorIfNull = (context: React.Context<DashboardConsoleContextValue | null>): DashboardConsoleContextValue => {
// // const useContextAndErrorIfNull = (context: React.Context<DashboardConsoleContextValue>): DashboardConsoleContextValue => {
//   const contextValue = useContext(context);
//   if (contextValue === null) {
//     throw Error("Context has not been Provided!");
//   }
//   return contextValue;
// }

// export const DashboardConsoleContext = createContext(null);
export const DashboardConsoleContext =
    createContext<DashboardConsoleContextValue>(
        {} as DashboardConsoleContextValue
    );
export const useDashboardConsoleContext = () =>
    useContext(DashboardConsoleContext);
// useContextAndErrorIfNull(DashboardConsoleContext);

export function DashboardConsoleContextProvider(props: PropsWithChildren) {
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
        <DashboardConsoleContext.Provider
            value={{ Terminal, ConsoleLines, setConsoleLines }}
            {...props}>
            {props.children}
        </DashboardConsoleContext.Provider>
    );
}

export function DashboardConsole() {
    const { Terminal, ConsoleLines, setConsoleLines } =
        useDashboardConsoleContext();
    const { classes, cx } = useStyles();
    const [active, { toggle }] = useDisclosure(false);
    const form = useForm({
        initialValues: {
            command: {
                type: "normal",
                text: "",
                icon: IconChevronRight,
            },
            admin: false,
        },

        validate: {
            command: {
                text: (value) =>
                    /^[a-z0-9-_ ]*$/i.test(value)
                        ? null
                        : /^([-+/*]\d+(\.\d+)?)*/.test(value)
                        ? () => {
                              return null;
                          }
                        : `Invalid Command Characters, only alphanumeric characters, "-", "_" accepted`,
            },
        },
    });
    const [ActiveLineIcon, setActiveLineIcon] = useState({
        icon: IconChevronRight,
        color: "",
        variant: "",
    });
    const [ActiveLineType, setActiveLineType] = useState("normal");
    // const [ActiveLineIcon, setActiveLineType] = useState(IconChevronRight);

    console.log("terminal:", Terminal.terminal);

    // Terminal.addLine({ text: "haha", type: "normal", icon: IconCode, id: uuidGen() });
    // console.log("terminal 2:", Terminal.lines);

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
                style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    flexDirection: "row",
                    flexWrap: "nowrap",
                    gap: "4px",
                }}
                key={ii}>
                {/* <Container sx={{ width: 16, height: 16 }}> */}
                <div
                    style={{
                        // backgroundColor:
                        // ConsoleLineIconColorSelector(item).variant === "light"? "currentcolor" :,
                        borderRadius: 24,
                        color: ConsoleLineIconColorSelector(item).color,
                    }}>
                    <item.icon style={{ width: 16, height: 16 }}></item.icon>
                </div>
                {/* </Container> */}
                <div
                    style={{
                        color: ConsoleLineTextColorSelector(item, theme),
                        fontStyle: ConsoleLineFontStyleSelector(item),
                    }}
                    className={classes.consoleLineText}>
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
                                    <Flex
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
                                    </Flex>
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
