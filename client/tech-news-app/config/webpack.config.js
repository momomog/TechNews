'use strict';

const fs = require('fs');
const isWsl = require('is-wsl');
const path = require('path');
const webpack = require('webpack');
const resolve = require('resolve');
const PnpWebpackPlugin = require('pnp-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');
const ManifestPlugin = require('webpack-manifest-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const paths = require('./paths');
const modules = require('./modules');
const getClientEnvironment = require('./env');
const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin');
const ForkTsCheckerWebpackPlugin = require('react-dev-utils/ForkTsCheckerWebpackPlugin');
const typescriptFormatter = require('react-dev-utils/typescriptFormatter');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const postcssNormalize = require('postcss-normalize');

const appPackageJson = require(paths.appPackageJson);

// использовать ли сурс карты
// production === false
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';

const shouldInlineRuntimeChunk = process.env.INLINE_RUNTIME_CHUNK !== 'false';

// Лимит на размер загружаемых изображений
const imageInlineSizeLimit = parseInt(
    process.env.IMAGE_INLINE_SIZE_LIMIT || '10000'
);

// Используется ли typescript
const useTypeScript = fs.existsSync(paths.appTsConfig);

// regex стилей
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;


/**
 * webpack config
 * @param webpackEnv - среда выполнения
 */
module.exports = function (webpackEnv) {
    const isEnvDevelopment = webpackEnv === 'development';
    const isEnvProduction = webpackEnv === 'production';

    // Отображение профилирования сборки:
    // время сбора метаданных модуля (например, разрешение имени файла)
    // время сборки модуля (например, загрузчики и разбор)
    // время для выявления и подключения зависимостей модуля
    const isEnvProductionProfile = isEnvProduction && process.argv.includes('--profile');

    // Базовый путь приложения. Используется "/" для упрощения разработки
    const publicPath = isEnvProduction
        ? paths.servedPath
        : isEnvDevelopment && '/';

    const shouldUseRelativeAssetPaths = publicPath === './';

    // publicPath без "/" в начале пути
    const publicUrl = isEnvProduction
        ? publicPath.slice(0, -1)
        : isEnvDevelopment && '';

    // Взять переменные среды по regex /^REACT_APP_/i
    const env = getClientEnvironment(publicUrl);

    /**
     * Глобальная функция для стилей, вовзращает список загрузчиков
     * @param cssOptions
     * @param preProcessor
     */
    const getStyleLoaders = (cssOptions, preProcessor) => {
        const loaders = [
            // Внедрение css в теги <style>
            isEnvDevelopment && require.resolve('style-loader'),
            // Импорт css в отдельный файл
            isEnvProduction && {
                loader: MiniCssExtractPlugin.loader,
                options: shouldUseRelativeAssetPaths ? {publicPath: '../../'} : {},
            }, {
                loader: require.resolve('css-loader'),
                options: cssOptions,
            },
            {
                loader: require.resolve('postcss-loader'),
                options: {
                    ident: 'postcss',
                    plugins: () => [
                        // баги с флекс позиционированием
                        require('postcss-flexbugs-fixes'),
                        // полифил для перевода современного css в формат старых браузеров
                        require('postcss-preset-env')({
                            // автопрефиксы для кроссбраузерности
                            autoprefixer: {
                                flexbox: 'no-2009'
                            },
                            // стадия профилирования
                            stage: 3
                        }),
                        postcssNormalize()
                    ],
                    sourceMap: isEnvProduction && shouldUseSourceMap
                }
            }].filter(Boolean);
        // Для препроцессоров (scss, sass)
        if (preProcessor) {
            loaders.push(
                {
                    // загрузка файлов по url()
                    loader: require.resolve('resolve-url-loader'),
                    options: {
                        sourceMap: isEnvProduction && shouldUseSourceMap
                    }
                }, {
                    loader: require.resolve(preProcessor),
                    options: {
                        sourceMap: true
                    }
                }
            );
        }
        return loaders;
    };

    return {
        mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
        // Остановить сборку при возникновении ошибки вместо того, чтобы выводить ее в консоль и проигнорировать
        bail: isEnvProduction,
        devtool: isEnvProduction
            ? shouldUseSourceMap
                ? 'source-map'
                : false
            : isEnvDevelopment && 'cheap-module-source-map',
        entry: [
            isEnvDevelopment &&
            require.resolve('react-dev-utils/webpackHotDevClient'),
            // Точка входа в приложение
            paths.appIndexJs,
        ].filter(Boolean),
        output: {
            // Путь к билду
            path: isEnvProduction ? paths.appBuild : undefined,
            // Добавляет комментарий /* filename */ к require()s
            pathinfo: isEnvDevelopment,
            filename: isEnvProduction
                ? 'static/js/[name].[contenthash:8].js'
                : isEnvDevelopment && 'static/js/bundle.js',
            // TODO: remove this when upgrading to webpack 5
            futureEmitAssets: true,
            chunkFilename: isEnvProduction
                ? 'static/js/[name].[contenthash:8].chunk.js'
                : isEnvDevelopment && 'static/js/[name].chunk.js',
            publicPath: publicPath,
            // Оригинальный путь к sourcemap на диске
            devtoolModuleFilenameTemplate: isEnvProduction
                ? info =>
                    path
                        .relative(paths.appSrc, info.absoluteResourcePath)
                        .replace(/\\/g, '/')
                : isEnvDevelopment &&
                (info => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')),
            // Prevents conflicts when multiple Webpack runtimes (from different apps)
            // are used on the same page.
            jsonpFunction: `webpackJsonp${appPackageJson.name}`,
            //по умолчанию это значение равно «window», но, установив его на «this», chunks будут работать и в web workers.
            globalObject: 'this',
        },
        // Используется только в production
        optimization: {
            minimize: isEnvProduction,
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        parse: {
                            // We want terser to parse ecma 8 code. However, we don't want it
                            // to apply any minification steps that turns valid ecma 5 code
                            // into invalid ecma 5 code. This is why the 'compress' and 'output'
                            // sections only apply transformations that are ecma 5 safe
                            // https://github.com/facebook/create-react-app/pull/4234
                            ecma: 8
                        },
                        compress: {
                            ecma: 5,
                            warnings: false,
                            comparisons: false,
                            inline: 2
                        },
                        mangle: {
                            safari10: true
                        },
                        // Added for profiling in devtools
                        keep_classnames: isEnvProductionProfile,
                        keep_fnames: isEnvProductionProfile,
                        output: {
                            ecma: 5,
                            comments: false,
                            ascii_only: true
                        }
                    },
                    parallel: !isWsl,
                    // Enable file caching
                    cache: true,
                    sourceMap: shouldUseSourceMap
                }),
                new OptimizeCSSAssetsPlugin({
                    cssProcessorOptions: {
                        parser: safePostCssParser,
                        map: shouldUseSourceMap
                            ? {
                                inline: false,
                                annotation: true
                            }
                            : false
                    }
                })
            ],
            splitChunks: {
                chunks: 'all',
                name: false
            },
            runtimeChunk: {
                name: entrypoint => `runtime-${entrypoint.name}`
            },
        },
        resolve: {
            // This allows you to set a fallback for where Webpack should look for modules.
            // We placed these paths second because we want `node_modules` to "win"
            // if there are any conflicts. This matches Node resolution mechanism.
            // https://github.com/facebook/create-react-app/issues/253
            modules: ['node_modules', paths.appNodeModules].concat(
                modules.additionalModulePaths || []
            ),
            // These are the reasonable defaults supported by the Node ecosystem.
            // We also include JSX as a common component filename extension to support
            // some tools, although we do not recommend using it, see:
            // https://github.com/facebook/create-react-app/issues/290
            // `web` extension prefixes have been added for better support
            // for React Native Web.
            extensions: paths.moduleFileExtensions
                .map(ext => `.${ext}`)
                .filter(ext => useTypeScript || !ext.includes('ts')),
            alias: {
                // Support React Native Web
                // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
                'react-native': 'react-native-web',
                // Allows for better profiling with ReactDevTools
                ...(isEnvProductionProfile && {
                    'react-dom$': 'react-dom/profiling',
                    'scheduler/tracing': 'scheduler/tracing-profiling',
                }),
                ...(modules.webpackAliases || {}),
            },
            plugins: [
                // Adds support for installing with Plug'n'Play, leading to faster installs and adding
                // guards against forgotten dependencies and such.
                PnpWebpackPlugin,
                // Prevents users from importing files from outside of src/ (or node_modules/).
                // This often causes confusion because we only process files within src/ with babel.
                // To fix this, we prevent you from importing files out of src/ -- if you'd like to,
                // please link the files into your node_modules/ and let module-resolution kick in.
                // Make sure your source files are compiled, as they will not be processed in any way.
                new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson]),
            ],
        },
        resolveLoader: {
            plugins: [
                // Also related to Plug'n'Play, but this time it tells Webpack to load its loaders
                // from the current package.
                PnpWebpackPlugin.moduleLoader(module),
            ],
        },
        module: {
            strictExportPresence: true,
            rules: [
                // Disable require.ensure as it's not a standard language feature.
                {
                    parser: {
                        requireEnsure: false
                    }
                },
                // First, run the linter.
                // It's important to do this before Babel processes the JS.
                {
                    test: /\.(js|mjs|jsx|ts|tsx)$/,
                    enforce: 'pre',
                    use: [{
                        loader: require.resolve('eslint-loader'),
                        // options: {
                        //     cache: true,
                        //     formatter: require.resolve('react-dev-utils/eslintFormatter'),
                        //     // eslintPath: path.resolve(__dirname, '../.eslintrc.js'),
                        //     eslintPath: require.resolve('eslint'),
                        //     resolvePluginsRelativeTo: __dirname
                        // }
                    }],
                    include: paths.appSrc
                },
                {
                    // «oneOf» будет проходить по всем следующим загрузчикам, пока один из них не будет соответствовать требованиям.
                    // Когда ни один загрузчик не совпадет, отработает к file-loader в конце списка загрузчиков.
                    oneOf: [
                        // "url" loader works like "file" loader except that it embeds assets
                        // smaller than specified limit in bytes as data URLs to avoid requests.
                        // A missing `test` is equivalent to a match.
                        {
                            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                            loader: require.resolve('url-loader'),
                            options: {
                                limit: imageInlineSizeLimit,
                                name: 'static/media/[name].[hash:8].[ext]'
                            }
                        },
                        // Process application JS with Babel.
                        // The preset includes JSX, Flow, TypeScript, and some ESnext features.
                        {
                            test: /\.(js|mjs|jsx|ts|tsx)$/,
                            include: paths.appSrc,
                            loader: require.resolve('babel-loader'),
                            options: {
                                customize: require.resolve(
                                    'babel-preset-react-app/webpack-overrides'
                                ),
                                plugins: [
                                    [
                                        require.resolve('babel-plugin-named-asset-import'),
                                        {
                                            loaderMap: {
                                                svg: {
                                                    ReactComponent:
                                                        '@svgr/webpack?-svgo,+titleProp,+ref![path]'
                                                }
                                            }
                                        }
                                    ]
                                ],
                                // This is a feature of `babel-loader` for webpack (not Babel itself).
                                // It enables caching results in ./node_modules/.cache/babel-loader/
                                // directory for faster rebuilds.
                                cacheDirectory: true,
                                // See #6846 for context on why cacheCompression is disabled
                                cacheCompression: false,
                                compact: isEnvProduction
                            }
                        },
                        // Process any JS outside of the app with Babel.
                        // Unlike the application JS, we only compile the standard ES features.
                        {
                            test: /\.(js|mjs)$/,
                            exclude: /@babel(?:\/|\\{1,2})runtime/,
                            loader: require.resolve('babel-loader'),
                            options: {
                                babelrc: false,
                                configFile: false,
                                compact: false,
                                presets: [[
                                    require.resolve('babel-preset-react-app/dependencies'),
                                    {helpers: true}
                                ],],
                                cacheDirectory: true,
                                // See #6846 for context on why cacheCompression is disabled
                                cacheCompression: false,

                                // If an error happens in a package, it's possible to be
                                // because it was compiled. Thus, we don't want the browser
                                // debugger to show the original code. Instead, the code
                                // being evaluated would be much more helpful.
                                sourceMaps: false,
                            },
                        }, {
                            test: /\.css$/,
                            exclude: /\.module\.css$/,
                            use: getStyleLoaders({
                                importLoaders: 1,
                                sourceMap: isEnvProduction && shouldUseSourceMap
                            }),
                            sideEffects: true
                        },
                        // Поддержка CSS Modules
                        {
                            test: /\.module\.css$/,
                            use: getStyleLoaders({
                                importLoaders: 1,
                                sourceMap: isEnvProduction && shouldUseSourceMap,
                                modules: true,
                                getLocalIdent: getCSSModuleLocalIdent
                            })
                        }, {
                            test: /\.(scss|sass)$/,
                            exclude: /\.module\.(scss|sass)$/,
                            use: getStyleLoaders(
                                {
                                    importLoaders: 2,
                                    sourceMap: isEnvProduction && shouldUseSourceMap
                                },
                                'sass-loader'
                            ),
                            sideEffects: true
                        }, {
                            test: /\.module\.(scss|sass)$/,
                            use: getStyleLoaders(
                                {
                                    importLoaders: 2,
                                    sourceMap: isEnvProduction && shouldUseSourceMap,
                                    modules: true,
                                    getLocalIdent: getCSSModuleLocalIdent
                                },
                                'sass-loader'
                            )
                        },
                        // Используется, если тип файла не подошел под предыдущие загрузчики
                        // ПРОПИСЫВАЕТСЯ В ПОСЛЕДНЮЮ ОЧЕРЕДЬ
                        {
                            loader: require.resolve('file-loader'),
                            exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
                            options: {
                                name: 'static/media/[name].[hash:8].[ext]'
                            }
                        }
                    ]
                }
            ]
        },



        plugins: [
            // Generates an `index.html` file with the <script> injected.
            new HtmlWebpackPlugin(
                Object.assign(
                    {},
                    {
                        inject: true,
                        template: paths.appHtml,
                    },
                    isEnvProduction
                        ? {
                            minify: {
                                removeComments: true,
                                collapseWhitespace: true,
                                removeRedundantAttributes: true,
                                useShortDoctype: true,
                                removeEmptyAttributes: true,
                                removeStyleLinkTypeAttributes: true,
                                keepClosingSlash: true,
                                minifyJS: true,
                                minifyCSS: true,
                                minifyURLs: true,
                            },
                        }
                        : undefined
                )
            ),
            // Inlines the webpack runtime script. This script is too small to warrant
            // a network request.
            // https://github.com/facebook/create-react-app/issues/5358
            isEnvProduction &&
            shouldInlineRuntimeChunk &&
            new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime-.+[.]js/]),
            // Makes some environment variables available in index.html.
            // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
            // <link rel="icon" href="%PUBLIC_URL%/favicon.ico">
            // In production, it will be an empty string unless you specify "homepage"
            // in `package.json`, in which case it will be the pathname of that URL.
            // In development, this will be an empty string.
            new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
            // This gives some necessary context to module not found errors, such as
            // the requesting resource.
            new ModuleNotFoundPlugin(paths.appPath),
            // Makes some environment variables available to the JS code, for example:
            // if (process.env.NODE_ENV === 'production') { ... }. See `./env.js`.
            // It is absolutely essential that NODE_ENV is set to production
            // during a production build.
            // Otherwise React will be compiled in the very slow development mode.
            new webpack.DefinePlugin(env.stringified),
            // This is necessary to emit hot updates (currently CSS only):
            isEnvDevelopment && new webpack.HotModuleReplacementPlugin(),
            // Watcher doesn't work well if you mistype casing in a path so we use
            // a plugin that prints an error when you attempt to do this.
            // See https://github.com/facebook/create-react-app/issues/240
            isEnvDevelopment && new CaseSensitivePathsPlugin(),
            // If you require a missing module and then `npm install` it, you still have
            // to restart the development server for Webpack to discover it. This plugin
            // makes the discovery automatic so you don't have to restart.
            // See https://github.com/facebook/create-react-app/issues/186
            isEnvDevelopment &&
            new WatchMissingNodeModulesPlugin(paths.appNodeModules),
            isEnvProduction &&
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: 'static/css/[name].[contenthash:8].css',
                chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
            }),
            // Generate an asset manifest file with the following content:
            // - "files" key: Mapping of all asset filenames to their corresponding
            //   output file so that tools can pick it up without having to parse
            //   `index.html`
            // - "entrypoints" key: Array of files which are included in `index.html`,
            //   can be used to reconstruct the HTML if necessary
            new ManifestPlugin({
                fileName: 'asset-manifest.json',
                publicPath: publicPath,
                generate: (seed, files, entrypoints) => {
                    const manifestFiles = files.reduce((manifest, file) => {
                        manifest[file.name] = file.path;
                        return manifest;
                    }, seed);
                    const entrypointFiles = entrypoints.main.filter(
                        fileName => !fileName.endsWith('.map')
                    );

                    return {
                        files: manifestFiles,
                        entrypoints: entrypointFiles,
                    };
                },
            }),
            // Moment.js is an extremely popular library that bundles large locale files
            // by default due to how Webpack interprets its code. This is a practical
            // solution that requires the user to opt into importing specific locales.
            // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
            // You can remove this if you don't use Moment.js:
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
            // Generate a service worker script that will precache, and keep up to date,
            // the HTML & assets that are part of the Webpack build.
            isEnvProduction &&
            new WorkboxWebpackPlugin.GenerateSW({
                clientsClaim: true,
                exclude: [/\.map$/, /asset-manifest\.json$/],
                importWorkboxFrom: 'cdn',
                navigateFallback: publicUrl + '/index.html',
                navigateFallbackBlacklist: [
                    // Exclude URLs starting with /_, as they're likely an API call
                    new RegExp('^/_'),
                    // Exclude any URLs whose last part seems to be a file extension
                    // as they're likely a resource and not a SPA route.
                    // URLs containing a "?" character won't be blacklisted as they're likely
                    // a route with query params (e.g. auth callbacks).
                    new RegExp('/[^/?]+\\.[^/]+$'),
                ],
            }),
            new CopyWebpackPlugin({
                    patterns: [{
                        from: path.resolve(__dirname, 'web.config'),
                        to: path.resolve(__dirname, '../build')
                    }]
                }
            ),
            // TypeScript type checking
            useTypeScript &&
            new ForkTsCheckerWebpackPlugin({
                typescript: resolve.sync('typescript', {
                    basedir: paths.appNodeModules,
                }),
                async: isEnvDevelopment,
                useTypescriptIncrementalApi: true,
                checkSyntacticErrors: true,
                resolveModuleNameModule: process.versions.pnp
                    ? `${__dirname}/pnpTs.js`
                    : undefined,
                resolveTypeReferenceDirectiveModule: process.versions.pnp
                    ? `${__dirname}/pnpTs.js`
                    : undefined,
                tsconfig: paths.appTsConfig,
                reportFiles: [
                    '**',
                    '!**/__tests__/**',
                    '!**/?(*.)(spec|test).*',
                    '!**/src/setupProxy.*',
                    '!**/src/setupTests.*',
                ],
                silent: true,
                // The formatter is invoked directly in WebpackDevServerUtils during development
                formatter: isEnvProduction ? typescriptFormatter : undefined,
            }),
        ].filter(Boolean),
        // Some libraries import Node modules but don't use them in the browser.
        // Tell Webpack to provide empty mocks for them so importing them works.
        node: {
            module: 'empty',
            dgram: 'empty',
            dns: 'mock',
            fs: 'empty',
            http2: 'empty',
            net: 'empty',
            tls: 'empty',
            child_process: 'empty',
        },
        // Turn off performance processing because we utilize
        // our own hints via the FileSizeReporter
        performance: false
    };
};
