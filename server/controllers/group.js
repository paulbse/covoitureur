const Group = require("../models/group");


exports.createGroupe = async (req, res) => {
    console.log("CreateGroup Hit", req.body);
    try {
        const { nom, trajetUsuel, membres } = req.body;
        
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
    
};