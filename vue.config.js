module.exports = {
    pages: {
        index: {
            entry: "src/index.js",
            template: "public/index.html",
            filename: "index.html"
        },
        development: {
            entry: "dev/main.js",
            template: "dev/index.html",
            filename: "development.html"
        }
    },
    filenameHashing: false,
    css: {
        loaderOptions: {
            postcss: {
                plugins: [require("postcss-preset-env")()]
            }
        }
    },
    chainWebpack: config => {
        config.optimization.delete("splitChunks");
        config.optimization.removeAvailableModules(false);
        config.optimization.concatenateModules(false);
        config.optimization.providedExports(false);
        config.optimization.usedExports(false);
        // config.optimization.sideEffects(false)
        // config.optimization.minimize(false)
        // config.optimization.flagIncludedChunks(false)

        config.resolve.alias.set("@inkline/inkline", __dirname).end();

        // config
        //     .plugin("webpack-bundle-analyzer")
        //     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
        //     .init(Plugin => new Plugin({
        //         analyzerMode: 'static'
        //     }));
    },
    lintOnSave: false,
    pluginOptions: {
        lintStyleOnBuild: true,
        stylelint: {
            fix: false,
            files: ['src/**/*.{css,scss}'],
            syntax: 'scss'
        }
    }
};
