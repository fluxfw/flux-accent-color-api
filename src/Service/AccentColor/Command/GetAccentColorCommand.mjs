import { ACCENT_COLOR_SETTINGS_KEY } from "../../../Adapter/Settings/ACCENT_COLOR_SETTINGS_KEY.mjs";

/** @typedef {import("../../../../../flux-settings-api/src/Adapter/Api/SettingsApi.mjs").SettingsApi} SettingsApi */

export class GetAccentColorCommand {
    /**
     * @type {string[]}
     */
    #accent_colors;
    /**
     * @type {boolean}
     */
    #custom_accent_color;
    /**
     * @type {SettingsApi}
     */
    #settings_api;

    /**
     * @param {string[]} accent_colors
     * @param {SettingsApi} settings_api
     * @param {boolean} custom_accent_color
     * @returns {GetAccentColorCommand}
     */
    static new(accent_colors, settings_api, custom_accent_color = true) {
        return new this(
            accent_colors,
            settings_api,
            custom_accent_color
        );
    }

    /**
     * @param {string[]} accent_colors
     * @param {SettingsApi} settings_api
     * @param {boolean} custom_accent_color
     * @private
     */
    constructor(accent_colors, settings_api, custom_accent_color) {
        this.#accent_colors = accent_colors;
        this.#settings_api = settings_api;
        this.#custom_accent_color = custom_accent_color;
    }

    /**
     * @returns {string}
     */
    getAccentColor() {
        const accent_color = this.#settings_api.get(
            ACCENT_COLOR_SETTINGS_KEY,
            ""
        );

        if (accent_color !== "" && (this.#accent_colors.includes(accent_color) || this.#custom_accent_color)) {
            return accent_color;
        }

        return this.#accent_colors[0] ?? "";
    }
}
