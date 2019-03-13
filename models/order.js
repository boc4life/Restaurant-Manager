module.exports = function(sequelize, DataTypes) {
    var Order = sequelize.define("Order", {
      type: {
        type: DataTypes.STRING,
        allowNull: false
      },
      discount: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
      },
      subtotal: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
      },
      tax: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
      },
      tip: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
      },
      total_due: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
      },
      payment_type: {
        type: DataTypes.STRING,
        allowNull: false
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      pending: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
    }, {underscored: true});
    Order.associate = function(models) {
      Order.hasMany(models.Pizza);
      Order.belongsTo(models.User);
    };
    return Order;
};
