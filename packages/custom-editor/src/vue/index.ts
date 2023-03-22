import initCustomEditor from '../Editor';
const DefaultName = 'custom-editor';
export const vue3Plugin = {
    install: (app, options) => {
        const isCustomElementFn = app.config.globalProperties.isCustomElement;
        const {name = DefaultName} = options;
        app.config.globalProperties.isCustomElement = tag => {
            return tag == name 
                || typeof isCustomElementFn === 'function' && isCustomElementFn(tag);
        }
        initCustomEditor(options);
    }
};

export const vue2Plugin = {
    install: (Vue, options) => {
        const {name = DefaultName} = options;
        Vue.config.ignoredElements.push(name);
        initCustomEditor(options);
    }
};

const VuePlugin = {
    install: (app, options = {name: DefaultName}) => {
        const version = Number(app.version.split('.')[0])
        if (version === 3) {
            console.log('当前环境为 vue 3');
            vue3Plugin.install(app, options);
        } else if (version === 2) {
            console.log('当前环境为 vue 2');
            vue2Plugin.install(app, options);
        } else {
            console.warn('请正确使用插件，custom-editor 支持 vue2, vue3');
        }
    }  
};

export default VuePlugin;
