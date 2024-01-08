const Group = require("../models/group");

exports.createGroupe = async (req, res) => {
  console.log("CreateGroup Hit", req.body);
  try {
    const { nom, trajetUsuel, membres } = req.body;
    console.log('req.body', req.body);

    // Check if membres is defined and not an empty array
    if (!membres || membres.length === 0) {
      throw new Error("Le champ 'membres' est requis.");
    }

    // Check for existing group with the same name
    const existingGroup = await Group.findOne({ nom });
    if (existingGroup) {
      throw new Error("Un groupe avec ce nom existe déjà.");
    }

    const nouveauGroupe = await new Group({
      nom,
      trajetUsuel,
      membres,
    }).save();
    console.log('nouveauGroupe', nouveauGroupe);
    res.status(201).json(nouveauGroupe);
  } catch (error) {
    console.error(error);
  
    // Check if the error is due to a duplicate key violation
    if (error.code === 11000) {
      return res.status(400).json({ error: "Un groupe avec ce nom existe déjà." });
    } else {
      return res.status(400).json({ error: error.message });
    }
  }
};


exports.searchGroup = async (req, res) => {
  console.log('Requête reçue :', req.body);
  try {
    const groupName = req.query.groupName;
    const foundGroups = await Group.find({ nom: groupName });
    res.json({ groups: foundGroups });
  } catch (error) {
    console.error('Erreur lors de la recherche de groupe :', error);
    res.status(500).json({ error: 'Erreur lors de la recherche de groupe' });
  }
};

exports.addMemberToGroup = async (req, res) => {
  try {
    const { groupName, memberEmail } = req.body;

    // Vérifier si le groupe existe
    const existingGroup = await Group.findOne({ nom: groupName });
    if (!existingGroup) {
      return res.status(404).json({ error: 'Groupe non trouvé' });
    }

    // Vérifier si le membre n'est pas déjà dans le groupe
    const isMemberExists = existingGroup.membres.some(member => member.userMail === memberEmail);
    if (isMemberExists) {
      return res.status(400).json({ error: 'Ce membre est déjà dans le groupe' });
    }

    // Ajouter le membre au groupe
    existingGroup.membres.push({ userMail: memberEmail });
    const updatedGroup = await existingGroup.save();

    res.json({ group: updatedGroup });
  } catch (error) {
    console.error('Erreur lors de l\'ajout de membre au groupe :', error);
    res.status(500).json({ error: 'Erreur lors de l\'ajout de membre au groupe' });
  }
};

exports.byUserEmail = async (req, res) => {
  try {
    const { userEmail } = req.query;

    if (!userEmail) {
      return res.status(400).json({ error: 'User email is required' });
    }

    const groups = await Group.findByUserEmail(userEmail);

    res.json({ groups });
  } catch (error) {
    console.error('Error fetching groups by user email:', error);
    res.status(500).json({ error: 'Error fetching groups by user email' });
  }
};
