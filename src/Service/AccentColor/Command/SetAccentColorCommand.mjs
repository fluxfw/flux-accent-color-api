import { ACCENT_COLOR_SETTINGS_KEY } from "../../../Adapter/Settings/ACCENT_COLOR_SETTINGS_KEY.mjs";

/** @typedef {import("../Port/AccentColorService.mjs").AccentColorService} AccentColorService */
/** @typedef {import("../../../../../flux-settings-api/src/Adapter/Api/SettingsApi.mjs").SettingsApi} SettingsApi */

export class SetAccentColorCommand {
    /**
     * @type {AccentColorService}
     */
    #accent_color_service;
    /**
     * @type {SettingsApi}
     */
    #settings_api;

    /**
     * @param {AccentColorService} accent_color_service
     * @param {SettingsApi} settings_api
     * @returns {SetAccentColorCommand}
     */
    static new(accent_color_service, settings_api) {
        return new this(
            accent_color_service,
            settings_api
        );
    }

    /**
     * @param {AccentColorService} accent_color_service
     * @param {SettingsApi} settings_api
     * @private
     */
    constructor(accent_color_service, settings_api) {
        this.#accent_color_service = accent_color_service;
        this.#settings_api = settings_api;
    }

    /**
     * @param {string} accent_color
     * @returns {void}
     */
    setAccentColor(accent_color) {
        this.#settings_api.store(
            ACCENT_COLOR_SETTINGS_KEY,
            accent_color
        );

        this.#accent_color_service.renderAccentColor();
    }
}
