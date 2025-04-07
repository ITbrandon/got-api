import subscribers from "../models/subscribers.model.js"

export const subscribeToNewsLetter = async (req, res) => {
    try {
        const { email } = req.body

        const existingSubscriber = await subscribers.findOne({ email })

        if (existingSubscriber) {
            return res.status(404).json({ message: "Email Already Subscribed" });
        }

        const newSubscriber = new subscribers({ email });
        await newSubscriber.save();

        res.status(201).json({ message: "Subscribed Successfully" });
    }

    catch(error)
    {
        res.status(500).json({ message: error.message });
    }
}