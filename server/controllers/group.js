const Group = require("../models/group");


exports.createGroupe = async (req, res) => {
    console.log("CreateGroup Hit");
    try {
        const { nom, trajetUsuel, membres } = req.body;
        if (!nom) {
            return res.json({
                error: "Name is required",
            })
        }
        try {
            const nouveauGroupe = await new Group({
                nom,
                trajetUsuel,
                membres
            }).save();
        } catch (err) {
            console.log(err);
        }     
    } catch (error) {
        res.status(400).json({ error: error.message });
    };
    console.log('CreateGroup is registered')
};