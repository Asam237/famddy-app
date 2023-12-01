module.exports = {
  base: {
    created_at: { type: Number, default: Date.now() },
    updated_at: { type: Number, default: Date.now() },
  },
  baseSelect: "created_at updated_at ",
};
