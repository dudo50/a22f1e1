const express = require ('express')
const GamMdl = require ('../models/Game.js')

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

    static createGame = async (req, res) => {
        try {

            //pridame hru
            var nove_id=1
            const query_result = await GamMdl.find().sort({'game_id': -1}).select('game_id').limit(1) 
            if(query_result.length != 0)  
            {// zored tabulku podla user_id, vrat iba 1 prvok
             nove_id = String(Number(query_result[0]['game_id']) + 1) 
            }   // Prehod hodnotu na cislo, +1, preved naspat na string
            const result = await GamMdl.create({ game_id: nove_id,name: req.body.name, picture: req.body.picture, developer: req.body.developer, description: req.body.description, released: req.body.released  })
            // Tu mozno nejaky 404 handling + ESTE PRIDAT AJ RECENZIE NATIAHNUT
            res.send(result)
        } catch (error) {
            console.log(error)
            res.send("Game was not able to be created!")
        }
    }

    static updateTag = async (req, res) => {
        try {
            const opts = { runValidators: true };
            await GamMdl.updateOne({game_id: req.params.game_id},{ $push: { tags: req.params.tag }}, opts)
            // Tu mozno nejaky 404 handling + ESTE PRIDAT AJ RECENZIE NATIAHNUT
            res.send("Tag added successfully")
        } catch (error) {
            res.send("Tag is not allowed!")
            console.log(error)
        }
    }

    static updateLink = async (req, res) => {
        try {
            await GamMdl.updateOne({game_id: req.params.game_id},{link: req.params.link})
            // Tu mozno nejaky 404 handling + ESTE PRIDAT AJ RECENZIE NATIAHNUT
            res.send("Link added successfuly")
        } catch (error) {
            console.log(error)
        }
    }

    static getGamesByName = async (req, res) => {
        //Cislo stranky a pocet na stranku

        try {
            const result = await GamMdl.find({name: {$regex: req.params.searchText, $options: 'i'}}, 
            ['game_id', 'name', 'picture' , 'developer', 'description', 'released', 'link','tags', 'reviews'])
            // Tu mozno nejaky 404 handling
            res.send(result)
        } catch (error) {
            console.log(error)
        }
    }
    static updateGamePhoto = async (req, res) => {
        try {
                const query = await GamMdl.find({game_id: req.params.gameId})
                console.log(query)
                if(query.length > 0){
                        //get file route
                        //get route to db
                        const queryy = await GamMdl.updateOne({game_id: req.params.gameId}, {picture: req.file.originalname})
                        console.log(queryy)
                        res.send("1")
                    }
                    else
                    {
                        //vymaz file
                        fs.unlinkSync(req.file.path)
                        res.send("0")
                    }
                }
        catch (error) {
            console.log(error)
        }
    }
    static getGamePhoto = async (req, res) => {
        try {
            const query_result = await GamMdl.find({game_id: req.params.gameId});

            const path = query_result[0]["picture"]
            console.log(path)
            const newPath = __dirname + "/assets/gamePic/" + path
            console.log(newPath)
            res.sendFile(newPath)
        }
        catch (error) {
            console.log(error)
        }
    }
}


module.exports = GameController;
