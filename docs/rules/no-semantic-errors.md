# Enforces that there is no semantic and syntactic errors (no-semantic-errors)

This rule reports all semantic and type errors provided by diagnostics from typescript.

## Rule Details

Examples of **incorrect** code for this rule:

```ts
interface Foo {
    hello: string;
}
const foo: string = ({ hello: 2 } as Foo)!.foo
```

Examples of **correct** code for this rule:

```ts
interface Foo {
    hello: string;
}
const foo: string = ({ hello: 'Bar' } as Foo).hello
```

### Options

```json
{
    "typescript/no-this-alias": "no-semantic-errors"
}
```
