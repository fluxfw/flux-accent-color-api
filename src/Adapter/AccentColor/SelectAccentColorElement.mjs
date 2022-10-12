import { ACCENT_COLOR_CSS_PROPERTY } from "./ACCENT_COLOR_CSS_PROPERTY.mjs";
import { ACCENT_COLOR_LOCALIZATION_MODULE } from "../Localization/_LOCALIZATION_MODULE.mjs";

/** @typedef {import("../../../../flux-css-api/src/Adapter/Api/CssApi.mjs").CssApi} CssApi */
/** @typedef {import("../../../../flux-localization-api/src/Adapter/Api/LocalizationApi.mjs").LocalizationApi} LocalizationApi */
/** @typedef {import("./setAccentColor.mjs").setAccentColor} setAccentColor */

const __dirname = import.meta.url.substring(0, import.meta.url.lastIndexOf("/"));

export class SelectAccentColorElement extends HTMLElement {
    /**
     * @type {string}
     */
    #accent_color;
    /**
     * @type {string}
     */
    #accent_color_value;
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
     * @type {setAccentColor}
     */
    #set;
    /**
     * @type {ShadowRoot}
     */
    #shadow;

    /**
     * @param {string} accent_color
     * @param {string} accent_color_value
     * @param {string[]} accent_colors
     * @param {CssApi} css_api
     * @param {LocalizationApi} localization_api
     * @param {setAccentColor} set
     * @param {boolean} custom_accent_color
     * @returns {SelectAccentColorElement}
     */
    static new(accent_color, accent_color_value, accent_colors, css_api, localization_api, set, custom_accent_color = true) {
        return new this(
            accent_color,
            accent_color_value,
            accent_colors,
            css_api,
            localization_api,
            set,
            custom_accent_color
        );
    }

    /**
     * @param {string} accent_color
     * @param {string} accent_color_value
     * @param {string[]} accent_colors
     * @param {CssApi} css_api
     * @param {LocalizationApi} localization_api
     * @param {setAccentColor} set
     * @param {boolean} custom_accent_color
     * @private
     */
    constructor(accent_color, accent_color_value, accent_colors, css_api, localization_api, set, custom_accent_color) {
        super();

        this.#accent_color = accent_color;
        this.#accent_color_value = accent_color_value;
        this.#accent_colors = accent_colors;
        this.#css_api = css_api;
        this.#localization_api = localization_api;
        this.#set = set;
        this.#custom_accent_color = custom_accent_color;

        this.#shadow = this.attachShadow({ mode: "closed" });
        this.#css_api.importCssToRoot(
            this.#shadow,
            `${__dirname}/${this.constructor.name}.css`
        );

        this.#render();
    }

    /**
     * @returns {void}
     */
    #removeSelection() {
        for (const accent_color_element of this.#shadow.querySelectorAll(".accent_color[data-selected]")) {
            delete accent_color_element.dataset.selected;
        }
    }

    /**
     * @returns {void}
     */
    #render() {
        const title = document.createElement("div");
        title.classList.add("title");
        title.innerText = this.#localization_api.translate(
            "Accent color",
            ACCENT_COLOR_LOCALIZATION_MODULE
        );
        this.#shadow.appendChild(title);

        const accent_colors_element = document.createElement("div");
        accent_colors_element.classList.add("accent_colors");

        for (const accent_color of this.#accent_colors) {
            const accent_color_element = document.createElement("div");
            accent_color_element.classList.add("accent_color");
            accent_color_element.style.setProperty(ACCENT_COLOR_CSS_PROPERTY, `var(${ACCENT_COLOR_CSS_PROPERTY}-${accent_color})`);
            accent_color_element.title = accent_color;

            if (accent_color === this.#accent_color) {
                accent_color_element.dataset.selected = true;
            }

            accent_color_element.addEventListener("click", () => {
                if (accent_color_element.dataset.selected) {
                    return;
                }

                this.#removeSelection();

                accent_color_element.dataset.selected = true;

                this.#set(
                    accent_color
                );
            });

            accent_colors_element.appendChild(accent_color_element);
        }

        if (this.#custom_accent_color) {
            const custom_accent_color_element = document.createElement("input");
            custom_accent_color_element.classList.add("accent_color");
            custom_accent_color_element.dataset.custom = true;
            custom_accent_color_element.style.setProperty(ACCENT_COLOR_CSS_PROPERTY, this.#accent_color);
            custom_accent_color_element.title = this.#accent_color_value;
            custom_accent_color_element.type = "color";
            custom_accent_color_element.value = this.#accent_color_value;

            if (!this.#accent_colors.includes(this.#accent_color)) {
                custom_accent_color_element.dataset.selected = true;
            }

            custom_accent_color_element.addEventListener("click", () => {
                this.#removeSelection();

                custom_accent_color_element.dataset.selected = true;

                this.#set(
                    custom_accent_color_element.value
                );
            });

            custom_accent_color_element.addEventListener("input", () => {
                custom_accent_color_element.style.setProperty(ACCENT_COLOR_CSS_PROPERTY, custom_accent_color_element.value);
                custom_accent_color_element.title = custom_accent_color_element.value;

                this.#set(
                    custom_accent_color_element.value
                );
            });

            accent_colors_element.appendChild(custom_accent_color_element);
        }

        this.#shadow.appendChild(accent_colors_element);
    }
}

export const SELECT_ACCENT_COLOR_ELEMENT_TAG_NAME = "flux-select-accent-color";

customElements.define(SELECT_ACCENT_COLOR_ELEMENT_TAG_NAME, SelectAccentColorElement);
