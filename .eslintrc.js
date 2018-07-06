module.exports = {
    "extends": "airbnb-base",
    "rules": {
        // enable additional rules
        "no-underscore-dangle": ["error", { "allow": ["__valliMeta__"] }],
        "no-param-reassign": ["error", { "props": false }]
    }
};