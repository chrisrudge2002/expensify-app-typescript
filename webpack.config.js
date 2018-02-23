const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const publicDirPath = path.join(__dirname, 'public');

module.exports = (env) => {
    const isProduction = (env === 'production');
    const CSSExtract = new ExtractTextPlugin('styles.css');

    return {
        entry: './src/app.tsx',
        output: {
            path: publicDirPath,
            filename: 'bundle.js'
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".jsx"]
          },
        module: {
            rules: [{ 
                loader: 'awesome-typescript-loader', 
                test: /\.(t|j)sx?$/, 
                exclude: /node_modules/  
            }, {
                test: /\.s?css$/,
                use: CSSExtract.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: { sourceMap: true }
                        }, {
                            loader: 'sass-loader',
                            options: { sourceMap: true }
                        }
                    ]
                })
            }, { 
                enforce: "pre", 
                test: /\.js$/, 
                loader: "source-map-loader" 
            }]
        },
        plugins: [ CSSExtract ],
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        devServer: {
            contentBase: publicDirPath,
            historyApiFallback: true
        }
    };
};