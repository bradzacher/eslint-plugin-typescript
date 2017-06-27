# eslint-plugin-ts/eslint-plugin-typescript

TypeScript support for ESLint. (This is still in the very early stages, so please be patient.)

Note: The package name has been changed from eslint-plugin-typescript to eslint-plugin-ts on npm.

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `typescript-eslint-parser`:

```
$ npm install typescript-eslint-parser --save-dev
```

Last, install `eslint-plugin-ts`:

```
$ npm install eslint-plugin-ts --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-ts` globally.

## Usage

Add `typescript-eslint-parser` to the `parser` field and `typescript` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "parser": "typescript-eslint-parser",
    "plugins": [
        "ts"
    ]
}
```

Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "ts/rule-name": "error"
    }
}
```

## Supported Rules

* `ts/type-annotation-spacing` - enforces one space after the colon and zero spaces before the colon of a type annotation.
* `ts/explicit-member-accessibility` - enforces accessibility modifiers on class properties and methods.
* `ts/interface-name-prefix` - enforces interface names are prefixed.
* `ts/no-triple-slash-reference` - enforces `/// <reference />` is not used.
* `ts/no-explicit-any` - enforces the any type is not used.
* `ts/no-angle-bracket-type-assertion` - enforces the use of `as Type` assertions instead of `<Type>` assertions.
* `ts/no-namespace` - disallows the use of custom TypeScript modules and namespaces.
* `ts/prefer-namespace-keyword` - enforces the use of the keyword `namespace` over `module` to declare custom TypeScript modules.