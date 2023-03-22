/* bca-disable */
import hljs from 'highlight.js/lib/core';
import defaultStyle from 'highlight.js/styles/default.css?raw';
import baseStyle from './base.css?raw';
import type {HLJSApi, Language} from 'highlight.js'

const SupportResizeType = ['auto', 'none', 'horizontal', 'vertical'];

export default function initCustomEditor(options = {name: 'custom-editor'}) {
    let {name} = options;
    if (!name) {
        name = 'custom-editor';
    }

    // <div id="fake-container">
    // </div>
    const template = document.createElement('template');
    template.setAttribute('id', 'userCardTemplate');
    template.innerHTML = `
            <style>
            ${defaultStyle}
            </style>
            <style>
            ${baseStyle}
            </style>
            <span id="editor-style-container">
            </span>
            <div id="editor-container" class="hljs">
                <code id="fake-container"></code>
                <textarea id="textarea">
                </textarea>
            </div>`

    type attrs = 'value' | 'readonly' | 'height' | 'width' | 'resize';
    const attrNames: Array<attrs> = ['value', 'readonly', 'height', 'width', 'resize'];


    /** nextTick 功能, 为了解决同时更改 value，langauage 或同步频繁更改 value 而导致高亮重复匹配 */
    const callbacks = new Set<Function>();
    let pending = false;

    function $nextTick(fn: Function) {
        callbacks.add(fn);
        if (!pending) {
            pending = true;
            $timerFunc();
        }
    }

    function $timerFunc() {
        Promise.resolve().then($flushCallbacks);
    }

    function $flushCallbacks() {
        pending = false;
        callbacks.forEach(callback => {
            callback();
        });
    }
    /** \nextTick 功能 */

    type TMode = 'open' | 'closed';
    // 定义一个自定义元素类 实例化为标签
    class CustomEditor extends HTMLElement implements Record<any, any>  {
        _host: HTMLElement;
        _content: ParentNode;
        _container: HTMLElement;
        _textarea: HTMLTextAreaElement;
        _fake: HTMLElement;
        _themeStyleContainer: HTMLElement;
        _initialized!: Boolean;
        // 初始化
        constructor(mode = 'open') {
            super();

            this._host = this;

            this._content = template.content.cloneNode(true) as ParentNode;

            this._container = this._content.querySelector('#editor-container') as HTMLElement;

            this._textarea = this._content.querySelector('textarea') as HTMLTextAreaElement;;

            this._fake = this._content.querySelector('#fake-container') as HTMLElement;;

            this._themeStyleContainer = this._content.querySelector('#editor-style-container') as HTMLElement;;

            this._mode = mode as TMode;

            this._hightlight = this._hightlight.bind(this);

            this._inputHandler = this._inputHandler.bind(this);

            this._scrollHandler = this._scrollHandler.bind(this);
        }

        _mode: TMode = 'open';

        // 监听属性
        static get observedAttributes() {
            return attrNames;
        }

        // 首次插入 DOM
        connectedCallback() {
            if (!this._initialized) {
                this._initialized = true;
                const shadow = this.attachShadow({
                    mode: this._mode
                });
                this.style.display = 'inline-block';
                shadow.appendChild(this._content);
                this.resize = this.resize;
            }
            this._textarea.addEventListener('input', this._inputHandler);
            this._textarea.addEventListener('scroll', this._scrollHandler);
        }

        _inputHandler (e: Event): void {
            const value = (e.target as HTMLTextAreaElement).value;
            this.setAttribute('value', value);
            let event = new CustomEvent<{value: string}>('cInput', {detail: {value: value}});
            this.dispatchEvent(event);
            this._resetScrollTop();
        }

        _scrollHandler () {
            this._resetScrollTop();
        }

        // 卸载阶段
        disconnectedCallback() {
            this._textarea.removeEventListener('input', this._inputHandler);
            this._textarea.removeEventListener('scroll', this._scrollHandler);        
        }

        // 属性变更
        attributeChangedCallback(attrName: attrs, oldVal: string, newVal: string) {
            if (attrName === 'readonly') {
                // @ts-ignore
                this.readonly = newVal === null ? false : true;
            }
            else if (attrNames.includes(attrName)) {
                this[attrName] = newVal;
            } 
            else {
                console.warn(attrName, '属性配置暂不支持');
            }
        }

        _language: string | null  = null;

        get language() {
            return this._language;
        }

        set language(language) {
            this._language = language;
            try {
                $nextTick(this._hightlight);
            } catch (err) {
                throw err;
            }
            this.setAttribute('language', language as string);
        }

        // 注册 language 或 直接设置 language
        setLanguage(language: string, languageFn: (hljs: HLJSApi) => Language) {
            if (hljs.listLanguages().includes(language)) {
                this.language = language;
                return;
            }
            try {
                hljs.registerLanguage(language, languageFn);
            } catch (err) {
                throw err;
            }
            this.language = language;
        }

        _readonly: boolean = false;

        get readonly() {
            return this._readonly;
        }

        set readonly(readonly: boolean) {
            if (!!readonly) {
                this._readonly = true;
                this._textarea.setAttribute('readonly', 'readonly');
            } else {
                this._readonly = false;
                this._textarea.removeAttribute('readonly');
            }
        }

        _value: string = '';

        get value() {
            return this._value || '';
        }

        set value(value) {
            this._value = value;
            this._textarea.value = value;
            $nextTick(this._hightlight);
        }

        appendStyle(code: string) {
            const style = document.createElement('style');
            const cssText = document.createTextNode(code);  
            style.appendChild(cssText);  
            this._themeStyleContainer.appendChild(style);
        }

        appendLink(href: string) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = href;
            this._themeStyleContainer.appendChild(link);
        }

        removeCss() {
            this._themeStyleContainer.innerHTML = '';
        }

        _height = '100%';

        get height() {
            return this._host.style.height || window.getComputedStyle(this._host, null).height;
        }

        set height(height) {
            this._height = height;
            this._host.style.height = height;
        }

        _width = '100%';

        get width() {
            return this._host.style.width || window.getComputedStyle(this._host, null).width;
        }

        set width(width) {
            this._width = width;
            this._host.style.width = width;
        }

        _resize = 'none';

        get resize() {
            return this._resize;
        }

        set resize(resize) {
            if (SupportResizeType.includes(resize)) {
                this._resize = resize;
                this._host.style.resize = resize;
            } else if (this.hasAttribute('resize')) {
                this._resize = "auto";
                this._host.style.resize = "auto";
            } else {
                this._resize = 'none';
                this._host.style.resize = 'none';
            }
        }

        // 设置高亮
        _hightlight() {
            if (!this.language) {
                this._fake.innerHTML = hljs.highlightAuto(this.value).value;
                return;
            }

            let fakeHtml = hljs.highlight(this.value, {language: this.language}).value;
            let space = this.value.match(/\s+$/)?.[0] || '';
            this._fake.innerHTML = fakeHtml + space;
        }

        _resetScrollTop() {
            this._fake.scrollTop = this._textarea.scrollTop;
            this._textarea.scrollTop = this._fake.scrollTop;
        }

       
    }
    // 自定义元素 customEvent自定义事件
    // 用define方法,告诉浏览器 元素与这个类关联。即登记自定义元素与这个类之间的映射
    if (!window.customElements.get(name)) {
        window.customElements.define(name, CustomEditor);
    }
}
