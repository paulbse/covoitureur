const Group = require("../models/group");

exports.createGroupe = async (req, res) => {
  console.log("CreateGroup Hit", req.body);
  try {
    const { nom, trajetUsuel, membres } = req.body;
    console.log('req.body', req.body);

    // Vérifiez si membres est défini et n'est pas un tableau vide
    if (!membres || membres.length === 0) {
      throw new Error("Le champ 'membres' est requis.");
    }

    const nouveauGroupe = await new Group({
      nom,
      trajetUsuel,
      membres,
    }).save();
    console.log('nouveauGroupe', nouveauGroupe);
    res.status(201).json(nouveauGroupe);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

exports.searchGroup = async (req, res) => {
  console.log('Requête reçue :', req.body);
  try {
    // Logique de recherche ici
    const groupName = req.query.groupName; // ou req.params.groupName selon le type de recherche
    console.log('groupName',groupName)
    // Effectuez la recherche dans la base de données ou autre source de données
    const foundGroups = await Group.find({ nom: groupName });
    console.log('foundGroups',foundGroups)
    res.json({ groups: foundGroups });
  } catch (error) {
    console.error('Erreur lors de la recherche de groupe :', error);
    res.status(500).json({ error: 'Erreur lors de la recherche de groupe' });
  }
};
