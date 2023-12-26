const mongoose = require('mongoose');

const groupeSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      trim: true,
      required: false,
    },
    trajetUsuel: {
       type: String,
       trim: true,
       required: false,
     },
    membres: [{
      userMail: {
        type: String,
        trim: true,
        required: true,
      },
    }],
    resetCode: {
      type: String, // Ajoutez le type approprié ici
    },
  },
  { timestamps: true }
);

const Group = mongoose.model('Group', groupeSchema);

module.exports = Group;
