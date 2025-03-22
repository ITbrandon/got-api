import mongoose from 'mongoose';

const characterSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    fullName: { type: String, required: true },
    title: { type: String },
    family: { type: String },
    image: { type: String },
    description: { type: String }
}, { timestamps: true });

const characters = mongoose.model("characters", characterSchema)

export default characters