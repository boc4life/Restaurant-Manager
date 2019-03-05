module.exports = function(sequelize, DataTypes) {
  var Order = sequelize.define("Order", {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [32],
      }
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    discount: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true,
      validate: {
        len: [64],
      }
    },
    subtotal: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
      validate: {
        len: [64],
      }
    },
    tax: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
      validate: {
        len: [64],
      }
    },
    tip: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true,
      validate: {
        len: [64],
      }
    },
    total_due: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
      validate: {
        len: [64],
      }
    },
    payment_type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [16],
      }
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        len: [255],
      }
    }
  });
  Order.associate = function(models) {
    Order.hasMany(models.Pizza, {as:"OrderPizzas"});
    Order.belongsTo(models.User)
  };
  return Order;
};