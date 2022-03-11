import mongoose from "mongoose";
const { Schema } = mongoose;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    gameLink: String,
    occupant: {
        type: Schema.Types.ObjectId,
        ref: 'Nation'
    },
    currentBattle: {
        type: Schema.Types.ObjectId,
        ref: 'Battle'
    }
}, { timestamps: true });

export default mongoose.model('Territory', schema);