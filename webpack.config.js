const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // Điểm bắt đầu của ứng dụng
  entry: './src/index.js',

  // Nơi lưu trữ file đã được bundle
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true, // Xóa thư mục dist trước mỗi lần build
  },

  // Cấu hình cho server phát triển
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 3000,
    open: true, // Tự động mở trình duyệt
    hot: true, // Hot module replacement
  },

  // Cấu hình các module loader
  module: {
    rules: [
      // Rule cho file JavaScript và JSX
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      // Rule cho file CSS
      {
        test: /\.css$/,
        use: [
          'style-loader', // 2. Inject styles vào DOM
          'css-loader',   // 1. Chuyển CSS thành CommonJS
          'postcss-loader', // Xử lý CSS với PostCSS (cho Tailwind)
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
      },
    ],
  },

  // Cấu hình plugin
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // Sử dụng file này làm template
      filename: './index.html',
    }),
  ],

  // Cấu hình để import không cần đuôi file
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};