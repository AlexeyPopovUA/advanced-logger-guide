module.exports = {
    "presets": ["@babel/react", "@babel/preset-typescript", ["@babel/preset-env", {
        //"debug": true,
        "targets": {
            "browsers": [
                "defaults"
            ]
        }
    }]],
    "plugins": [
        "@babel/plugin-syntax-dynamic-import",
        "@babel/plugin-transform-runtime",
        "@babel/plugin-proposal-class-properties"
    ]
};
