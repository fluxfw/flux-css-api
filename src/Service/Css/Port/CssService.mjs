import { ImportCssToRootCommand } from "../Command/ImportCssToRootCommand.mjs";

/** @typedef {import("../../../Adapter/Cache/CssCache.mjs").CssCache} CssCache */
/** @typedef {import("../../../Adapter/ImportCss/ImportCss.mjs").ImportCss} ImportCss */

export class CssService {
    /**
     * @type {CssCache}
     */
    #css_cache;
    /**
     * @type {ImportCss}
     */
    #import_css;

    /**
     * @param {CssCache} css_cache
     * @param {ImportCss} import_css
     * @returns {CssService}
     */
    static new(css_cache, import_css) {
        return new this(
            css_cache,
            import_css
        );
    }

    /**
     * @param {CssCache} css_cache
     * @param {ImportCss} import_css
     * @private
     */
    constructor(css_cache, import_css) {
        this.#css_cache = css_cache;
        this.#import_css = import_css;
    }

    /**
     * @param {string} url
     * @returns {Promise<CSSStyleSheet | HTMLStyleElement>}
     */
    async importCss(url) {
        return (await import("../Command/ImportCssCommand.mjs")).ImportCssCommand.new(
            this.#import_css
        )
            .importCss(
                url
            );
    }

    /**
     * @param {ShadowRoot | Document} root
     * @param {string} url
     * @returns {void}
     */
    importCssToRoot(root, url) {
        ImportCssToRootCommand.new(
            this.#css_cache,
            this
        )
            .importCssToRoot(
                root,
                url
            );
    }
}
