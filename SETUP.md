# Setup instructions for configurations of tools used in this application

## ESLint configuration

Run the following command and then follow the onscreen instructions as documented
here on https://nextjs.org/docs/pages/building-your-application/configuring/eslint

```bash
npm run lint
```

## Prettier configuration

1. Run the following command.

```bash
npm install --save-dev prettier eslint-config-prettier
```

2. Add prettier to eslint configuration using `"extends": ["next", "prettier"]`
3. Add pretter specifc commands to package.json, `format:check` and `format:fix`

More info on https://nextjs.org/docs/pages/building-your-application/configuring/eslint#prettier

## Pre-commit configuration

1. Run `npm install --save-dev lint-staged husky`
2. Add lint-stagedrc file as listed here https://nextjs.org/docs/pages/building-your-application/configuring/eslint#lint-staged
3. Run `echo "npm run lint-staged" > .husky/pre-commit`. lint-staged command is configured in package.json
