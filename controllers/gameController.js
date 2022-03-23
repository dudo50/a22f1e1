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
            // Tu mozno nejaky 404 handling + ESTE PRIDAT AJ RECENZIE NATIAHNUT
            res.send(result)
        } catch (error) {
            console.log(error)
        }
    }

    static getGamesByName = async (req, res) => {
        //Cislo stranky a pocet na stranku

        try {
            const result = await GamMdl.find({name: {$regex: req.params.searchText, $options: 'i'}}, 
            ['game_id', 'name', 'developer', 'description', 'published'], 
            {skip: Number(req.params.page) * Number(req.params.perPage), limit: Number(req.params.perPage)})
            // Tu mozno nejaky 404 handling
            res.send(result)
        } catch (error) {
            console.log(error)
        }
    }
}

export default GameController
