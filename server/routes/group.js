const express = require("express") ;
const router = express.Router();
const Group = require('../models/group');

// controllers
const {
  createGroupe,
} = require("../controllers/group");



router.post('/new_group', createGroupe);

// Rechercher un groupe par ID
router.get('/groups/:id', async (req, res) => {
    try {
        const group = await Group.findById(req.params.id).populate('membres');
        res.json(group);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Modifier un groupe par ID
router.patch('/groups/:id', async (req,res) => {
    try {
        const group = await Group.findById(req.params.id);
        if (req.body.nom) {
            group.name = req.body.name;
        }
        //ajouter modif users
        const groupeModifie = await group.save();
        res.json(groupeModifie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }  
});

module.exports = router;