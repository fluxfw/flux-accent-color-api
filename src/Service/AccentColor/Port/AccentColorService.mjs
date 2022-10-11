import { GetAccentColorCommand } from "../Command/GetAccentColorCommand.mjs";
import { GetSelectAccentColorElementCommand } from "../Command/GetSelectAccentColorElementCommand.mjs";
import { RenderAccentColorCommand } from "../Command/RenderAccentColorCommand.mjs";
import { SetAccentColorCommand } from "../Command/SetAccentColorCommand.mjs";

/** @typedef {import("../../../../../flux-css-api/src/Adapter/Api/CssApi.mjs").CssApi} CssApi */
/** @typedef {import("../../../Adapter/AccentColor/getAccentColorChangeListeners.mjs").getAccentColorChangeListeners} getAccentColorChangeListeners */
/** @typedef {import("../../../../../flux-localization-api/src/Adapter/Api/LocalizationApi.mjs").LocalizationApi} LocalizationApi */
/** @typedef {import("../../../Adapter/AccentColor/SelectAccentColorElement.mjs").SelectAccentColorElement} SelectAccentColorElement */
/** @typedef {import("../../../../../flux-settings-api/src/Adapter/Api/SettingsApi.mjs").SettingsApi} SettingsApi */

export class AccentColorService {
    /**
     * @type {string[]}
     */
    #accent_colors;
    /**
     * @type {CssApi}
     */
    #css_api;
    /**
     * @type {boolean}
     */
    #custom_accent_color;
    /**
     * @type {getAccentColorChangeListeners}
     */
    #get_accent_color_change_listeners;
    /**
     * @type {LocalizationApi}
     */
    #localization_api;
    /**
     * @type {SettingsApi}
     */
    #settings_api;

    /**
     * @param {string[]} accent_colors
     * @param {CssApi} css_api
     * @param {getAccentColorChangeListeners} get_accent_color_change_listeners
     * @param {LocalizationApi} localization_api
     * @param {SettingsApi} settings_api
     * @param {boolean} custom_accent_color
     * @returns {AccentColorService}
     */
    static new(accent_colors, css_api, get_accent_color_change_listeners, localization_api, settings_api, custom_accent_color = true) {
        return new this(
            accent_colors,
            css_api,
            get_accent_color_change_listeners,
            localization_api,
            settings_api,
            custom_accent_color
        );
    }

    /**
     * @param {string[]} accent_colors
     * @param {CssApi} css_api
     * @param {getAccentColorChangeListeners} get_accent_color_change_listeners
     * @param {LocalizationApi} localization_api
     * @param {SettingsApi} settings_api
     * @param {boolean} custom_accent_color
     * @private
     */
    constructor(accent_colors, css_api, get_accent_color_change_listeners, localization_api, settings_api, custom_accent_color) {
        this.#accent_colors = accent_colors;
        this.#css_api = css_api;
        this.#get_accent_color_change_listeners = get_accent_color_change_listeners;
        this.#localization_api = localization_api;
        this.#settings_api = settings_api;
        this.#custom_accent_color = custom_accent_color;
    }

    /**
     * @returns {string}
     */
    getAccentColor() {
        return GetAccentColorCommand.new(
            this.#accent_colors,
            this.#settings_api,
            this.#custom_accent_color
        )
            .getAccentColor();
    }

    /**
     * @returns {SelectAccentColorElement}
     */
    getSelectAccentColorElement() {
        return GetSelectAccentColorElementCommand.new(
            this,
            this.#accent_colors,
            this.#css_api,
            this.#localization_api,
            this.#custom_accent_color
        )
            .getSelectAccentColorElement();
    }

    /**
     * @returns {void}
     */
    renderAccentColor() {
        RenderAccentColorCommand.new(
            this,
            this.#get_accent_color_change_listeners
        )
            .renderAccentColor();
    }

    /**
     * @param {string} accent_color
     * @returns {void}
     */
    setAccentColor(accent_color) {
        SetAccentColorCommand.new(
            this,
            this.#settings_api
        )
            .setAccentColor(
                accent_color
            );
    }
}
