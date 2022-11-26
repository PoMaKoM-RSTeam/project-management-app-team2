/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  module: {
    rules: [
      {
        test: /\.(glb|gltf)$/i,
        type: "asset",
      },
    ],
  },
};
