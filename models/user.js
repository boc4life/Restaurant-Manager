module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      phone_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          len: [10]
        }
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [32],
        }
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [32],
        }
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [64],
        }
      },
      suite: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [10],
        }
      },
      city: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [32],
        }
      },
      state: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [2],
        }
      },
      zip: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [8],
        }
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
          len: [255],
        }
      },
      premium: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
      }
    }, {underscored: true});
    User.associate = function(models) {
      User.hasMany(models.Order)
    };
    return User;
  }