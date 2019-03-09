module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      name: DataTypes.STRING,
      login: DataTypes.STRING,
      hash: DataTypes.STRING,
      salt: DataTypes.STRING
    });
  
    User.associate = function(models) {
        // Add relationships here
    };
  
    return User;
  };
