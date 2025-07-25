const mongoose = require('mongoose');
const User = require('../model/User');

async function connect() {
    try {
        // Use the previously present password (yash2004)
        const uri = "mongodb+srv://Yash:yash2004@recipe.1hhzr.mongodb.net/?retryWrites=true&w=majority&appName=Recipe";

        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB Atlas Server');
    } catch (error) {
        console.log('Error connecting to database:', error);
    }
}

module.exports = connect;


// const mongoose = require('mongoose');
// const User = require('../model/User');  // Ensure correct User model path

// async function connect() {
//     try {
//         // Connect to local MongoDB
//         mongoose.connect('mongodb://localhost:27017/recipe')
//         .then(() => console.log('Connected to Local MongoDB'))
//         .catch((err) => console.error('Failed to connect to MongoDB', err));
//         console.log('Connected to Local MongoDB');

//     } catch (error) {
//         console.log('Error connecting to database:', error);
//     }
// }

// module.exports = connect;
