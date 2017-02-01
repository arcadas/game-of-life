# Conway's Game of Life

Developed by MEAN stack.

## Installation

#### Client

This is a static client (SPA) source by Angular.js, HTML5, CSS. You can test it with any simple webserver, e.g.: Angular-http-server.

```sh
cd client
bower install
angular-http-server
```

Open a browser and navigate to http://localhost:8080.

#### Server

This is a Node.js Express.js web application RESTful API with MongoDB usage. NginX proxy webserver is recommended to use it.

NOTE: there is a config.js file in the server root, you have to change these config values before run the application!

```sh
cd server
npm install
node index.js
```

