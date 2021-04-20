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

# handlers
to route a url you need to add a js file containg it's handler under ./handlers dir
with the name of the url
example:
```javascript
// - handlers/index.js
// name the file index for /
// the function that gets called is always 'handler' so be sure to include it
function handler(request, response) {
  response.write("Hello, World!");
  response.end();
}
```
