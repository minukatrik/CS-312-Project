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
  });



  // app.get( "/api/total", ( req, res ) => {
  //
  //   let idx, total = 0;
  //
  //   Expense
  //     .find()
  //     .then( data => {
  //       for ( idx = 0; idx < data.length; idx++ ) {
  //         total += data[ idx ].amount;
  //       }
  //       res.json( total );
  //     });
  // });
  //
  //
  //
  // app.get( "/api/categoryTotals", ( req, res ) => {
  //   let idx, result, titleIdx, summary = [];
  //
  //   Expense
  //     .find()
  //     .then( data => {
  //       for ( idx = 0; idx < data.length; idx++ ) {
  //         result = summary.find( item => item.title === data[ idx ].title );
  //
  //         if ( result === undefined ) {
  //           summary.push({
  //             title: data[ idx ].title,
  //             amount: data[ idx ].amount
  //           });
  //         }
  //
  //         else {
  //           titleIdx = summary.findIndex( item => item.title === data[ idx ].title );
  //           summary[ titleIdx ].amount += data[ idx ].amount;
  //         }
  //       }
  //       res.send( summary );
  //     });
  // });
  //
  //
  // app.get( "/api/ade", ( req, res ) => {
  //   const avgDays = 30.4;
  // });


  app.get( "/api/monthly", ( req, res ) => {

    let monthIdx, idx, result, date, monthly = [];
    const months = [ "January", "February", "March", "April", "May", "June",
             "July", "August", "September", "October", "November", "December" ];
    const avgDays = 30.4;

    for ( monthIdx = 0; monthIdx < months.length; monthIdx++ ) {
      monthly.push({
        month: months[ monthIdx ],
        totalSpending: 0,
        avgDailySpending: 0,
        categoryTotals: []
      });
    }

    Expense
      .find()
      .then( data => {
        for ( idx = 0; idx < data.length; idx++ ) {

          date = data[ idx ].date;

          splitDate = date.split("-");

          monthIdx = splitDate[ 1 ] - 1;

          monthly[ monthIdx ].totalSpending += data[ idx ].amount;

          result = monthly[ monthIdx ].categoryTotals.find( item => item.title === data[ idx ].title );

          if ( result === undefined ) {
            monthly[ monthIdx ].categoryTotals.push({
              title: data[ idx ].title,
              amount: data[ idx ].amount
            });
          }

          else {
            titleIdx = monthly[ monthIdx ].categoryTotals.findIndex( item => item.title === data[ idx ].title );
            monthly[ monthIdx ].categoryTotals[ titleIdx ].amount += data[ idx ].amount;
          }
        }

        for ( monthIdx = 0; monthIdx < months.length; monthIdx++ ) {
          monthly[ monthIdx ].avgDailySpending = monthly[ monthIdx ].totalSpending / avgDays;
        }

        res.send( monthly );

      });
  });


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

   const { title, amount, date, description } = req.body;

    Expense.findOneAndDelete({
      title: title,
      amount: amount,
      date: date,
      description: description
    })
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
