# Disallows the use of `internal modules` and `namespaces`.

Legacy external modules (`declare module 'foo' {}`), internal modules (`module foo {}`) 
and namespaces (`namespace foo {}`) are considered outdated ways to organize TypeScript code. 
ES2015 external module syntax is now preferred.     

## Rule Details

This rule aims to standardise the way TypeScript modules are declared.

## Options

This rule, in its default state, does not require any argument. If you would like to enable one 
or more of the following you may pass an object with the options set as follows:
- `allowDeclarations` set to `true` will allow you to use internal modules and namespaces as long as they are used as  
declarations (Default: `true`).  
- `allowLegacyExternalModules` set to `true` will allow you to use the legacy external module syntax (Default: `false`).     

Examples of **incorrect** code for the default `{ "allowDeclarations": true, "allowLegacyExternalModules": false }` options:
```ts
declare module 'foo' { }
module foo {}
namespace foo {}
```

Examples of **correct** code for the default `{ "allowDeclarations": true, "allowLegacyExternalModules": false }` options:
```ts
declare module foo { }
declare namespace foo {}
```

### allowDeclarations
Examples of **incorrect** code for the `{ "allowDeclarations": true }` option:
```ts
declare module 'foo' { }
module foo {}
namespace foo {}
```

Examples of **correct** code for the `{ "allowDeclarations": true }` option:
```ts
declare module foo { }
declare namespace foo {}
```

### allowLegacyExternalModules
Examples of **incorrect** code for the `{ "allowLegacyExternalModules": true }` option:
```ts
module foo {}
declare module foo { }

namespace foo {}
declare namespace foo {}
```

Examples of **correct** code for the `{ "allowLegacyExternalModules": true }` option:
```ts
declare module 'foo' { }
```

## When Not To Use It

If you are using the ES2015 module syntax, then you will not need this rule.

## Further Reading

* [Modules](https://www.typescriptlang.org/docs/handbook/modules.html)  
* [Namespaces](https://www.typescriptlang.org/docs/handbook/namespaces.html)  
* [Namespaces and Modules](https://www.typescriptlang.org/docs/handbook/namespaces-and-modules.html)  

## Compatibility

* TSLint: [no-namespace](https://palantir.github.io/tslint/rules/no-namespace/)
