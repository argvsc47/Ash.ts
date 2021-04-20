# Ash.ts
A minimal micro micro framework for web servers implemented in ( TypeScript )

# config.ash
a config.ash file must be present in the file requiring Ash.ts
example:
```json
{
  "port": 8000,
  "proto": "http",
  "url": {
    "/":"index_handler",
}
```

# handler.ts
a handlers.ts file must be present in the file requiring ash
example:
```typscript
function index_handler(request,response) {
  response.write("Hello, World!");
  response.end();
}
```
