
//TEST 001 ********************************************************
/*
//importing file sysyem in Javascript
// the function "require" is available globally. 'fs' is available in node for file sysyem
const fs = require('fs'); 

const userName = 'Max';

fs.writeFile('user-data.txt', 'Name: ' + userName, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('WROTE FILE');
});
*/



//TEST 002 ********************************************************
// TO RUN -> "node app.js"
//LD "HTTP" is another core module of node. Allow to reate a server
const http = require('http');

//get's in input one argument, the "requestListener". The function is triggered any 
//time we get an incoming request. The "requestListener" gets two items:
// the request and the response objects. Those 2 objects are passed in by node.js
const server = http.createServer((req, res) => {
  console.log('INCOMING REQUEST');
  console.log(req.method, req.url);//"req.method" gives back the http methid was used for the request

  if (req.method === 'POST') {
    let body = '';

    //it registered but EXECUTED ONLY when the entire body request has been parsed.
    req.on('end', () => {
      const userName = body.split('=')[1]; //access to the second element of the array
      console.log("LD001 "+body);
      res.end('<h1>' + "request executed " + userName + '</h1>');
    });

    //LD I cannot query the body, BUT can add "on" that is an event listener.
    //In this case I listen to chink of data I get in
    req.on('data', (chunk) => {
        console.log("LD002 "+body);
      body += chunk;
    });
  } else {
    console.log("LD000");
    res.setHeader('Content-Type', 'text/html'); //tell the browser to interpret html but text
    res.end(
      '<form method="POST"><input type="text" name="username"><button type="submit">Create User</button></form>'
    );
  }//LD end if

});

//this opens up, so spin up a local server to my machine not exposed externally.
// the listener must be stopped manually -> "CTRL+C"
server.listen(5000);

