import { ACCENT_COLOR_CSS_PROPERTY } from "../../../Adapter/AccentColor/ACCENT_COLOR_CSS_PROPERTY.mjs";

export class GetAccentColorValueCommand {
    /**
     * @returns {GetAccentColorValueCommand}
     */
    static new() {
        return new this();
    }

    /**
     * @private
     */
    constructor() {

    }

    /**
     * @returns {string}
     */
    getAccentColorValue() {
        return getComputedStyle(document.documentElement).getPropertyValue(ACCENT_COLOR_CSS_PROPERTY).trim();
    }
}
