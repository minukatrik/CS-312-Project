//jshint esversion:6

// Initialization

  // Require modules
  const express = require( "express" );
  const bodyParser = require( "body-parser" );
  const mongoose = require( "mongoose" );

  // Create app
  const app = express();

  // Get port
  let port = process.env.PORT;
  if ( port == null || port == "" ) {
    port = 3000;
  }

  // Get URL and database
  const url = "";
  const database = "";

  app.use( bodyParser.urlencoded( { extended: true } ) );
  app.set( "view engine", "ejs" );
  app.use( express.static( "public" ) );
  // mongoose.connect( url + database );

// Get Methods

  app.get( "/", ( req, res ) => {

    console.log( res );

    res.sendFile( __dirname + "/index.html" );
  });

// OTHER

  // Console listening to a port
  app.listen( port, () => {
    console.log( "Server has started successfully\n" );
  });
