module.exports = {
  presets: [["@babel/preset-react"]],
  plugins: [
    [
      "@babel/plugin-transform-typescript",
      {
        isTSX: true,
      },
    ],
  ],
};
