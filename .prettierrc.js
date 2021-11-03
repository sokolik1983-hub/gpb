module.exports = {
  ...require('@eco/prettier-config'),
  overrides: [
    {
      files: 'src/**/*.scss',
      options: {
        parser: 'scss',
      },
    },
  ],
};
