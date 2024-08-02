var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Controller } from '../abstract/controller.class.js';
var KeyboardController = /** @class */ (function (_super) {
    __extends(KeyboardController, _super);
    function KeyboardController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        Object.defineProperty(_this, "application", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        return _this;
    }
    Object.defineProperty(KeyboardController.prototype, "attach", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (application) {
            if (!this.application) {
                this.application = application;
            }
            else {
                throw new Error("".concat(this.constructor.name, " already attached"));
            }
            return this;
        }
    });
    Object.defineProperty(KeyboardController.prototype, "detach", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            this.application = null;
            return this;
        }
    });
    return KeyboardController;
}(Controller));
export { KeyboardController };
//# sourceMappingURL=keyboard.controller.js.map