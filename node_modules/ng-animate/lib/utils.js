"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function transformAxis(axis, name) {
    return function (letter) {
        return axis === 'x'
            ? name + "({{ " + letter + " }}, 0, 0)"
            : name + "(0, {{ " + letter + " }}, 0)";
    };
}
exports.transformAxis = transformAxis;
exports.DEFAULT_TIMING = 1;
