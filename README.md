Studio Browser Plugin
=========

<img src="http://ericholiveira.com/studio/images/STUDIO_logo.png" align="right" width="300px" />

Studio Browser is a plugin for [Studio](https://github.com/ericholiveira/studio) which enables browser direct access (rpc) to your services.

If you dont know Studio, you will need to read about it [here](https://github.com/ericholiveira/studio) to unleash the REAL power of micro services in node,
it is really easy to use, enforces good practices, and as advantage lets you cluster your application without ANY configuration, 
real time metrics, and even more. Your services are built to scale since thay one.

To use Studio Browser you also need to add [Studio Browser Client](https://github.com/ericholiveira/studio-browser-client) as a dependency to your html.

This plugin is really simple to use as it lets you access your server the exact same way you do on server-to-server Studio service call.

Are using [Studio](https://github.com/ericholiveira/studio) or any related project. Let us know, we would love to hear your feedback.

Wants to learn more???? Click here to join our slack channel 

[![Join the StudioJS chat](https://studiojs.herokuapp.com/badge.svg)](https://studiojs.herokuapp.com/)

[![Build Status](https://travis-ci.org/ericholiveira/studio-browser.svg?branch=master)](https://travis-ci.org/ericholiveira/studio-browser)
[![npm version](https://badge.fury.io/js/studio-browser.svg)](http://badge.fury.io/js/studio-browser)
[![Dependency Status](https://david-dm.org/ericholiveira/studio-browser.svg)](https://david-dm.org/ericholiveira/studio-browser)

[![NPM](https://nodei.co/npm/studio-browser.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/studio-browser/)


Table of contents
========

- [Install](#install)
- [Intro](#intro)
- [Getting Started](#getting-started)
- [Examples](#examples)
- [Documentation](#documentation)
- [Build](#build)
- [Test](#test)
- [License](#license)

Intro
========

You probably already know [Studio](https://github.com/ericholiveira/studio) and how it can help you to create and manage micro services without even 
thinking about it. You probably already know how to clusterize [Studio](https://github.com/ericholiveira/studio-cluster) your services without configuration
and all the advantages you can take from a micro services created to be easy to use since they one.

Now its time to take one step further and use a really simple interface to access your services from the browser. Now is time to Studio Browser.

Getting Started
========

To use Studio browser you will need to install it on your server Studio based application, to do this, just run

```
npm install studio-browser --save
```

You will also need to add [Studio Browser Client](https://github.com/ericholiveira/studio-browser-client) as a dependecy on your html.
You can do this installing from npm with browserify or downloading the full file from [here](https://cdn.rawgit.com/ericholiveira/studio-browser-client/master/browser/studio-browser-client-with-dependecies.js). Now you're ready to acess your server services from browser.

Examples
========

Here is a hello world example using Studio Browser:
To run this example you will need to install [Studio](https://github.com/ericholiveira/studio) ,[Studio Browser](https://github.com/ericholiveira/studio-browser), 
[socket io](https://github.com/socketio/socket.io) and [express](https://github.com/expressjs/express) . Im using express ONLY to deliver the html file.

On your server:
```js
var Studio = require('studio');
var StudioBrowser = require('studio-browser');

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
/*
Usually you dont need to pass your own socketIO reference, if you dont pass any, Studio Browser creates it to you
on port 3000. But as we want to deploy everything together we are just sharing the http server between socket io and express.
*/
Studio.use(StudioBrowser({socketIO:io}));

Studio(function sayHello(){
  return 'Hello World From Server';
}).browserPublic(); 
/* Calling .browserPublic() makes your service available for direct access from browser*/

Studio(function somePrivateFunction(){
  return 'foo';
}); 
/* If you dont call .browserPublic() your service cant be accessed directly from browser*/
```

And on your browser you can create the followind index.html file:
```html
<html>
<head>
<title>Studio Browser example</title>
</head>
<body>
  <h1 id="result"></h1>
  <script src="https://raw.githubusercontent.com/ericholiveira/studio-browser-client/master/browser/studio-browser-client-with-dependecies.js"></script>
  <script type="text/javascript">
    Studio.use(Studio.plugin.client({ip:'http://localhost:3000/'}));//the server address
    var sayHelloService = Studio('sayHello');
    sayHelloService().then(function(message){
      document.getElementById('result').innerHTML = message;
    });
  </script>
</body>
</html>
```
Now you just have to run your server with node, and open your browser on http://localhost:3000

Thats it... Is that simple to access your services from the browser... You dont even need to understand what is a request nor anything related.
We just handle it to you.


Build
========

For those interested on contributing or undenstand how the code works checkout our [documentation](https://github.com/ericholiveira/studio-browser/tree/master/.documentation) folder.

Build
========

To build the project you have to run:

    npm install
    npm test

This is going to install dependencies, lint and test the code

Test
========

Run test with:

    npm test

License
========

The MIT License (MIT)

Copyright (c) 2016 Erich Oliveira [ericholiveira.com](http://ericholiveira.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.