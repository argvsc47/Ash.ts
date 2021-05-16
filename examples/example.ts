const ash = require('ash');
var prof = new ash.Profiler();

var server = new ash.Server(prof.getProfile('dev'));
server.router.route('/', function(request, response) {
    response.write("Hello, World!");
    response.end();
});

server.listen();
