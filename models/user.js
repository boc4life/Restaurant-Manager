module.exports = function(sequelize, DataTypes) {
<<<<<<< HEAD
  var User = sequelize.define("User", {
    phone_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
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
      type: DataTypes.INTEGER,
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
  });
  User.associate = function(models) {
    User.hasMany(models.Order)
  };
  return User;
};
=======
    var User = sequelize.define("User", {
      phone_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
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
        type: DataTypes.INTEGER,
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
    });
    return User;
  };
  
>>>>>>> f9bb6a75165e9a4a12cfd806dc81163174419fe2
