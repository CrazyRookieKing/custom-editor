const pathLib = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtactPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader').VueLoaderPlugin;

// console.log(process);
// console.log(process.env);
// console.log(process.env.mode);
// console.log(process.argv);

function resolve(path) {
    console.log(pathLib.resolve(__dirname, path));
    return pathLib.resolve(__dirname, path)
}

const vueConfig = {
    index: resolve('./src/main.ts'),
    htmlTemplate: resolve('./vueIndex.html'),
    port: 3000,
}

const umdConfig = {
    index: resolve('./node_modules/packages/custom-editor/src/index.ts'),
    htmlTemplate: resolve('./index.html'),
    port: 3010,
}


function configFactory(config) {
    const {index, htmlTemplate, port} = config;
    return  {
        // mode: 'development',
        entry: {
            index,
        },

        output: {
            path: pathLib.resolve(__dirname, "dist"), //出口位置
            library: 'custom-editor',
            libraryTarget: 'umd',
            filename: (pathData) => {
                console.log('fileData', pathData.chunk.name);
                if (pathData.chunk.name === 'index') {
                    return '[name].js';
                } else if (pathData.chunk.name === 'vueIndex') {
                    return 'vue/index.js';
                }
            },
            chunkFilename: (pathData) => {
                return 'js/[name].js'
            },
            // chunkFilename: 'js/[name].js',
            clean: true,
        },

        resolve: {
            extensions: [
                '.tsx',
                '.ts',
                '.mjs',
                '.js',
                '.jsx',
                '.vue',
                '.json',
                '.wasm'            
            ],
        },
        resolveLoader: {
            modules: [resolve('node_modules'), resolve('src/'), resolve('packages/')]
        },
        module: {
            rules: [
                {
                    oneOf: [
                        {
                            resourceQuery: /raw/,
                            type: 'asset/source',
                        },
                        {
                            test: /\.css$/,
                            resourceQuery: { not: [/raw/] },
                            use: ['vue-style-loader', 'css-loader'],
                        },

                        {
                            test: /\.(png|jpe?g|)(\?.*)?$/,
                            use: {
                                loader: 'url-loader',
                                options: {
                                    limit: 8000,
                                    name: pathLib.resolve(__dirname, './dist/img/[name].[hash:7].[ext]') // dev: ./static   build: ./
                                }
                            }
                        },
                        {
                            test: /\.tsx?$/,
                            use: {
                                loader: 'babel-loader',
                                options: {
                                    presets: [
                                        '@babel/preset-env',
                                        [
                                        '@babel/preset-typescript',   // 引用Typescript插件
                                        {
                                            allExtensions: true,        // ?支持所有文件扩展名
                                        },
                                        ],
                                    ],                                
                                },
                            }                        
                        },
                    ]
                }, {
                    test: /\.vue$/,
                    use: [
                        'vue-loader'
                    ],
                },
            ],
        },
        plugins: [
            // new HtmlWebpackPlugin({
            //     filename: pathLib.resolve(__dirname, './dist/index.html'),
            //     chunks: ['index'],
            //     template: 'index.html',
            //     inject: true,
            //     minify: {
            //         removeComments: true,
            //         collapseWhitespace: false,
            //         removeAttributeQuotes: true

            //     },
            // }),
            new VueLoaderPlugin(),
            new HtmlWebpackPlugin({
                filename: pathLib.resolve(__dirname, './dist/index.html'),
                chunks: ['index'],
                template: htmlTemplate,
                inject: true,
                minify: {
                    removeComments: true,
                    collapseWhitespace: false,
                },
            }),
        ],
        devServer: {
            hot: true, // 启用热更新
            port: port,
            open: true,
        },
    }
}
module.exports = configFactory(vueConfig);
// module.exports = configFactory(esConfig);