//TEST 004 ********************************************************

const express = require('express');
//LD body parser gives middleware to parse incoming requests bodyes
const bodyParser = require('body-parser');
const app = express();

// NOTE -> "app.use" runs on all the incoming requests
// in this case will try to parse from body any 
// "urlencoded" data and populate "req.body"
// that's out body case considering -> '<form method="POST"><input type="text" name="username"><button type="submit">Create User</button></form>'
// it will also call NEXT
app.use(bodyParser.urlencoded({extended: false}));

// NOTE -> "app.post" runs only on POST incoming requests
// lisyening to urel "/user"
app.post('/user',(req, res, next) => {
    return res.send('<h1> User: ' + req.body.username + '</h1>');
});

//trigger on GET requests with path '/'
//NOTE the form trigger path "/user" when sending request
app.get('/',(req, res, next) => {
  res.send(
    '<form action="/user" method="POST"><input type="text" name="username"><button type="submit">Create User</button></form>'
  );
});

app.listen(5000);

//TEST 004 END ********************************************************





//TEST 003 ********************************************************
/*
const express = require('express');

//will call function "express()" and store the rich object returned in "app"
//do not need to "http.createServer", express will do that for me.
const app = express();


//MIDDLEWARE function.
// structure is -> app.use((request, response, next function)
app.use((req, res, next) => {
    console.log('--> FIRST CALLED IN SEQUENCE <---')
  let body = '';
  //LD 002 - the below is executed when the input request gets completely processed
  req.on('end', () => {
    const userName = body.split('=')[1];
    if (userName) {
      req.body = { name: userName };
    }
    next();//WILL FORWARD REQUEST TO NEXT MIDDLEWARE IN LINE
  });
  //LD 001 - keep parsing the input
  req.on('data', chunk => {
    body += chunk;
  });
});


app.use((req, res, next) => {
    console.log('--> SECOND CALLED IN SEQUENCE <---')
  if (req.body) {
    return res.send('<h1> User: ' + req.body.name + '</h1>');
  }
  //LD 000 - default and initial response
  res.send(
    '<form method="POST"><input type="text" name="username"><button type="submit">Create User</button></form>'
  );
});

app.listen(5000);
*/
//TEST 003 END ********************************************************


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


/*
//TEST 002 ********************************************************
// TO RUN -> "node app.js" then "http://localhost:5000/"
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

//TEST 002 END ********************************************************
*/

