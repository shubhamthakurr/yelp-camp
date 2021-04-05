const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '605c525dee5d2d40ac3f6e70',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio iusto, eveniet dolores at nisi voluptas animi vel incidunt mollitia quas officiis molestias eum. Accusamus voluptatibus repellat a omnis, reprehenderit sapiente!',
            price,
            images: [
                {
                  url: 'https://res.cloudinary.com/dylv2uez0/image/upload/v1617379561/YelpCamp/urkieh2r7nxlwgjjqvbg.jpg',
                  filename: 'YelpCamp/urkieh2r7nxlwgjjqvbg'
                },
                {
                  url: 'https://res.cloudinary.com/dylv2uez0/image/upload/v1617379561/YelpCamp/v9uhrlkr6ujbz4fjvcjl.jpg',
                  filename: 'YelpCamp/v9uhrlkr6ujbz4fjvcjl'
                }
              ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})