# custom-editor

## 浏览器支持

不支持 IE;
Edge >= 79;


## 能力

依赖 highligh.js 支持多种语言和主题；支持可编辑。

## 自主定制元素

custom-editor 属于 自主定制元素(Autonomous custom elements) ; 支持跨库组件应用;

## 支持跨模块应用 

支持 AMD CommonJS Browser

## 快速应用

下载 custom-editor
```npm i custom-editor -S```

### 非 vue 应用

```html
 <raw-custom-editor 
     id="custom-editor" 
     value="select * from 'table'" 
     resize="true" 
  >
 </raw-custom-editor>
```

```javascript
/** js */
import style from '!!css-loader?exportType=string!highlight.js/styles/sunburst.css';   // 利用 webpack 获取style字符串
import initCustomEditor from 'custom-editor/vue'; 
import javascript from 'highlight.js/lib/languages/javascript';

// 可定义元素名称
initCustomEditor({name: 'raw-custom-editor'});
let customEditor = document.getElementById("custom-editor");
customEditor.appendStyle(style);
customEditor.setLanguage('javascript', javascript);

```

### vue 中应用

```javascript
import {vue2Plugin} from 'custom-editor/vue';
Vue.use(vue2Plugin, {name: 'vue-custom-editor'});
```

## 属性及方法

### 属性

value：展示内容，或编辑初始化内容

readonly：设置只读 or 编辑

resize：设置拖可调整大小的类型 'auto', 'none', 'horizontal', 'vertical', （默认为 'none' 不支持拖拽）; 若设置resize 属性，但属性设置为空或其他值，会自动默认设置 'auto'

width： 设置容器宽度（默认值为100%）

height：设置容器高度（默认值为100%）

其中 resize，height， width 的设置其实只是快捷操作, 可以对给该自定义组件设置样式 如：

```html
 <!- 行内样式-->
 <raw-custom-editor 
    style="width:50%; height: 50%; resize: horizontal"
  >
 </raw-custom-editor>
```

或内部样式

```html
 <style>
    raw-custom-editor {
        width:50%; 
        height: 50%; 
        resize: horizontal;
    }
 </style>
```

## 事件监听

采用原生自定义事件触发，目前支持 sInput 自定义事件，在文本域 oninput 时触发，用来监听数据变更

```javascript
let customEditor = document.getElementById('custom-editor');
customEditor.addEventListener('cInput', function(e: CustomEvent) {
   console.log('cInput', e);
   console.log('cInput', e.target.value); // 实时获取数据
   console.log('cInput', e.detail.value); // 实时获取数据
});  
```

### 方法

appendStyle(styleCode)： 参数为 style 样式字符串，用于添加样式，可用来添加主题，使用方式如下：

``` javascript
import style from '!!css-loader?exportType=string!highlight.js/styles/sunburst.css';
customEditor.appendStyle(style);
```

appendLink(href)：参数为 link 的 href， 用于添加样式，可用来添加主题；

removeCss()：删除通过 appendStyle 和 appendLink 的样式；

setLanguage(language, languageFn)： 设置 language，使用方式如下：

```javascript
import javascript from 'highlight.js/lib/languages/javascript';
customEditor.setLanguage('javascript', javascript);
```

## 未来规划

增加 web worker 匹配无阻塞；更丰富的样式注入，如支持 styleSheets;
