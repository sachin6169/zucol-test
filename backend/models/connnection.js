const mongoose = require('mongoose');


(async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {});
        console.log("mongodb connected")
    } catch (err) {
        console.log('error: ' + err);
        process.exit(1);
    }
})();
require('./blog');
