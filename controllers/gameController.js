import GamMdl from '../models/Game.js'

class GameController {
    static getAllDoc = async (req, res) => {
        try {
            const result = await GamMdl.find()
            res.send(result)
        } catch (error) {
            console.log(error)
        }
    }

    static getSpecificGame = async (req, res) => {
        try {
            const result = await GamMdl.find({game_id: req.params.gameId})
            // Tu mozno nejaky 404 handling
            res.send(result)
        } catch (error) {
            console.log(error)
        }
    }
}

export default GameController
