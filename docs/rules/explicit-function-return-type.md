# Require explicit return types on functions and class methods (explicit-function-return-type)

Explicit types for function return values makes it clear to any calling code what type is returned.
This ensures that the return value is assigned to a variable of the correct type; or in the case
where there is no return value, that the calling code doesn't try to use the undefined value when it
shouldn't.

## Rule Details

This rule aims to ensure that the values returned from functions are of the expected type.

The following patterns are considered warnings:

```ts
// Should indicate that no value is returned (void)
function test() {
    return;
}

// Should indicate that a number is returned
var fn = function() {
    return 1;
}

// Should indicate that a string is returned
var arrowFn = () => 'test';

class Test {
    // Should indicate that no value is returned (void)
    method() {
        return;
    }
}
```

The following patterns are not warnings:

```ts
// No return value should be expected (void)
function test(): void {
    return;
}

// A return value of type number
var fn = function(): number {
    return 1;
}

// A return value of type string
var arrowFn = (): string => 'test';

class Test {
    // No return value should be expected (void)
    method(): void {
        return;
    }
}

/*eslint explicit-function-return-type: ["error", { allowExpressions: true }]*/
node.addEventListener('click', () => {});

/*eslint explicit-function-return-type: ["error", { allowExpressions: true }]*/
node.addEventListener('click', function() {});

/*eslint explicit-function-return-type: ["error", { allowExpressions: true }]*/
const foo = arr.map(i => i * i);
```

## Options

The rule accepts an options object with the following properties:

* `allowExpressions` if true, only functions which are part of a declaration will be checked

## When Not To Use It

If you don't wish to prevent calling code from using function return values in unexpected ways, then
you will not need this rule.

## Further Reading

* TypeScript [Functions](https://www.typescriptlang.org/docs/handbook/functions.html#function-types)
