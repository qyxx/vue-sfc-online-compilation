import './index.css';
import { parse, compileTemplate, compileStyle, compileScript} from './component-compiler-utils';
import * as hash from 'hash-sum';
import * as compiler from 'vue-template-compiler';

compile.addEventListener('click', function () {
    let code = compilation({
        source: source.value,
        filename: 'App.vue',
        sourceRoot: 'src',
    });
    compiled.value = `render () { ${code.render} }`;
})


function compilation({ source, filename, sourceRoot, sourceMap = false }) {
    const id = hash(filename);

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
            scopeId: "data-v-106c86ed",
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
            scoped: true,
            trim: true
        })
    })

    compileScript(descriptor.script.content, (result)=>{
debugger
    })

    return descriptor;
}
