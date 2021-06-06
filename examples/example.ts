const ash = require('ash');
var prof = new ash.Profiler();

var server = new ash.asherver(prof.getProfile('dev'));
server.router.route('/', function(request, response) {
    response.write("Hello, World!");
    response.end();
});

server.listen();
