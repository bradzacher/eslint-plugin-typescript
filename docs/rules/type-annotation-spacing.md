# Enforces spacing around type annotations (type-annotation-spacing)

Spacing around type annotations improves readability of the code. Although the most commonly used style guideline for type annotations in TypeScript prescribes adding a space after the colon, but not before it, it is subjective to the preferences of a project. For example:

```ts
// with space after, but not before (default if no option is specified)
let foo: string = "bar";

// with space before and after
let foo : string = "bar";

// with space before, but not after
let foo :string = "bar";

// with no spaces between the fat arrow
type Foo = (string: name)=>string;

// with space after, but not before the fat arrow
type Foo = (string: name)=> string;

// with space before, but not after the fat arrow
type Foo = (string: name) =>string;

// with spaces before and after the fat arrow (default if no option is specified)
type Foo = (string: name) => string;
```

## Rule Details

This rule aims to enforce specific spacing patterns around type annotations.

## Options

This rule has an object option:
- `"before": false` (default) disallows spaces before the colon.
- `"before": true` requires a space before the colon.
- `"after": true` (default) requires a space after the colon.
- `"after": false` disallows spaces after the colon.
- `"overrides"`: overrides the default options for type annotations with `colon` (e.g. `const foo: string`) and function types with `arrow` (e.g. type Foo = () => {}).

### after
Examples of **incorrect** code for this rule with the default `{ "before": false, "after": true }` options:
```ts
let foo:string = "bar";
let foo :string = "bar";
let foo : string = "bar";

function foo():string {}
function foo() :string {}
function foo() : string {}

class Foo {
    name:string;
}

class Foo {
    name :string;
}

class Foo {
    name : string;
}
```

Examples of **correct** code for this rule with the default `{ "before": false, "after": true }` options:
```ts
let foo: string = "bar";

function foo(): string {}

class Foo {
    name: string;
}
```

### before
Examples of **incorrect** code for this rule with `{ "before": true, "after": true }` options:
```ts
let foo: string = "bar";
let foo:string = "bar";
let foo :string = "bar";

function foo(): string {}
function foo():string {}
function foo() :string {}

class Foo {
    name: string;
}

class Foo {
    name:string;
}

class Foo {
    name :string;
}
```

Examples of **correct** code for this rule with `{ "before": true, "after": true }` options:
```ts
let foo : string = "bar";

function foo() : string {}

class Foo {
    name : string;
}
```

### overrides - colon
Examples of **incorrect** code for this rule with `{ "before": false, "after": false, overrides: { colon: { before: true, after: true }} }` options:
```ts
let foo: string = "bar";
let foo:string = "bar";
let foo :string = "bar";

function foo(): string {}
function foo():string {}
function foo() :string {}

class Foo {
    name: string;
}

class Foo {
    name:string;
}

class Foo {
    name :string;
}

type Foo = {
    name: (name:string) => string;
}
```

Examples of **correct** code for this rule with `{ "before": true, "after": true, overrides: { colon: { before: true, after: true }} }` options:
```ts
let foo : string = "bar";

function foo() : string {}

class Foo {
    name : string;
}

type Foo = {
    name: (name : string)=>string;
}
```

### overrides - arrow
Examples of **incorrect** code for this rule with `{ "before": false, "after": false, overrides: { arrow: { before: true, after: true }} }` options:
```ts
let foo: string = "bar";
let foo : string = "bar";
let foo :string = "bar";

function foo(): string {}
function foo():string {}
function foo() :string {}

class Foo {
    name: string;
}

class Foo {
    name : string;
}

class Foo {
    name :string;
}

type Foo = {
    name: (name : string)=>string;
}

type Foo = {
    name: (name : string) =>string;
}

type Foo = {
    name: (name : string)=> string;
}
```

Examples of **correct** code for this rule with `{ "before": false, "after": false, overrides: { arrow: { before: true, after: true }} }` options:
```ts
let foo:string = "bar";

function foo():string {}

class Foo {
    name:string;
}

type Foo = {
    name: (name:string) => string;
}
```

## When Not To Use It

If you don't want to enforce spacing for your type annotations, you can safely turn this rule off.

## Further Reading

* [TypeScript Type System](https://basarat.gitbooks.io/typescript/docs/types/type-system.html)
* [Type Inference](https://www.typescriptlang.org/docs/handbook/type-inference.html)
