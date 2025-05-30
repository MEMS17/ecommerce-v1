const mongoose = require("mongoose");
const User = require("../models/users");
require("dotenv").config();

async function seedAdmin() {
    await mongoose.connect(process.env.MONGO_URI);

    const adminEmail = "admin@admin.com";
    const adminExists = await User.findOne({ email: adminEmail });

    if (adminExists) {
        console.log("Un administrateur existe déjà.");
    } else {
        const admin = new User({
            name: "Admin",
            email: adminEmail,
            password: "admin123", // Change ce mot de passe après le premier lancement !
            role: "admin"
        });
        await admin.save();
        console.log("Administrateur créé :", adminEmail, "/ mot de passe : admin123");
    }

    await mongoose.disconnect();
}

seedAdmin().catch(err => {
    console.error("Erreur lors du seed admin :", err);
    mongoose.disconnect();
});