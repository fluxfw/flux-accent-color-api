import { SelectAccentColorElement } from "../../../Adapter/AccentColor/SelectAccentColorElement.mjs";

/** @typedef {import("../Port/AccentColorService.mjs").AccentColorService} AccentColorService */
/** @typedef {import("../../../../../flux-css-api/src/Adapter/Api/CssApi.mjs").CssApi} CssApi */
/** @typedef {import("../../../../../flux-localization-api/src/Adapter/Api/LocalizationApi.mjs").LocalizationApi} LocalizationApi */

export class GetSelectAccentColorElementCommand {
    /**
     * @type {AccentColorService}
     */
    #accent_color_service;
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
     * @param {AccentColorService} accent_color_service
     * @param {string[]} accent_colors
     * @param {CssApi} css_api
     * @param {LocalizationApi} localization_api
     * @param {boolean} custom_accent_color
     * @returns {GetSelectAccentColorElementCommand}
     */
    static new(accent_color_service, accent_colors, css_api, localization_api, custom_accent_color = true) {
        return new this(
            accent_color_service,
            accent_colors,
            css_api,
            localization_api,
            custom_accent_color
        );
    }

    /**
     * @param {AccentColorService} accent_color_service
     * @param {string[]} accent_colors
     * @param {CssApi} css_api
     * @param {LocalizationApi} localization_api
     * @param {boolean} custom_accent_color
     * @private
     */
    constructor(accent_color_service, accent_colors, css_api, localization_api, custom_accent_color) {
        this.#accent_color_service = accent_color_service;
        this.#accent_colors = accent_colors;
        this.#css_api = css_api;
        this.#localization_api = localization_api;
        this.#custom_accent_color = custom_accent_color;
    }

    /**
     * @returns {SelectAccentColorElement}
     */
    getSelectAccentColorElement() {
        return SelectAccentColorElement.new(
            this.#accent_color_service.getAccentColor(),
            this.#accent_color_service.getAccentColorValue(),
            this.#accent_colors,
            this.#css_api,
            this.#localization_api,
            accent_color => {
                this.#accent_color_service.setAccentColor(
                    accent_color
                );
            },
            this.#custom_accent_color
        );
    }
}
