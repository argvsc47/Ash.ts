# Ash.ts

A minimal web framework designed to be lightweight, multi-threaded, and async, implemented in Typescript

# Building

 - Since Ash.ts uses the [Zweit](https://github.com/argvsc47/Zweit) build system, make sure to have it
 - Clone the repo and cd into the folder
 - run `zweit.py make.zw` to build the framework or `zweit.py make.zw -all` to build every file one by one 

# configuration

port: the port which the server listens to

protocol: http/https

pool\_sz: the size of the pool, the number of threads

exts: object representing extensions and their content type header

there are currently three ways to configure Ash:

## Using the `Config` class

### JSON

By specifying a JSON file to the Config class you can load configuration from a JSON file:

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

You can use the profiler to store configuration and use them later, for example:

```typescript
const Ash = require('ash');
var Profiler = new Ash.Profiler();
const my_server = new Ash.asherver(Profiler.getProfile('dev'));
```

# Routing

```typescript
//<configuration + server initialization>
my_server.router.route('/', function(request, response) {
    response.write('Hello, World!');
    response.end();
});
```

# static files

to serve static files, put them in the `./resources` directory. and make sure it's respective extension is in your config exts

# Examples

[link](<https://github.com/argvsc47/Ash.ts/tree/main/examples>)

# Honorable mentions

Thanks to Prokop Schield for doing some refactoring when i was just starting in typescript

