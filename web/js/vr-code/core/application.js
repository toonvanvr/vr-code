import { KeyboardController } from "./controllers/keyboard.controller.js";
import { ApplicationElement } from "./elements/application.element.js";
var Application = /** @class */ (function () {
    function Application(_a) {
        var htmlTag = _a.htmlTag;
        /** HTML tag for the root element and prefix for custom elements */
        Object.defineProperty(this, "htmlTag", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /** Input interfaces extending {@link Controller} */
        Object.defineProperty(this, "controllers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Set([new KeyboardController()])
        });
        this.htmlTag = htmlTag;
        this.registerHtmlElements();
    }
    Object.defineProperty(Application.prototype, "registerHtmlElements", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            var elements = [{ tag: this.htmlTag, Element: ApplicationElement }];
            // Assert no HTML tag namespace collisions
            var namespaceCollisions = elements
                .map(function (_a) {
                var tag = _a.tag;
                return customElements.get(tag);
            })
                .filter(function (v) { return v !== undefined; });
            if (namespaceCollisions.length) {
                throw new Error("Custom element".concat(namespaceCollisions.length > 1 ? "s" : "", " already registered: ").concat(namespaceCollisions
                    .map(function (v) { return v === null || v === void 0 ? void 0 : v.name; })
                    .join(", ")));
            }
            // Register the elements
            for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
                var _a = elements_1[_i], tag = _a.tag, Element_1 = _a.Element;
                customElements.define(tag, Element_1);
            }
        }
    });
    return Application;
}());
export { Application };
//# sourceMappingURL=application.js.map