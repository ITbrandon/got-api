import mongoose from 'mongoose';

const housesSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String },
}, { timestamps: true });

const houses = mongoose.model("houses", housesSchema)

export default houses