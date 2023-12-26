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
