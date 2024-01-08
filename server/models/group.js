const mongoose = require('mongoose');

const groupeSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      trim: true,
      required: false,
      unique: true
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

// Method to find groups by user email
groupeSchema.statics.findByUserEmail = function (userEmail) {
  return this.find({ 'membres.userMail': userEmail });
};

const Group = mongoose.model('Group', groupeSchema);

module.exports = Group;
