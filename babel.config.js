module.exports = {
    "presets": ["@babel/react", "@babel/preset-typescript", ["@babel/preset-env", {
        //"debug": true,
        "useBuiltIns": "usage",
        "targets": {
            "browsers": [
                ",> 1%",
                "IE >= 11"
            ]
        }
    }]],
    "plugins": [
        "@babel/plugin-syntax-dynamic-import",
        "@babel/plugin-transform-runtime",
        "@babel/plugin-proposal-class-properties"
    ]
};
