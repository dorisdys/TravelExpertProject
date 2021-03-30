const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://letsgo:letsgo2021@cluster0.6b9km.mongodb.net/letsgodb',{ useNewUrlParser: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});

require('./packages.model');