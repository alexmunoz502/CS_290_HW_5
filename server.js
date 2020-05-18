// CS_290: Homework #5
// Alex Munoz

// Import dependencies
var express = require('express');
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

// Initialize the application
var app = express();

// Set the view engine and server port for the application to use
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

// Middleware function to use static files (for css styling)
app.use(express.static("views"));

// Middleware functions to support POST requests
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Request Handling
// GET Home page (Default)
app.get('/',function(req,res){
    res.render('home');
});

// GET Submission (GET Request Handling)
app.get('/submit',function(req,res){
    // Array to hold key-value pairs of query data
    var queryData = [];

    // Iterate through the request data sent and add the key-value pairs to the queryData array
    for (var parameter in req.query){
        queryData.push({'name':parameter,'value':req.query[parameter]});
      }

    // Initialize data context for the web-page
    var context = {};
    context.queryData = queryData;

    // Render the get.handlebars page with the generated data context
    res.render('get', context);
});

// POST Submission (POST Request Handling)
app.post('/submit',function(req,res){
    // Array to hold key-value pairs of query data
    var queryData = [];

    // Iterate through the request data sent and add the key-value pairs to the queryData array
    for (var parameter in req.query){
        queryData.push({'name':parameter,'value':req.query[parameter]});
        }

    // Array to hold key-value pairs of query data
    var bodyData = [];

    // Iterate through the request data sent and add the key-value pairs to the queryData array
    for (var parameter in req.body){
        bodyData.push({'name':parameter,'value':req.body[parameter]});
        }

    // Initialize data context for the web-page
    var context = {};
    context.queryData = queryData;
    context.bodyData = bodyData;

    // Render the get.handlebars page with the generated data context
    res.render('post', context);

});

// Error Handling
app.use(function(req,res){
    res.status(404);
    res.render('404');
});

app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type('plain/text');
    res.status(500);
    res.render('500');
});

// Start Server
app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});