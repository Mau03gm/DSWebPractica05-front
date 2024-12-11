// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ["expo", "prettier"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    "import/no-unresolved": [
      "error",
      {
        ignore: ["@env"], // Ignora los imports que empiezan con @env
      },
    ],
  },
};