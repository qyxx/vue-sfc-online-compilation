const babel = require("@babel/core");
const PresetEnv = require('@babel/preset-env');
const PluginExpDef = require('@babel/plugin-proposal-export-default-from');

function compile(code, cb) {
    babel.transform(code, {
        presets: [PresetEnv],
        plugins: [PluginExpDef]
    }, function (err, result) {
        cb(result);
    });
}
exports.compile = compile;