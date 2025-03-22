import characters from "../models/characters.model.js";

export const getCharacters = async (req, res) => {
    try {
      const allCharacters = await characters.find({});
      res.status(200).json(allCharacters);
    }
    catch(error) {
      res.status(500).json({message: error.message})
    }
  }
  
  export const getCharacter = async (req, res) => {
    try {
      const { id } = req.params;
      const character = await characters.findById(id);
  
      if(!character)
      {
        return res.status(404).json({message: "Post Not Found"})
      }
  
      res.status(200).json(character);
    } 
    catch (error) {
      res.status(500).json({ message: error.message });
    }
  }