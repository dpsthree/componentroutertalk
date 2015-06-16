//step 1) require the modules we need
var
http = require('http'),
path = require('path'),
fs = require('fs');

function getExtension(filename) {
    var ext = path.extname(filename||'').split('.');
    return ext[ext.length - 1];
}
 
//helper function handles file verification
function getFile(filePath,res,page404){
    //does the requested file exist?
    fs.exists(filePath,function(exists){
        //if it does...
        if(exists){
            //read the fiule, run the anonymous function
            fs.readFile(filePath,function(err,contents){
                if(!err){
                    //if there was no error
                    //figure out the content type
                    if(getExtension(filePath) === 'css'){
                        res.writeHead(200, {'Content-Type': 'text/css'});
                    }
                    if(getExtension(filePath) === 'js'){
                        res.writeHead(200, {'Content-Type': 'application/javascript'});
                    }
                    if(getExtension(filePath) === 'html'){
                        res.writeHead(200, {'Content-Type': 'text/html'});
                    }
                    if(getExtension(filePath) === 'png'){
                        res.writeHead(200, {'Content-Type': 'image/png'});
                    }
                    res.end(contents);
                } else {
                    //for our own troubleshooting
                    console.dir(err);
                };
            });
        } else {
            //if the requested file was not found
            //serve-up our custom 404 page
            fs.readFile(page404,function(err,contents){
                //if there was no error
                if(!err){
                    //send the contents with a 404/not found header 
                    res.writeHead(404, {'Content-Type': 'text/html'});
                    res.end(contents);
                } else {
                    //for our own troubleshooting
                    console.dir(err);
                };
            });
        };
    });
};
 
//a helper function to handle HTTP requests
function requestHandler(req, res) {
    var
    fileName = req.url,
    localFolder = __dirname + '/..',
    page404 = localFolder + '404.html';
    console.log('basename' + req.url);
    console.log(localFolder + fileName); 
    //call our helper function
    //pass in the path to the file we want,
    //the response object, and the 404 page path
    //in case the requestd file is not found
    getFile((localFolder + fileName),res,page404);
};
 
//step 2) create the server
http.createServer(requestHandler)
 
//step 3) listen for an HTTP request on port 3000
.listen(process.env.PORT, process.env.IP);