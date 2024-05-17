const userArgs = process.argv.slice(2);

const Category = require("./models/Category");
const Item = require("./models/Item");

const categories = [];
const items = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
    console.log("About to connect to MongoDB");
    await mongoose.connect(mongoDB);
    await createCategories();
    await createItems();
    console.log("Closing connection to MongoDB");
    mongoose.connection.close();
}

async function createCategories() {
    console.log("Adding Categories");

    await Promise.all([
        categoryCreate(0, "Adventure", "Games with a focus on  exploration and action"),
        categoryCreate(1, "Strategy", "Games that focus on tactical play"),
        categoryCreate(2, "Role-playing", "Games about being a character and making choices that change the story"),
    ]);
}

async function categoryCreate(index, name, description) {
    const categoryDetail = { name: name, description: description };

    const category = new Category(categoryDetail);

    await category.save();
    categories[index] = category;
    console.log(`Added category: ${name}`);
}

async function createItems() {
    console.log("Adding Items");

    await Promise.all([
        itemCreate(
            0,
            "The Legend of Zelda: Breath of the Wild",
            "The Legend of Zelda: Breath of the Wild is a 2017 action-adventure game developed and published by Nintendo for the Nintendo Switch and Wii U. Set at the end of the Zelda timeline, the player controls an amnesiac Link as he sets out to save Princess Zelda and prevent Calamity Ganon from destroying the world.",
            60,
            10,
            categories[0]
        ),
        itemCreate(
            0,
            "Tunic",
            "Tunic is a 2022 action-adventure game developed by Isometricorp Games and published by Finji. It is set in a ruined fantasy world, where the player controls an anthropomorphic fox on a journey to free a fox spirit trapped in a crystal.",
            40,
            5,
            categories[0]
        ),
        itemCreate(
            2,
            "The Witcher 3",
            "The Witcher 3: Wild Hunt is a 2015 action role-playing game developed and published by CD Projekt. It is the sequel to the 2011 game The Witcher 2: Assassins of Kings and the third game in The Witcher video game series, played in an open world with a third-person perspective.",
            40,
            20,
            categories[2]
        ),
    ]);
}

async function itemCreate(index, name, description, price, stock, category) {
    const itemDetail = { name: name, description: description, price: price, stock: stock, category: category };

    const item = new Item(itemDetail);

    await item.save();
    items[index] = item;
    console.log(`Added item: ${name}`);
}