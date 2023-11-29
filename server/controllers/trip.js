const Trip = require("../models/trip");


exports.createTrip = async (req, res) => {
    console.log("Create Trip Hit", req.body);
    try {
        const { date, conducteur, group, passagers } = req.body;
        
        try {
            const nouveauGroupe = await new Trip({
                date,
                conducteur,
                group,
                passagers
            }).save();
            
        } catch (err) {
            console.log(err);
        }     
    } catch (error) {
        res.status(400).json({ error: error.message });
    };
    
};