const pathLib = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtactPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader').VueLoaderPlugin;

// console.log(process);
// console.log(process.env);
// console.log(process.env.mode);
console.log(process.argv);

function resolve(path) {
    console.log(pathLib.resolve(__dirname, path));
    return pathLib.resolve(__dirname, path)
}

console.log('------------------------', process.env.library);
const isUmd = process.env.library === 'umd';
const esConfig = {
    entry: {
        'index.module': {
            import: resolve('./src/index.ts'),
            library: {
                type: 'commonjs',
            }
        },
        'vue/index.module': {
            import: resolve('./src/vue/index.ts'),
            library: {
                type: 'commonjs',
            }
        },
    }
}

const umdConfig = {
    entry: {
        'index': {
            import: resolve('./src/index.ts'),
            library: {
                // name: 'custom-editor',
                type: 'umd',
            }
        },
        'vue/index': {
            import: resolve('./src/vue/index.ts'),
            library: {
                // name: 'custom-editor',
                type: 'umd',
            }
        },
    }
}


function configFactory(config) {
    return  {
        // mode: 'development',
        entry: {
            // 'index.umd': {
            //     import: resolve('./src/index.ts'),
            //     library: {
            //         name: 'custom-editor',
            //         type: 'umd',
            //     }
            // },
            // 'index.module': {
            //     import: resolve('./src/index.ts'),
            //     library: {
            //         type: 'commonjs',
            //     }
            // }
            ...(isUmd ? umdConfig.entry : esConfig.entry)
        },
        experiments: {
            outputModule: isUmd ? false : true,
        },
        output: {
            path: pathLib.resolve(__dirname, "dist"), //出口位置
            // library: 'custom-editor',
            // libraryTarget: 'umd',
            filename: '[name].js',
            chunkFilename: 'js/[name].js',
            // clean: true,
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
            new VueLoaderPlugin()
        ]
    }
}
module.exports = configFactory();
