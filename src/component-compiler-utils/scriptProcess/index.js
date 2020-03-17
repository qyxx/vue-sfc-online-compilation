const babel = require("@babel/core");
const PresetEnv = require('@babel/preset-env');
const PluginExpDef = require('@babel/plugin-proposal-export-default-from');
const parser = require('@babel/parser');
const t = require('@babel/types');
const traverse = require('@babel/traverse').default;


const parse = (code) => {
    const ast = parser.parse(code, {
        allowImportExportEverywhere: true
    });
    return ast;
}

/**
 * 合并 template、 script
 */
function merge(_scopeId, script, template) {
    const scriptAST = parse(template.code+'\n'+script);
    const properties = scriptAST.program.body[2].declaration.properties;
    const render = t.objectProperty(t.identifier("render"), t.identifier("render"));
    const staticRenderFns = t.objectProperty(t.identifier('staticRenderFns'), t.identifier("staticRenderFns"));
    const _compiled = t.objectProperty(t.stringLiteral('_compiled'), t.booleanLiteral(true));
    properties.push(render, staticRenderFns, _compiled);
    if(_scopeId){
        const scopeId = t.objectProperty(t.stringLiteral('_scopeId'), t.stringLiteral(`data-v-${_scopeId}`));
        properties.push(scopeId);
    }
    return scriptAST;
}



function compile(scopeId, script, template, cb) {

    let scriptAST = merge(scopeId, script, template);
    babel.transformFromAst(scriptAST, undefined, undefined, function (err, result) {
        if(err){
            cb(result, err)
        }
        babel.transform(result.code, {
            presets: [PresetEnv],
            plugins: [PluginExpDef]
        }, function (err, result) {
            cb(result, err);
        });
    });
}
exports.compile = compile;