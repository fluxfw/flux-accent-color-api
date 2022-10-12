import { ACCENT_COLOR_CSS_PROPERTY } from "../../../Adapter/AccentColor/ACCENT_COLOR_CSS_PROPERTY.mjs";

/** @typedef {import("../Port/AccentColorService.mjs").AccentColorService} AccentColorService */
/** @typedef {import("../../../Adapter/AccentColor/getAccentColorChangeListeners.mjs").getAccentColorChangeListeners} getAccentColorChangeListeners */

export class RenderAccentColorCommand {
    /**
     * @type {AccentColorService}
     */
    #accent_color_service;
    /**
     * @type {getAccentColorChangeListeners}
     */
    #get_accent_color_change_listeners;

    /**
     * @param {AccentColorService} accent_color_service
     * @param {getAccentColorChangeListeners} get_accent_color_change_listeners
     * @returns {RenderAccentColorCommand}
     */
    static new(accent_color_service, get_accent_color_change_listeners) {
        return new this(
            accent_color_service,
            get_accent_color_change_listeners
        );
    }

    /**
     * @param {AccentColorService} accent_color_service
     * @param {getAccentColorChangeListeners} get_accent_color_change_listeners
     * @private
     */
    constructor(accent_color_service, get_accent_color_change_listeners) {
        this.#accent_color_service = accent_color_service;
        this.#get_accent_color_change_listeners = get_accent_color_change_listeners;
    }

    /**
     * @returns {void}
     */
    renderAccentColor() {
        const accent_color = this.#accent_color_service.getAccentColor();

        document.documentElement.style.setProperty(ACCENT_COLOR_CSS_PROPERTY, accent_color.startsWith("#") ? accent_color : `var(${ACCENT_COLOR_CSS_PROPERTY}-${accent_color})`);

        const accent_color_value = this.#accent_color_service.getAccentColorValue();

        const theme_color_meta = document.head.querySelector("meta[name=theme-color]") ?? document.createElement("meta");
        theme_color_meta.content = accent_color_value;
        theme_color_meta.name = "theme-color";
        if (!theme_color_meta.isConnected) {
            document.head.appendChild(theme_color_meta);
        }

        for (const accent_color_change_listener of this.#get_accent_color_change_listeners()) {
            accent_color_change_listener(
                accent_color_value
            );
        }
    }
}
