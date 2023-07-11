"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardConsole = exports.DashboardConsoleContextProvider = exports.useDashboardConsoleContext = exports.DashboardConsoleContext = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
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
const react_1 = require("react");
// import Terminal as JamblueTerminal from "@jamblue/terminal";
const terminal_1 = require("@jamblue/terminal");
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
exports.DashboardConsoleContext = (0, react_1.createContext)({});
const useDashboardConsoleContext = () => (0, react_1.useContext)(exports.DashboardConsoleContext);
exports.useDashboardConsoleContext = useDashboardConsoleContext;
// useContextAndErrorIfNull(DashboardConsoleContext);
function DashboardConsoleContextProvider(props) {
    const [ConsoleLines, setConsoleLines] = (0, react_1.useState)([
        {
            text: "Welcome :)",
            // type: "normal",
            type: "system",
            // mode: "command",
            icon: "terminal",
        },
    ]);
    const Terminal = new terminal_1.default(ConsoleLines, {});
    return ((0, jsx_runtime_1.jsx)(exports.DashboardConsoleContext.Provider, Object.assign({ value: { Terminal, ConsoleLines, setConsoleLines } }, props, { children: props.children })));
}
exports.DashboardConsoleContextProvider = DashboardConsoleContextProvider;
function DashboardConsole() {
    const { Terminal, ConsoleLines, setConsoleLines } = (0, exports.useDashboardConsoleContext)();
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
                text: (value) => /^[a-z0-9-_ ]*$/i.test(value)
                    ? null
                    : /^([-+/*]\d+(\.\d+)?)*/.test(value)
                        ? () => {
                            return null;
                        }
                        : `Invalid Command Characters, only alphanumeric characters, "-", "_" accepted`,
            },
        },
    });
    const [ActiveLineIcon, setActiveLineIcon] = (0, react_1.useState)({
        icon: IconChevronRight,
        color: "",
        variant: "",
    });
    const [ActiveLineType, setActiveLineType] = (0, react_1.useState)("normal");
    // const [ActiveLineIcon, setActiveLineType] = useState(IconChevronRight);
    console.log("terminal:", Terminal.terminal);
    // Terminal.addLine({ text: "haha", type: "normal", icon: IconCode, id: uuidGen() });
    // console.log("terminal 2:", Terminal.lines);
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
        const result = {
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
    const ConsoleLineFontStyleSelector = (item) => {
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
        return ((0, jsx_runtime_1.jsxs)("div", { style: {
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                flexDirection: "row",
                flexWrap: "nowrap",
                gap: "4px",
            }, children: [(0, jsx_runtime_1.jsx)("div", { style: {
                        // backgroundColor:
                        // ConsoleLineIconColorSelector(item).variant === "light"? "currentcolor" :,
                        borderRadius: 24,
                        color: ConsoleLineIconColorSelector(item).color,
                    }, children: (0, jsx_runtime_1.jsx)(item.icon, { style: { width: 16, height: 16 } }) }), (0, jsx_runtime_1.jsx)("div", { style: {
                        color: ConsoleLineTextColorSelector(item, theme),
                        fontStyle: ConsoleLineFontStyleSelector(item),
                    }, className: classes.consoleLineText, children: item.text })] }, ii));
    });
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(Box, { children: (0, jsx_runtime_1.jsx)(Paper, { radius: "md", p: "md", withBorder: true, shadow: "xl", children: (0, jsx_runtime_1.jsxs)(Stack, { sx: { width: 480 }, children: [(0, jsx_runtime_1.jsx)("div", { className: classes.consoleHeader, children: "Command Prompt" }), (0, jsx_runtime_1.jsx)(Divider, {}), (0, jsx_runtime_1.jsx)(FocusTrap, { active: active, children: (0, jsx_runtime_1.jsxs)(ScrollArea, { onClick: toggle, offsetScrollbars: true, type: "auto", h: 180, children: [StyledConsoleLines, (0, jsx_runtime_1.jsx)("form", { onSubmit: form.onSubmit((value) => {
                                            console.log("hahahah", Terminal.commands);
                                            console.log(value);
                                            Terminal.addLine(value.command);
                                            Terminal.parse(value.command.text);
                                            form.setFieldValue("command.text", "");
                                            // Terminal.removeAllLines();
                                        }), children: (0, jsx_runtime_1.jsxs)(Flex, { gap: "xs", justify: "flex-start", align: "flex-start", direction: "row", wrap: "nowrap", className: classes.consoleLine, children: [(0, jsx_runtime_1.jsx)(ThemeIcon, { color: ActiveLineIcon.color, variant: ActiveLineIcon.variant, radius: "xl", children: (0, jsx_runtime_1.jsx)(ActiveLineIcon.icon, { className: classes.consoleLineIcon, size: 16 }) }), (0, jsx_runtime_1.jsx)(Input, Object.assign({ styles: (theme) => ({
                                                        input: { border: "none" },
                                                    }), sx: (theme) => ({
                                                        color: theme.black,
                                                    }), className: classes.consoleLineText, "data-autofocus": true }, form.getInputProps("command.text")))] }) })] }) }), (0, jsx_runtime_1.jsx)(Divider, {}), (0, jsx_runtime_1.jsx)("div", { className: classes.consoleFooter })] }) }) }) }));
}
exports.DashboardConsole = DashboardConsole;
