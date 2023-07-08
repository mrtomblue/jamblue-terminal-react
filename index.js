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
import { createContext, useContext, useState } from "react";

export const DashboardConsoleContext = createContext();
export const useDashboardConsoleContext = () =>
    useContext(DashboardConsoleContext);

export function DashboardConsoleContextProvider(props) {
    const [ConsoleLines, setConsoleLines] = useState([
        {
            text: "Welcome :)",
            // type: "normal",
            type: "system",
            // mode: "command",
            icon: IconTerminal,
        },
    ]);
    const Console_ = new __Console(ConsoleLines);

    return (
        <DashboardConsoleContext.Provider
            value={{ Console_, ConsoleLines, setConsoleLines }}
            {...props}>
            {props.children}
        </DashboardConsoleContext.Provider>
    );
}

export function DashboardConsole() {
    const { Console_, ConsoleLines, setConsoleLines } =
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

    console.log("terminal:", Console_.lines);

    // Console_.addLine({ text: "haha", type: "normal", icon: IconCode, id: uuidGen() });
    // console.log("terminal 2:", Console_.lines);

    const ConsoleLineTextColorSelector = (item, theme) => {
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

    const ConsoleLineIconColorSelector = (item) => {
        const result = { color: "", variant: "light" };

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
                result.color = null;
                result.variant = null;
        }

        console.log("colored: ", item.type, result);

        return result;
    };

    const ConsoleLineFontStyleSelector = (item) => {
        switch (item.type) {
            case "system":
                return "italic";
            case "normal":
            default:
                return null;
        }
    };

    // Console_.log("ahah")

    const StyledConsoleLines = ConsoleLines.map((item, ii) => {
        return (
            <Flex
                gap="xs"
                justify="flex-start"
                align="flex-start"
                direction="row"
                wrap="nowrap"
                key={ii}
                className={classes.consoleLine}>
                {/* <Container sx={{ width: 16, height: 16 }}> */}
                <ThemeIcon
                    variant={ConsoleLineIconColorSelector(item).variant}
                    radius="xl"
                    color={ConsoleLineIconColorSelector(item).color}>
                    <item.icon
                        className={classes.consoleLineIcon}
                        size={16}></item.icon>
                </ThemeIcon>
                {/* </Container> */}
                <Text
                    // fs={ConsoleLineFontStyleSelector(item)}
                    sx={(theme) => ({
                        color: ConsoleLineTextColorSelector(item, theme),
                        fontStyle: ConsoleLineFontStyleSelector(item),
                    })}
                    className={classes.consoleLineText}>
                    {item.text}
                </Text>
            </Flex>
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
                                                Console_.commands
                                            );

                                            console.log(value);
                                            Console_.addLine(value.command);
                                            Console_.parse(value.command.text);
                                            form.setFieldValue(
                                                "command.text",
                                                ""
                                            );

                                            // Console_.removeAllLines();
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
