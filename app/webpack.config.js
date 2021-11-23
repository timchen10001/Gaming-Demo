const path = require('path');
const sass = require('sass');
const { NoEmitOnErrorsPlugin, DefinePlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const TerserPlugin = require('terser-webpack-plugin');

const WebpackBar = require('webpackbar');
const { version } = require('../package.json');

const { ANALYZE = 'false', NODE_ENV = 'development' } = process.env;

const SRC_PATH = path.resolve(__dirname, 'src');
const NODE_MODULES_PATH = path.resolve(__dirname, '..', 'node_modules');

const isProduction = NODE_ENV === 'production';

const styleLoader = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';

module.exports = {
  entry: {
    app: [path.resolve(SRC_PATH, 'main.jsx')],
  },
  cache: {
    type: 'filesystem',
    cacheDirectory: path.resolve(__dirname, '.webpack_cache'),
  },
  output: {
    filename: '[name].[contenthash:7].js',
    chunkFilename: '[id].[contenthash:7].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: './', // HTML 中的引用起始路徑
  },
  mode: isProduction ? 'production' : 'development',
  devServer: {
    hot: true,
    contentBase: [path.resolve(__dirname, 'src/static')],
    publicPath: '/',
    compress: true,
    port: 1001,
    host: '0.0.0.0',
    historyApiFallback: true,
    disableHostCheck: true,
    stats: {
      assets: false,
      children: false,
      chunks: false,
      chunkModules: false,
      colors: true,
      entrypoints: false,
      hash: false,
      modules: false,
      timings: false,
      version: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
        include: [SRC_PATH],
      },
      {
        test: /\.(css|s[ac]ss)$/,
        include: [SRC_PATH],
        use: [
          styleLoader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: `${isProduction ? '' : '[name]__[local]--'}[hash:base64:5]`,
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: sass, // 強制使用 dart-sass (而不是 node-sass)
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.css$/i,
        use: [styleLoader, 'css-loader'],
        include: [NODE_MODULES_PATH],
        exclude: [SRC_PATH],
      },
      {
        test: /\.(mp4|webm)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'videos/[contenthash:7].[ext]',
            },
          },
        ],
        include: [SRC_PATH],
      },
      {
        test: /\.(svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[contenthash:7].[ext]',
            },
          },
        ],
        include: [SRC_PATH],
      },
      {
        test: /\.(jpe?g|png|gif|mjpeg|zip)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              hash: 'sha512',
              digest: 'hex',
              name: '[hash].[ext]',
            },
          },
        ],
        include: [SRC_PATH],
      },
    ],
  },
  plugins: [
    new WebpackBar({
      color: '#3b5fc4',
    }),
    // 清除 dist 內應該移除的檔案
    new CleanWebpackPlugin(),
    new NoEmitOnErrorsPlugin(),
    // 塞 bundle 到 html
    new HTMLWebpackPlugin({
      template: path.resolve(SRC_PATH, 'index.html'),
      inject: 'body',
      filename: 'index.html',
      minify: {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
        quoteCharacter: "'",
        removeComments: true,
        removeEmptyAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
      },
    }),
    // 抽取 CSS 檔案然後注入 HTML
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:7].css',
      chunkFilename: 'css/[id].[contenthash:7].css',
    }),
    new DefinePlugin({
      'process.env.APP_VERSION': JSON.stringify(version),
    }),
    // 分析及圖像化 bundle size
    new BundleAnalyzerPlugin({
      analyzerMode: ANALYZE === 'true' ? 'server' : 'disabled',
      analyzerHost: 'localhost',
      analyzerPort: 5888,
    }),
  ],
  optimization: {
    moduleIds: isProduction ? 'named' : 'deterministic',
    usedExports: isProduction,
    minimize: isProduction,
    minimizer: [
      // 壓縮 bundle 之後的 js 檔案
      new TerserPlugin({
        terserOptions: {
          compress: {
            warnings: false,
            comparisons: false,
          },
          mangle: true,
          output: {
            comments: false,
            ascii_only: true,
          },
        },
        parallel: true,
      }),
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      }),
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          priority: 1,
        },
      },
    },
  },
  resolve: {
    mainFields: ['browser', 'module', 'main'],
    extensions: ['.js', '.jsx'],
    alias: {
      '@@core': path.resolve(SRC_PATH, 'core'),
      '@@domains': path.resolve(SRC_PATH, 'domains'),
      '@@static': path.resolve(SRC_PATH, 'static'),
      '@@ui': path.resolve(SRC_PATH, 'ui'),
      '@@assets': path.resolve(SRC_PATH, 'assets'),
      '@@constants': path.resolve(SRC_PATH, 'constants'),
      '@@hooks': path.resolve(SRC_PATH, 'hooks'),
      '@@helpers': path.resolve(SRC_PATH, 'helpers'),
    },
  },
  devtool: isProduction ? false : 'eval-cheap-module-source-map',
};
