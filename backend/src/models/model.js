const preSave = function () {
    this.updated_at = Date.now();
};

const removeDeletedAt = function (next) {
    this.where('deleted_at').equals(null);
    next();
};

const sortByCreatedAt = function (next) {
    this.sort({'created_at': -1});
    next();
};

module.exports = {
    /**
     * @swagger
     * components:
     *     schemas:
     *         Model:
     *             type: object
     *             properties:
     *                 created_at:
     *                     type: number
     *                 updated_at:
     *                     type: number
     *                 deleted_at:
     *                     type: number
     */
    base: {
        created_at: {type: Number, default: Date.now()},
        updated_at: {type: Number, default: Date.now()},
        deleted_at: {type: Number},
    },
    baseSelect: "created_at updated_at ",
    withMiddlewares : function (model) {
        model.methods.setDeleted = function () {
            this.deleted_at = Date.now();
            return this.save();
        };
        return model
            .pre('save', preSave)
            .pre('aggregate', removeDeletedAt)
            .pre('count', removeDeletedAt)
            .pre('countDocuments', removeDeletedAt)
            .pre('updateMany', removeDeletedAt)
            .pre('updateOne', removeDeletedAt)
            .pre('find', removeDeletedAt)
            .pre('findOne', removeDeletedAt)
            .pre('find', sortByCreatedAt)
            .pre('aggregate', sortByCreatedAt);
    }
};