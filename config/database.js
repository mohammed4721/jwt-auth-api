const mongoose = require('mongoose');

require('dotenv').config();

exports.connect = async () => {
    await mongoose.connect(process.env.MONGODB_URL, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
    })
    .then(() => { console.log("DB connected successfully") })
    .catch((err) => {
        console.log("DB connection issues");
        console.error(err.message);
        process.exit(1);
    })
}