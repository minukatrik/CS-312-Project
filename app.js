//jshint esversion:6

// Initialization

  // Require modules
  const express = require( "express" );
  const bodyParser = require( "body-parser" );
  const mongoose = require( "mongoose" );

  // Create app
  const app = express();

  // Get port
  const PORT = process.env.PORT || 8080;

  // Get URL and database
  const url = "mongodb+srv://admin:pass@atlascluster.wzdy0ju.mongodb.net/";
  const database = "expenseTrackerDB";

  app.use( bodyParser.json() );
  app.use( bodyParser.urlencoded( { extended: true } ) );
  app.use( express.static( "frontend/build" ) );
  mongoose.connect( url + database );

  const expensesSchema = {
    title: String,
    amount: Number,
    date: String,
    description: String
  };

  const categoriesSchema = { name: String };

  const Expense = mongoose.model( "Expense", expensesSchema );
  const Category = mongoose.model( "Category", categoriesSchema );

  const category1 = new Category( { name: "Food" } );
  const category2 = new Category( { name: "Transportation" } );
  const category3 = new Category( { name: "Entertainment" } );
  const category4 = new Category( { name: "Utilities" } );
  const category5 = new Category( { name: "Groceries" } );


  const defaultCategories = [ category1, category2, category3, category4,
                                                                    category5 ];

// Get Methods

  app.get( "/api/categories", ( req, res ) => {
    Category
      .find()
      .then( data => res.send( data ) );
  });

  app.get( "/api/expenses", ( req, res ) => {
    Expense
      .find()
      .then( data => res.send( data ) );
  })

// Post methods

  app.post( "/submit", ( req, res ) => {
    const { title, amount, date, description } = req.body;
    const category = new Category( { name: title } );
    const expense = new Expense({
      title: title,
      amount: amount,
      date: date,
      description: description
    });

    Category
      .findOne( { name: title } )
      .then( ( foundCategory ) => {
        if ( !foundCategory ) {
          category.save();
        }
      });
    expense.save();
    res.json( expense );
  });

 app.post( "/delete", ( req, res ) => {

    Expense.findByIdAndDelete( req.body._id )
      .catch( err => console.log( err ) );
  });
// app.delete('/delete/:id', async(req,res) =>{
//   const {id} = req.params;
//   try{
//     const expense = await Expense.findByIdAndDelete(id);
//     if(!expense){
//       return res.status(404).json({message: 'not found expense'});
//     }
//     res.status(200).json({message: 'Expense deleted successfully'});
//   } catch(error){
//     res.status(500).json({message : error.message});
//   }
// });
// OTHER

  // Console listening to a port
  app.listen( PORT, () => {
    console.log( "Server has started successfully at port " + PORT );
  });
