var hapi = require("hapi");
var Path = require('path');
require('dotenv').load();

var server = new hapi.Server();

var web = server.connection({
    port: process.env.SERVER_PORT,
    host: process.env.SERVER_HOST,
    routes : {
        validate:{
            options:{
                abortEarly:false
            }
        },
        files : {
            relativeTo : Path.join(__dirname, 'public/')
        },
        cors : true
    }
});


//register the plugins and stat the server in callback
server.register([
    {
        register : require('hapi-router'),
        options : {
            routes : 'src/routes/*.js'
        }
    },
    {
        register: require('good'),
        options: {
            reporters: [{
                reporter: require('good-console'),
                events: {
                    response: '*',
                    log: '*'
                }
            }]
        }

    }], function (err) {
    if (err) {
        throw err;
    }
    server.start(function(){
        server.log("server is running at"+ server.info.uri);
        server.log('info', 'Server running at: ' + server.info.uri);
    });
});

module.exports = server;

