# Enforces the use of interfaces over type literals (`type T = {...}`).

In TypeScript, type literals can act sort of like interfaces, but there are subtle differences that 
make interfaces a better choice:   
- Interfaces can be extended or implemented by other types.
- Interfaces create a new name that is used everywhere, so when debugging is easier to identify 
the base type of an object.

## Rule Details

This rule aims to standardise the use of interfaces across the codebase.

## Options
This rule, in its default state, does not require any argument. If you would like to enable one 
or more of the following you may pass an object with the options set as follows:
- `allowUnion` set to `true` will allow you to use type literals in union types (Default: `false`).  
- `allowIntersection` set to `true` will allow you to use type literals in intersection types (Default: `false`).  

Examples of **incorrect** code for the default `{ "allowUnion": false, "allowIntersection": false }` options:
```ts
type Foo = {};

type Foo = {
    count: number
};

type Foo = string | {};

type Foo = string | {
    count: number
};

type Foo = string & {};

type Foo = string & {
    count: number
};
```

Examples of **correct** code for the default `{ "allowUnion": false, "allowIntersection": false }` options:
```ts
type Foo = 'a';

type Foo = 'a' | 'b';

type Foo = string;

type Foo = string | string[];

type Foo = string & string[];

type Foo = (a: number) => void;

interface Foo {}

interface Baz {}

interface Bar extends Baz {}
```

### allowUnion
Examples of **incorrect** code for the `{ "allowUnion": true }` option:
```ts
type Foo = {};

type Foo = {
    count: number
};

type Foo = string & {};

type Foo = string & {
    count: number
};
```

Examples of **correct** code for the `{ "allowUnion": true }` option:
```ts
type Foo = string | {};

type Foo = string | {
    count: number
};
```

### allowIntersection
Examples of **incorrect** code for the `{ "allowIntersection": true }` option:
```ts
type Foo = {};

type Foo = {
    count: number
};

type Foo = string | {};

type Foo = string | {
    count: number
};
```

Examples of **correct** code for the `{ "allowIntersection": true }` option:
```ts
type Foo = string & {};

type Foo = string & {
    count: number
};
```

## When Not To Use It

When you can't express some shape with an interface and you need to use a union, tuple type, callback, etc.

## Further Reading

* [Interfaces vs. Type Aliases](https://www.typescriptlang.org/docs/handbook/advanced-types.html)

## Compatibility

* TSLint: [interface-over-type-literal](https://palantir.github.io/tslint/rules/interface-over-type-literal/)
