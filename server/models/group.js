const mongoose = require('mongoose');

const groupeSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      trim: true,
      required: true,
    },
    trajetUsuel: {
       type: String,
       trim: true,
       required: false,
     },
    membres: {
      type: Array, 
      ref: 'Id Utilisateur',
      trim: true,
      required: true,
      unique: true,
    },
    resetCode: "",
  },
  { timestamps: true }
);

const Group = mongoose.model('Group', groupeSchema);

module.exports = Group;