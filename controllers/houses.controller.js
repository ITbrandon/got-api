import houses from "../models/houses.model.js";

export const getHouses = async (req, res) => {
    try {
      const allHouses = await houses.find({});
      res.status(200).json(allHouses);
    }
    catch(error) {
      res.status(500).json({message: error.message})
    }
  }
  
  export const gethouse = async (req, res) => {
    try {
      const { id } = req.params;
      const house = await houses.findById(id);
  
      if(!house)
      {
        return res.status(404).json({message: "House Not Found"})
      }
  
      res.status(200).json(house);
    } 
    catch (error) {
      res.status(500).json({ message: error.message });
    }
  }