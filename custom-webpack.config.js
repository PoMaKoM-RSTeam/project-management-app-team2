module = {
  rules: [
    {
      test: /\.(js|jsx)$/i,
      loader: 'babel-loader',
    },
    {
      test: /\.css$/i,
      use: ['style-loader', 'css-loader'],
    },
    {
      test: /\.s[ac]ss$/i,
      use: ['style-loader', 'css-loader', 'sass-loader'],
    },
    {
      test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif|obj|mtf|gltf|glb)$/i,
      type: 'asset',
    },
  ],
};
