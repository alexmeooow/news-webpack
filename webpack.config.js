var path = require("path");
module.exports = {
    entry:"./src/js/pc/pc_main.js",
    output:{
        path:path.resolve(__dirname,"./dist/js"),
        filename:"bundle.js"
    },
    module:{
        loaders:[
            {
                test:/\.css$/,
                loader:"style-loader!css-loader"
            },
            {
                test:/\.js$/,
                loader:"babel-loader",
                exclude:/(node_modules)/,
                query:{
                    presets:["es2015","react"]
                }
            }
        ]
    }
}
