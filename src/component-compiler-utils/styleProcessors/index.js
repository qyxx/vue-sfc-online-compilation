"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const merge = require('merge-source-map');

// .less
const less = {
    render(source, map, options) {
        const nodeLess = require('less');
        let result;
        let error = null;
        nodeLess.render(source, Object.assign({}, options, { syncImport: true }), (err, output) => {
            error = err;
            result = output;
        });
        if (error)
            return { code: '', errors: [error] };
        if (map) {
            return {
                code: result.css.toString(),
                map: merge(map, result.map),
                errors: []
            };
        }
        return { code: result.css.toString(), errors: [] };
    }
};

exports.processors = {
    less
};
