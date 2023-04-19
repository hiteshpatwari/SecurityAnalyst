import { fileURLToPath } from 'url';
import path from 'path';

export default {
  entry: './index.jsx',
  output: {
    path: path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'dist'),
    filename: 'renderer.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  target: 'electron-renderer',
};
