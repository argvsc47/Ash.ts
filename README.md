# Ash.ts
A minimal web framework designed to be lightweight, multithreaded and async implement in Typescript

# configuration
port: the port which the server listens to
protocol: http/https
pool_sz: the size of the pool, the number of threads
exts: object representing extensions and their content type header

there are currently three ways to configure ash:

## Using 'Config' class
### JSON
By specifying a json file to the Config class you can load configuration from a json file:
```typescript
const Config = require('ash').Config;
var my_conf = new Config();
my_conf.readJSON("path/to/the/file");
```

### Enviroment
By setting enviroment variables you can load the configuration with the readENV function:
```typescript
const Config = require('ash').Config;
var my_conf = new Config();
my_conf.readENV();
```

### Variables
Or you can just use variables declared in your code instead:
```typescript
const Config = require('ash').Config;
var my_conf = new Config();

const port = 8080;
const protocol = "http";
const pool_sz = 6;
const exts = {
	".html": "text/html",
	".css": "text/css"
};

my_conf.readVARS(port, protocol, pool_sz, exts)
```

## Using the profiler
you can use the profiler to store configuration and use them later
example:
```typescript
const Ash = require('ash');
var Profiler = new Ash.Profiler();
const my_server = new Ash.asherver(Profiler.getProfile('dev'));
```
# Examples
```typescript
//<configuration>

const Ash = require('ash');
var my_server = new Ash.asherver(my_conf);
my_server.listen();
```

# routing
to route a url you need to add a js file containg it's name under the ./handlers dir

example:
```javascript
// - handlers/index.js
// name the file index for /
function handler(request, response) {
  response.write("Hello, World!");
  response.end();
}

module.exports = handler;
```

# Honorable mentions
Thanks to Prokop Schield for doing some refactoring when i was just starting in typescript
