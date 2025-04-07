import mongoose from 'mongoose';

const subscribersSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, trim: true },
}, { timestamps: true });

const subscribers = mongoose.model("subscribers", subscribersSchema)

export default subscribers