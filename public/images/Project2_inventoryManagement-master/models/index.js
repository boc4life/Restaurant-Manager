let fs = require("fs");
let path = require("path");
let Sequelize = require("sequelize");
let basename = path.basename(module.filename);  // basename of this file
let env = process.env.NODE_ENV || "development";
let config = require(__dirname + "/../config/config.js")[env];
let db = {};
let sequelize = null;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Import each of the <model>.js files in this ('models') directory
// Import and add each to 'db'
fs
  .readdirSync(__dirname)   // Get all files in this directory
  .filter(function(file) {  // filter for .js files, skipping this (basename) .js file
    return (file.indexOf(".") !== 0) && (file !== basename) && (file.slice(-3) === ".js");
  })
  .forEach(function(file) { // for each .js file, call "import" method
    let model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model; // Then add it to 'db'
  });

// Call the 'associate' method for each model
Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;