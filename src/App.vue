<template>
    <div>
        <vue-custom-editor 
            ref="customEditor" 
            id="custom-editor" 
            :value="value" 
            :readonly="readonly"
            height="200px"
            width="40%"
        ></vue-custom-editor>
        <select id="languageSelect" v-model="languageValue" @change="changeLanguage(languageValue)">
            <option value ="sql">sql</option>
            <option value ="xml">xml</option>
            <option value="javascript">javascript</option>
            <!-- <option value="go">go</option> -->
        </select>


        <select id="themeSelect" v-model="themeValue" @change="changeTheme(themeValue)">
            <option value="a11y-dark">a11y-dark</option>
            <option value="sunburst">sunburst</option>
            <!-- <option value="night-owl">night-owl</option> -->
            <option value="a11y-light">a11y-light</option>
        </select>
        <select id="editSelect" v-model="editState" @change="changeEditState(editState)">
            <option :value="true">true</option>
            <option :value="false">false</option>
        </select>

        <button id="readonlyBtn" @click="formatter">
        格式化
        </button>
    </div>  
</template>

<script setup lang="ts">
import sunburstStyle from 'highlight.js/styles/sunburst.css?raw';
import darkStyle from 'highlight.js/styles/a11y-dark.css?raw';
import nightStyle from 'highlight.js/styles/night-owl.css?raw';
import lighttStyle from 'highlight.js/styles/a11y-light.css?raw';
import xml from 'highlight.js/lib/languages/xml';
import sql from 'highlight.js/lib/languages/sql';
import javascript from 'highlight.js/lib/languages/javascript';
import { format } from 'sql-formatter';
import go from 'highlight.js/lib/languages/go';
import { onBeforeUnmount, onMounted, ref } from 'vue';

const customEditor = ref<any>(null);
// const languageValue = ref<string>('sql');
// const themeValue = ref<string>('a11y-dark');
const value = ref<string>('let a = "a"; <div></div>; select * from table');
const readonly = ref<any>(false);
const changeLanguage = function changeLanguage(val) {
    if (val === 'javascript') {
        customEditor.value.setLanguage('javascript', javascript);
    } else if (val === 'sql') {
        customEditor.value.setLanguage('sql', sql);

    } else if (val === 'xml') {
        customEditor.value.setLanguage('xml', xml);

    }
}
const changeTheme = function changeTheme(val) {
    if (val === 'a11y-light') {
        customEditor.value.appendStyle(lighttStyle);
    } else if (val === 'a11y-dark') {
        customEditor.value.appendStyle(darkStyle);

    } else if (val === 'sunburst') {
        customEditor.value.appendStyle(sunburstStyle);
    }
}

const changeEditState = function changeEditState(val) {
    readonly.value = val;
}

function formatter() {
    value.value = format(value.value); 
}

onMounted(() => {
    customEditor.value.addEventListener('cInput', function(e) {
        console.log('cInput', e);
        console.log('cInput', e.target.value);
        console.log('cInput', e.detail.value);
    });  
})

onBeforeUnmount(() => {
    customEditor.value.removeEventListener('cInput');  
});

function setInput() {
    alert('a');
}

// requestAnimationFrame(() => {
//     customEditor.value.appendStyle(style);
//     customEditor.value.setLanguage('javascript', javascript);
// })
</script>
