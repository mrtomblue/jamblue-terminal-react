import { createElement as _createElement } from "react";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import JamblueTerminal from "@jamblue/terminal";
import { createContext, useContext, useState, } from "react";
const TerminalWindowContext = createContext({});
export const useTerminalWindow = () => useContext(TerminalWindowContext);
export function TerminalWindowContextProvider(props) {
    const initialStates = {
        text: "Welcome :)",
        type: "system",
        icon: "terminal",
    };
    const [ConsoleLines, setConsoleLines] = useState([
        initialStates
    ]);
    const Terminal = new JamblueTerminal(ConsoleLines, {}, {
        activeStates: initialStates,
    });
    return (_jsx(TerminalWindowContext.Provider, Object.assign({ value: { Terminal, ConsoleLines, setConsoleLines } }, props, { children: props.children })));
}
export function TerminalWindow(props) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
    const { Terminal, ConsoleLines, setConsoleLines } = useTerminalWindow();
    const form = {
        text: (value) => /^[a-z0-9-_ ]*$/i.test(value)
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
    const [ActiveLineType, setActiveLineType] = useState("normal");
    const [ActiveLineText, setActiveLineText] = useState("");
    const ConsoleLineTextColorSelector = (item, theme) => {
        switch (item.type) {
            case "system":
                return "gray";
            case "error":
                return "red";
            case "normal":
            default:
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
                return "";
        }
    };
    const StyledConsoleLines = ConsoleLines.map((item, ii) => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        return (_createElement("div", Object.assign({}, (_a = props.props) === null || _a === void 0 ? void 0 : _a.lines, { className: ((_b = props.classNames) === null || _b === void 0 ? void 0 : _b.lines) ? props.classNames.lines : "", style: ((_c = props.styles) === null || _c === void 0 ? void 0 : _c.lines)
                ? Object.assign({}, props.styles.lines) : {
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                flexDirection: "row",
                flexWrap: "nowrap",
                gap: "4px",
            }, key: ii }),
            _jsx("div", Object.assign({}, (_d = props.props) === null || _d === void 0 ? void 0 : _d.lines, { className: ((_e = props.classNames) === null || _e === void 0 ? void 0 : _e.icons) ? props.classNames.icons : "", style: ((_f = props.styles) === null || _f === void 0 ? void 0 : _f.icons)
                    ? props.styles.icons
                    : {
                        borderRadius: 24,
                        color: ConsoleLineIconColorSelector(item)
                            .color,
                    }, children: _jsx(item.icon, { style: { width: 16, height: 16 } }) })),
            _jsx("div", Object.assign({}, (_g = props.props) === null || _g === void 0 ? void 0 : _g.texts, { className: ((_h = props.classNames) === null || _h === void 0 ? void 0 : _h.texts) ? props.classNames.texts : "", style: ((_j = props.styles) === null || _j === void 0 ? void 0 : _j.texts)
                    ? props.styles.texts
                    : {
                        color: ConsoleLineTextColorSelector(item),
                        fontStyle: ConsoleLineFontStyleSelector(item),
                    }, children: item.text }))));
    });
    return (_jsx(_Fragment, { children: _jsxs("div", { style: ((_a = props.styles) === null || _a === void 0 ? void 0 : _a.container)
                ? props.styles.container
                : {
                    width: 480,
                    borderRadius: 12,
                    padding: 12,
                    boxShadow: "",
                }, className: ((_b = props.classNames) === null || _b === void 0 ? void 0 : _b.container)
                ? props.classNames.container
                : "", children: [_jsx("div", Object.assign({}, (_c = props.props) === null || _c === void 0 ? void 0 : _c.header, { className: ((_d = props.classNames) === null || _d === void 0 ? void 0 : _d.header) ? props.classNames.header : "", style: ((_e = props.styles) === null || _e === void 0 ? void 0 : _e.header) ? props.styles.header : {}, children: "Terminal UI" })), _jsx("div", Object.assign({}, (_f = props.props) === null || _f === void 0 ? void 0 : _f.divider, { className: ((_g = props.classNames) === null || _g === void 0 ? void 0 : _g.divider)
                        ? props.classNames.divider
                        : "", style: ((_h = props.styles) === null || _h === void 0 ? void 0 : _h.divider) ? props.styles.divider : {} })), _jsxs("div", { children: [StyledConsoleLines, _jsx("form", { name: "New Terminal Line", onSubmit: (event) => {
                                event.preventDefault();
                                console.log("hahahah", Terminal.commands);
                                console.log(event);
                                Terminal.addLine({
                                    text: ActiveLineText,
                                    type: ActiveLineType,
                                    icon: ActiveLineIcon,
                                });
                                Terminal.parse("value.command.text");
                            }, children: _jsxs("div", { style: {
                                    gap: 12,
                                    justifyContent: "flex-start",
                                    alignItems: "flex-start",
                                    flexDirection: "row",
                                    flexWrap: "nowrap",
                                }, className: "", children: [_jsx("div", Object.assign({}, (_j = props.props) === null || _j === void 0 ? void 0 : _j.lines, { className: ((_k = props.classNames) === null || _k === void 0 ? void 0 : _k.icons)
                                            ? props.classNames.icons
                                            : "", style: ((_l = props.styles) === null || _l === void 0 ? void 0 : _l.icons)
                                            ? props.styles.icons
                                            : {
                                                borderRadius: 24,
                                                color: ActiveLineIcon.color,
                                            }, children: _jsx(ActiveLineIcon.icon, { className: "", style: {
                                                width: 16,
                                                height: 16,
                                            } }) })), _jsx("input", { onChange: (event) => setActiveLineText(event.currentTarget.value), value: ActiveLineText, style: { border: "none" }, className: "" })] }) })] }), _jsx("div", Object.assign({}, (_m = props.props) === null || _m === void 0 ? void 0 : _m.divider, { className: ((_o = props.classNames) === null || _o === void 0 ? void 0 : _o.divider)
                        ? props.classNames.divider
                        : "", style: ((_p = props.styles) === null || _p === void 0 ? void 0 : _p.divider) ? props.styles.divider : {} })), _jsx("div", Object.assign({}, (_q = props.props) === null || _q === void 0 ? void 0 : _q.footer, { className: ((_r = props.classNames) === null || _r === void 0 ? void 0 : _r.footer) ? props.classNames.footer : "", style: ((_s = props.styles) === null || _s === void 0 ? void 0 : _s.footer) ? props.styles.footer : {} }))] }) }));
}
//# sourceMappingURL=main.js.map