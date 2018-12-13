# Forbids an object literal to appear in a type assertion expression (no-object-literal-type-assertion)

Always prefer `const x: T = { ... };` to `const x = { ... } as T;`

## Rule Details

Examples of **incorrect** code for this rule.

```ts
const x = { ... } as T;
```

Examples of **correct** code for this rule.

```ts
const x: T = { ... };
```

## Options
```json
{
    "typescript/no-object-literal-type-assertion": "error"
}
```

## Compatibility

* TSLint: [no-object-literal-type-assertion](https://palantir.github.io/tslint/rules/no-object-literal-type-assertion/)
