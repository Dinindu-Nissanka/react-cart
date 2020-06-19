module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      products: [
        {
          id: String,
          title: String,
          price: Number,
          inventory: Number,
        },
      ],
      status: String,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Order = mongoose.model("order", schema);
  return Order;
};
