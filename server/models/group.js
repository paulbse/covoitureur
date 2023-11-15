const mongoose = require('mongoose');

const groupeSchema = new mongoose.Schema({
  nom: String,
  trajetUsuel: { type: mongoose.Schema.Types.ObjectId, ref: 'Id Trajet Usuel' },
  membres: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Id Utilisateur' }],
  // ... autres propriétés du groupe
});

const Group = mongoose.model('Groupe', groupeSchema);

module.exports = Group;
