import mongoose from "mongoose";
const { Schema } = mongoose;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
        min: 3,
        max: 3
    },
    score: Number,
    allies: [{
        type: Schema.Types.ObjectId,
        ref: 'Nation'
    }],
    enemies: [{
        type: Schema.Types.ObjectId,
        ref: 'Nation'
    }]
}, { timestamps: true });

schema.virtual('territories', {
    ref: 'Territory',
    localField: '_id',
    foreignField: 'occupant'
});

export default mongoose.model('Nation', schema);