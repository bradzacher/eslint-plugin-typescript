# Require spacing around infix operators in TypeScript-specific constructs (to be used in tandem with the code `space-infix-ops` rule) (space-infix-ops)

While formatting preferences are very personal, a number of style guides require spaces around operators, such as:

```ts
type id = number;
type Perhaps<T> = T | null;
```

This rule is intended to be used together with the core rule [`space-infix-ops`](https://eslint.org/docs/rules/space-infix-ops).

## Rule Details

This rule aims to enforce spaces around infix operators in TypeScript-specific constructs.

Examples of **incorrect** code:

```ts
type id=number;
type id =number;
type id= number;
type Perhaps<T>=T | null;
type Perhaps<T> =T | null;
type Perhaps<T>= T | null;
```

Examples of **correct** code:
```ts
type id = number;
type Perhaps<T> = T | null;
```

## When Not To Use It

If you don't want to enforce spacing for infix ops, you can safely turn this rule off.

## Further Reading

* [Advanced Types](https://www.typescriptlang.org/docs/handbook/advanced-types.html)
* [core `space-infix-ops` rule](https://eslint.org/docs/rules/space-infix-ops)
