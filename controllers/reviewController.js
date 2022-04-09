const RevMdl = require ("../models/Review.js")
const UsrMdl = require ("../models/User.js")
const GamMdl = require  ("../models/Game.js")

class reviewController {
    static getUserGameReview = async (req, res) => {
        try {
            console.log(req.params.userId, req.params.gameId)
            const result = await RevMdl.find({user: parseInt(req.params.userId), game: parseInt(req.params.gameId)})
            res.send(result)
        }
        catch (error) {
            console.log(error)
        }
    }



static createReview = async (req, res) => {
    try {
        //check ci review neexistuje od daneho usera
        const query = await RevMdl.find({ $and: [ {user: req.body.user}, {game : req.body.game }]})
        if(query.length==0){
            //check ci user existuje a je lognuty
            const query_passwd = await UsrMdl.find({user_id: req.body.user})
            if(query_passwd.length != 0 && query_passwd[0]['status'] == "ACTIVE"){
                //check ci id hry existuje
                const query_game = await GamMdl.find({game_id: req.body.game})
                if(query_game.length != 0){
                    var nove_id=1
                    const query_result = await RevMdl.find().sort({'review_id': -1}).select('review_id').limit(1) 
                    if(query_result.length != 0)  
                    {// zored tabulku podla user_id, vrat iba 1 prvok
                     nove_id = String(Number(query_result[0]['review_id']) + 1) 
                    }   // Prehod hodnotu na cislo, +1, preved naspat na string
                    const now = new Date();
                    //overime si ci user existuje
                    await RevMdl.create({ review_id: nove_id, game : req.body.game, user:req.body.user, stars: req.body.stars, text: req.body.text, date: now.getDate() + "." + (now.getMonth() + 1) + "." + now.getFullYear()})
                    await GamMdl.updateOne({game_id: req.body.game},{$push: { reviews: nove_id }})
                    await UsrMdl.updateOne({user_id: req.body.user},{$push: { reviews: nove_id }})
                    res.send("1")
                }
                else
                    res.send("0")
            }
            else
            res.send("0")
        }
        else
        res.send("0")
    }
    catch (error) {
        console.log(error)
    }
}

static reviseReview = async (req, res) => {
    try {
        //EXISTUJE REVIEW?
        const query = await RevMdl.find({ $and: [ {user: req.params.userId}, {game : req.params.gameId }]})
        if(query.length!=0){
            const queryId = query[0]['review_id'];
            const query_passwd = await UsrMdl.find({user_id: req.params.userId})
            if(query_passwd.length != 0 && query_passwd[0]['status'] == "ACTIVE"){
                //overime si ci user existuje
                const now = new Date();
                console.log(queryId, req.params.stars, req.params.text)

                const data = await RevMdl.updateOne({review_id: queryId },{stars: req.params.stars, text: req.params.text, date: now.getDate() + "." + (now.getMonth() + 1) + "." + now.getFullYear()})
                res.send(data)
            }
            else
            res.send("0")
        }
        else
        res.send("0")
    }
    catch (error) {
        console.log(error)
    }
}

static deleteReview = async (req, res) => {
    try {

        //existuje review?
        const query = await RevMdl.find({ $and: [ {user: req.params.userId}, {game : req.params.gameId }]})
        if(query.length!=0){
            //existuje user a je lognuty?
            const query_passwd = await UsrMdl.find({user_id: req.params.userId})
            if(query_passwd.length != 0 && query_passwd[0]['status'] == "ACTIVE"){
                const idecka = query[0]['review_id'];
                await RevMdl.remove({review_id: idecka})
                await GamMdl.updateOne({game_id: req.params.gameId},{$pull: { reviews: idecka }})
                await UsrMdl.updateOne({user_id: req.params.userId},{$pull: { reviews: idecka }})
                res.send("1")
            }
            else
            res.send("0")
        }
        else
        res.send("0")
    }
    catch (error) {
        console.log(error)
    }
}

}


module.exports = reviewController;
