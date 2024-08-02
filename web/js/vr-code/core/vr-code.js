import { KeyboardInput } from './inputs/keyboard-input';
var Application = /** @class */ (function () {
    function Application() {
        Object.defineProperty(this, "inputs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Set([new KeyboardInput(this)])
        });
    }
    return Application;
}());
export { Application };
//# sourceMappingURL=vr-code.js.map