module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      phone_number: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true
      },
      suite: {
        type: DataTypes.STRING,
        allowNull: true
      },
      city: {
        type: DataTypes.STRING,
        allowNull: true
      },
      state: {
        type: DataTypes.STRING,
        allowNull: true
      },
      zip: {
        type: DataTypes.STRING,
        allowNull: true
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      premium: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: 0,
      }
    }, {underscored: true});
    User.associate = function(models) {
      User.hasMany(models.Order)
    };
    return User;
  }