import './index.css';
import { parse, compileTemplate, compileStyle, compileScript } from './component-compiler-utils';
import * as hash from 'hash-sum';
import * as compiler from 'vue-template-compiler';

function compilation({ source, filename, sourceRoot, sourceMap = false }) {
    const id = hash(filename);
    let scopeId = undefined;

    const descriptor = parse({
        source,
        compiler,
        filename,
        sourceRoot,
        needMap: sourceMap
    })

    const templateCompiled = compileTemplate({
        source: descriptor.template.content,
        filename,
        compiler,
        compilerOptions: {
            outputSourceRange: true,
            preserveWhitespace: true,
            scopeId: `data-v-${id}`,
        },

        // allow customizing behavior of vue-template-es2015-compiler
        isFunctional: undefined,
        isProduction: true,
        optimizeSSR: false,
        prettify: undefined,
        transformAssetUrls: true,
        transpileOptions: undefined
    });


    let styles = [];
    descriptor.styles.forEach(item => {
        let { content, lang } = item
        const styleDescriptor = compileStyle({
            source: content,
            filename,
            preprocessLang: lang,
            id: `data-v-${id}`,
            map: null,
            scoped: item.scoped,
            trim: true
        })
        if(item.scoped){
            scopeId = id;
        }
        styles.push(styleDescriptor.code);
    })

    return new Promise((resolve) => {
        compileScript(scopeId, descriptor.script.content, templateCompiled, (script, err) => {
            if(err){
                return resolve(script, err);
            }
            let file = `
            <script>
                ${script.code}
            </script>
            `;
            styles.forEach(style => {
                file += `
                <style>
                    ${style}
                </style>
                `;
            })
            resolve(file);
        })
    })
}

export default compilation;