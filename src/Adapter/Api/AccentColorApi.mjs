import { ACCENT_COLOR_LOCALIZATION_MODULE } from "../Localization/_LOCALIZATION_MODULE.mjs";
import { AccentColorService } from "../../Service/AccentColor/Port/AccentColorService.mjs";

/** @typedef {import("../AccentColor/accentColorChangeListener.mjs").accentColorChangeListener} accentColorChangeListener */
/** @typedef {import("../../../../flux-css-api/src/Adapter/Api/CssApi.mjs").CssApi} CssApi */
/** @typedef {import("../../../../flux-localization-api/src/Adapter/Api/LocalizationApi.mjs").LocalizationApi} LocalizationApi */
/** @typedef {import("../AccentColor/SelectAccentColorElement.mjs").SelectAccentColorElement} SelectAccentColorElement */
/** @typedef {import("../../../../flux-settings-api/src/Adapter/Api/SettingsApi.mjs").SettingsApi} SettingsApi */

const __dirname = import.meta.url.substring(0, import.meta.url.lastIndexOf("/"));

export class AccentColorApi {
    /**
     * @type {accentColorChangeListener[]}
     */
    #accent_color_change_listeners;
    /**
     * @type {AccentColorService | null}
     */
    #accent_color_service = null;
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
     * @param {LocalizationApi} localization_api
     * @param {SettingsApi} settings_api
     * @param {boolean} custom_accent_color
     * @returns {AccentColorApi}
     */
    static new(accent_colors, css_api, localization_api, settings_api, custom_accent_color = true) {
        return new this(
            accent_colors,
            css_api,
            localization_api,
            settings_api,
            custom_accent_color
        );
    }

    /**
     * @param {string[]} accent_colors
     * @param {CssApi} css_api
     * @param {LocalizationApi} localization_api
     * @param {SettingsApi} settings_api
     * @param {boolean} custom_accent_color
     * @private
     */
    constructor(accent_colors, css_api, localization_api, settings_api, custom_accent_color) {
        this.#accent_colors = accent_colors;
        this.#css_api = css_api;
        this.#localization_api = localization_api;
        this.#settings_api = settings_api;
        this.#custom_accent_color = custom_accent_color;
        this.#accent_color_change_listeners = [];
    }

    /**
     * @returns {Promise<void>}
     */
    async init() {
        this.#accent_color_service ??= this.#getAccentColorService();

        this.#localization_api.addModule(
            `${__dirname}/../Localization`,
            ACCENT_COLOR_LOCALIZATION_MODULE
        );

        this.#css_api.importCssToRoot(
            document,
            `${__dirname}/../AccentColor/AccentColorVariables.css`
        );
        this.#css_api.importCssToRoot(
            document,
            `${__dirname}/../AccentColor/SelectAccentColorVariables.css`
        );

        this.renderAccentColor();
    }

    /**
     * @param {accentColorChangeListener} accent_color_change_listener
     * @returns {void}
     */
    addAccentColorChangeListener(accent_color_change_listener) {
        this.#accent_color_change_listeners.push(accent_color_change_listener);

        accent_color_change_listener(
            this.getAccentColorValue()
        );
    }

    /**
     * @returns {string}
     */
    getAccentColor() {
        return this.#accent_color_service.getAccentColor();
    }

    /**
     * @returns {string}
     */
    getAccentColorValue() {
        return this.#accent_color_service.getAccentColorValue();
    }

    /**
     * @returns {SelectAccentColorElement}
     */
    getSelectAccentColorElement() {
        return this.#accent_color_service.getSelectAccentColorElement();
    }

    /**
     * @returns {void}
     */
    renderAccentColor() {
        this.#accent_color_service.renderAccentColor();
    }

    /**
     * @returns {AccentColorService}
     */
    #getAccentColorService() {
        return AccentColorService.new(
            this.#accent_colors,
            this.#css_api,
            () => this.#accent_color_change_listeners,
            this.#localization_api,
            this.#settings_api,
            this.#custom_accent_color
        );
    }
}
