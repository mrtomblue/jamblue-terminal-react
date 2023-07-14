"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TerminalWindow = exports.TerminalWindowContextProvider = exports.useTerminalWindow = void 0;
const react_1 = require("react");
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
const terminal_1 = require("@jamblue/terminal");
const react_2 = require("react");
// export const TerminalWindowContext = createContext(null);
const TerminalWindowContext = (0, react_2.createContext)({});
const useTerminalWindow = () => (0, react_2.useContext)(TerminalWindowContext);
exports.useTerminalWindow = useTerminalWindow;
// useContextAndErrorIfNull(TerminalWindowContext);
function TerminalWindowContextProvider(props) {
    const initialStates = {
        text: "Welcome :)",
        // type: "normal",
        type: "system",
        // mode: "command",
        icon: "terminal",
    };
    const [ConsoleLines, setConsoleLines] = (0, react_2.useState)([
        initialStates
    ]);
    const Terminal = new terminal_1.default(ConsoleLines, {}, {
        activeStates: initialStates,
    });
    return ((0, jsx_runtime_1.jsx)(TerminalWindowContext.Provider, Object.assign({ value: { Terminal, ConsoleLines, setConsoleLines } }, props, { children: props.children })));
}
exports.TerminalWindowContextProvider = TerminalWindowContextProvider;
function TerminalWindow(props) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
    const { Terminal, ConsoleLines, setConsoleLines } = (0, exports.useTerminalWindow)();
    // const [active, { toggle }] = useDisclosure(false);
    const form = {
        text: (value) => /^[a-z0-9-_ ]*$/i.test(value)
            ? null
            : /^([-+/*]\d+(\.\d+)?)*/.test(value)
                ? () => {
                    return null;
                }
                : `Invalid Command Characters, only alphanumeric characters, "-", "_" accepted`,
    };
    const [ActiveLineIcon, setActiveLineIcon] = (0, react_2.useState)({
        icon: "IconChevronRight",
        color: "",
        variant: "",
    });
    const [ActiveLineType, setActiveLineType] = (0, react_2.useState)("normal");
    // const [ActiveLineIcon, setActiveLineIcon] = useState("normal");
    const [ActiveLineText, setActiveLineText] = (0, react_2.useState)("");
    // const [ActiveLineIcon, setActiveLineType] = useState(IconChevronRight);
    const ConsoleLineTextColorSelector = (item, theme) => {
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
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        return ((0, react_1.createElement)("div", Object.assign({}, (_a = props.props) === null || _a === void 0 ? void 0 : _a.lines, { className: ((_b = props.classNames) === null || _b === void 0 ? void 0 : _b.lines) ? props.classNames.lines : "", style: ((_c = props.styles) === null || _c === void 0 ? void 0 : _c.lines)
                ? Object.assign({}, props.styles.lines) : {
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                flexDirection: "row",
                flexWrap: "nowrap",
                gap: "4px",
            }, key: ii }),
            (0, jsx_runtime_1.jsx)("div", Object.assign({}, (_d = props.props) === null || _d === void 0 ? void 0 : _d.lines, { className: ((_e = props.classNames) === null || _e === void 0 ? void 0 : _e.icons) ? props.classNames.icons : "", style: ((_f = props.styles) === null || _f === void 0 ? void 0 : _f.icons)
                    ? props.styles.icons
                    : {
                        // backgroundColor:
                        // ConsoleLineIconColorSelector(item).variant === "light"? "currentcolor" :,
                        borderRadius: 24,
                        color: ConsoleLineIconColorSelector(item)
                            .color,
                    }, children: (0, jsx_runtime_1.jsx)(item.icon, { style: { width: 16, height: 16 } }) })),
            (0, jsx_runtime_1.jsx)("div", Object.assign({}, (_g = props.props) === null || _g === void 0 ? void 0 : _g.texts, { className: ((_h = props.classNames) === null || _h === void 0 ? void 0 : _h.texts) ? props.classNames.texts : "", style: ((_j = props.styles) === null || _j === void 0 ? void 0 : _j.texts)
                    ? props.styles.texts
                    : {
                        color: ConsoleLineTextColorSelector(item),
                        fontStyle: ConsoleLineFontStyleSelector(item),
                    }, children: item.text }))));
    });
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)("div", { style: ((_a = props.styles) === null || _a === void 0 ? void 0 : _a.container)
                ? props.styles.container
                : {
                    width: 480,
                    borderRadius: 12,
                    padding: 12,
                    boxShadow: "",
                }, className: ((_b = props.classNames) === null || _b === void 0 ? void 0 : _b.container)
                ? props.classNames.container
                : "", children: [(0, jsx_runtime_1.jsx)("div", Object.assign({}, (_c = props.props) === null || _c === void 0 ? void 0 : _c.header, { className: ((_d = props.classNames) === null || _d === void 0 ? void 0 : _d.header) ? props.classNames.header : "", style: ((_e = props.styles) === null || _e === void 0 ? void 0 : _e.header) ? props.styles.header : {}, children: "Terminal UI" })), (0, jsx_runtime_1.jsx)("div", Object.assign({}, (_f = props.props) === null || _f === void 0 ? void 0 : _f.divider, { className: ((_g = props.classNames) === null || _g === void 0 ? void 0 : _g.divider)
                        ? props.classNames.divider
                        : "", style: ((_h = props.styles) === null || _h === void 0 ? void 0 : _h.divider) ? props.styles.divider : {} })), (0, jsx_runtime_1.jsxs)("div", { children: [StyledConsoleLines, (0, jsx_runtime_1.jsx)("form", { name: "New Terminal Line", onSubmit: (event) => {
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
                            }, children: (0, jsx_runtime_1.jsxs)("div", { style: {
                                    gap: 12,
                                    justifyContent: "flex-start",
                                    alignItems: "flex-start",
                                    flexDirection: "row",
                                    flexWrap: "nowrap",
                                }, className: "", children: [(0, jsx_runtime_1.jsx)("div", Object.assign({}, (_j = props.props) === null || _j === void 0 ? void 0 : _j.lines, { className: ((_k = props.classNames) === null || _k === void 0 ? void 0 : _k.icons)
                                            ? props.classNames.icons
                                            : "", style: ((_l = props.styles) === null || _l === void 0 ? void 0 : _l.icons)
                                            ? props.styles.icons
                                            : {
                                                // backgroundColor:
                                                // ConsoleLineIconColorSelector(item).variant === "light"? "currentcolor" :,
                                                borderRadius: 24,
                                                color: ActiveLineIcon.color,
                                            }, children: (0, jsx_runtime_1.jsx)(ActiveLineIcon.icon, { className: "", style: {
                                                width: 16,
                                                height: 16,
                                            } }) })), (0, jsx_runtime_1.jsx)("input", { onChange: (event) => setActiveLineText(event.currentTarget.value), value: ActiveLineText, style: { border: "none" }, className: "" })] }) })] }), (0, jsx_runtime_1.jsx)("div", Object.assign({}, (_m = props.props) === null || _m === void 0 ? void 0 : _m.divider, { className: ((_o = props.classNames) === null || _o === void 0 ? void 0 : _o.divider)
                        ? props.classNames.divider
                        : "", style: ((_p = props.styles) === null || _p === void 0 ? void 0 : _p.divider) ? props.styles.divider : {} })), (0, jsx_runtime_1.jsx)("div", Object.assign({}, (_q = props.props) === null || _q === void 0 ? void 0 : _q.footer, { className: ((_r = props.classNames) === null || _r === void 0 ? void 0 : _r.footer) ? props.classNames.footer : "", style: ((_s = props.styles) === null || _s === void 0 ? void 0 : _s.footer) ? props.styles.footer : {} }))] }) }));
}
exports.TerminalWindow = TerminalWindow;
//# sourceMappingURL=main.js.map