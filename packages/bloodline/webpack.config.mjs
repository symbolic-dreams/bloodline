import path from 'path';
import url from 'url';
import ESLintWebpackPlugin from 'eslint-webpack-plugin';

const __filename = url.fileURLToPath(import.meta.url),
    __dirname = path.dirname(__filename);

export default {
    mode: process.env.NODE_ENV,
    devtool: process.env.NODE_ENV === 'development' ? 'eval-source-map' : 'source-map',
    entry: {
        index: './src/index.mts'
    },
    experiments: {
        outputModule: true
    },
    module: {
        rules: [
            { test: /\.mts$/, loader: 'ts-loader' }
        ]
    },
    resolve: {
        extensions: ['.mts', '.mjs', '.ts', '.js', '.json'],
        extensionAlias: {
            ".js": [".js", ".ts"],
            ".cjs": [".cjs", ".cts"],
            ".mjs": [".mjs", ".mts"],
        },
        alias: {
            "~": path.resolve(__dirname, 'src')
        }
    },
    output: {
        clean: true,
        library: {
            type: 'module'
        },
        module: true,
        filename: '[name].mjs',
        path: path.resolve(__dirname, 'dist')
    },
    target: 'web',
    plugins: [
        new ESLintWebpackPlugin({
            extensions: ['mts', 'mjs', 'ts', 'js'],
            fix: true,
            overrideConfigFile: path.resolve(__dirname, '.eslintrc.json')
        })
    ]
}