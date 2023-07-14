// require('dotenv').config();

const mongoose = require('mongoose');
const express = require("express");
const hbs = require("hbs");
const Recipe = require('./models/Recipe.model');
const data = require('./data.json');

const app = express();
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

const MONGODB_URI = "mongodb://127.0.0.1:27017/recipe-app";
mongoose.set('strictQuery', false);


// mongoose
//   .connect(MONGODB_URI)
//   .then(x => {
//     console.log(`Connected to the database: "${x.connection.name}"`);
//     return Recipe.deleteMany();
//   })
//   .then(() => {

//     const newRecipe = {
//       title: "estrogonofe",
//       level: 'Easy Peasy',
//       ingredients: "arroz, carne, frijoles",
//       cuisine: "latina",
//       dishType: 'main_course',
//       duration: 30,
//       creator: "joao carlos"

//     };

//     return Recipe.create(newRecipe);
//   })
//   .then(createdRecipe => {
//     console.log("Título de la receta: " + createdRecipe.title);
//   })
//   .catch(error => {
//     console.error("Error:", error);
//   });

// mongoose
//   .connect(MONGODB_URI)
//   .then(() => {
//     return Recipe.deleteMany();
//   })
//   .then(() => {
//     return Recipe.create(data[0], data[1], data[2], data[3], data[4])
//   })
//   .catch(error => {
//     console.error("Error:", error);
//   });

// mongoose
//   .connect(MONGODB_URI)
//   .then(() => {
//     return Recipe.findOneAndUpdate(
//       { title: "feijoada" },
//       { duration: 1000 }
//     );
//   })
//   .then(() => {
//     console.log("receta  actualizada")
//   })
//   .catch(error => {
//     console.error("Error:", error);
//   });



mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log(`Connected to the database: "${mongoose.connection.name}"`);
    return Recipe.deleteMany();
  })
  .then(() => {

    const newRecipe = {
      title: 'frango assado',
      duration: 60,
      ingredients: ['Ingrediente 1', 'Ingrediente 2'],
      instructions: 'Instrucciones de la receta nueva',
      cuisine: "latina Brasil"
    };
    return Recipe.create(newRecipe);
  })
  .then((createdRecipe) => {
    console.log(`Recipe created: ${createdRecipe.title}`);

    return Recipe.insertMany(data);
  })
  .then((createdRecipes) => {
    console.log('Multiple recipes created:');
    createdRecipes.forEach((recipe) => {
      console.log(recipe.title);
    });

    return Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 });
  })
  .then(() => {
    console.log('Recipe updated successfully!');

    return Recipe.deleteOne({ title: 'Carrot Cake' });
  })
  .then(() => {
    console.log('Recipe deleted successfully!');

    return mongoose.connection.close();
  })
  .then(() => {
    console.log('Database connection closed.');
  })
  .catch((error) => {
    console.error('Error:', error);
  });



app.get('/', (req, res, next) => {
  res.render('home');
});


app.listen(3000);
