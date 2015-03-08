

var Schemas = {};

Schemas.Schools = new SimpleSchema({
  user: {
    type: String,
    label: "Le nom de l'utilisateur",
    max: 20
  },
  nomSchool: {
    type: String,
    label: "Le nom de l'établissement",
    min: 2,
    max: 8,
    optional: true
  },
  rooms:{
    type: [Object],
    label: 'Les salles',
    optional: true
  },
  "rooms.$.nom":{
    type: String,
    label: "Le nom de la salle",
    min: 2,
    max: 8,
    optional: true
  },
  "rooms.$.taille.lignes":{
    type: Number,
    label:'Le nombre de lignes',
    min: 1,
    max: 9,
    optional: true
  },
  "rooms.$.taille.colonnes":{
    type: Number,
    label:'Le nombre de colonnes',
    min: 1,
    max: 9,
    optional: true
  },
  "rooms.$.positions":{
    type: [Number],
    label: "Le numéro d'une place",
    max: 99,
    min: 11,
    optional: true
  },
  selectedRoom:{
    type: String,
    label: "Le nom de la salle sélectionnée",
    max: 8,
    optional: true
  },
  selectedGroup:{
    type: String,
    label: "Le nom de la classe sélectionnée",
    max: 8,
    optional: true
  },
  groups:{
    type: [String],
    label: "Le nom de la classe",
    min: 3,
    max: 8,
    optional: true
  },
  students:{
    type: [Object],
    label: 'Les élèves',
    optional: true
  },
  "students.$.nom":{
    type: String,
    label: "Le nom de l'élève",
    min: 2,
    max: 15
  },
  "students.$.prenom":{
    type: String,
    label:"Le prénom de l'élève",
    min: 2,
    max: 15
  },
  "students.$.genre":{
    type: String,
    label:"Le genre de l'élève",
    min: 7,
    max: 8
  },
    "students.$.groups":{
    type: [String],
    label: "Le nom de la classe à laquelle appartient l'élève",
    max: 8
  }
});

Schools.attachSchema(Schemas.Schools);

