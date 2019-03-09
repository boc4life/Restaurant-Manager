module.exports = function(sequelize, DataTypes) {
    var Location = sequelize.define("Location", {
        aisle   : DataTypes.STRING,
        section : DataTypes.STRING,
        shelf   : DataTypes.STRING,
        position: DataTypes.STRING,
        count   : {type: DataTypes.INTEGER, defaultValue: 0}
    });
  
    Location.associate = function(models) {
        // One Product can have multiple locations
        // Allow a location to have no associated Product
        Location.belongsTo(models.Product, {
            foreignKey: {
              allowNull: true
            }
          });
     };
  
    return Location;
  };
