import RevMdl from "../models/Review.js"
import UsrMdl from "../models/User.js"
import GamMdl from "../models/Game.js"

class reviewController {
    static getUserGameReview = async (req, res) => {
        try {
            const result = await RevMdl.find({'user': req.params.userId, 'game': req.params.gameId})
            res.send(result)
        }
        catch (error) {
            console.log(error)
        }
    }



static createReview = async (req, res) => {
    try {
        const query = await RevMdl.find({ $and: [ {user: req.params.userId}, {game : req.params.gameId }]})
        if(query.length==0){
            const query_passwd = await UsrMdl.find({ $and: [ {user_id: req.params.userId}, {password : req.params.password }]})
            if(query_passwd.length != 0){
                const query_result = await RevMdl.find().sort({'review_id': -1}).select('review_id').limit(1)   // zored tabulku podla user_id, vrat iba 1 prvok
                const nove_id = String(Number(query_result[0]['review_id']) + 1);     // Prehod hodnotu na cislo, +1, preved naspat na string
                const now = new Date();
                //overime si ci user existuje
                await RevMdl.create({ review_id: nove_id, game : req.params.gameId, user:req.params.userId, stars: req.params.stars, text: req.params.text, date: now.getDate() + "." + (now.getMonth() + 1) + "." + now.getFullYear()})
                await GamMdl.updateOne({game_id: req.params.gameId},{$push: { reviews: nove_id }})
                await UsrMdl.updateOne({user_id: req.params.userId},{$push: { reviews: nove_id }})
                res.send("ok")
            }
            else
            res.send("Bad password!")
        }
        else
        res.send("Not ok!")
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
            const query_passwd = await UsrMdl.find({ $and: [ {user_id: req.params.userId}, {password : req.params.password }]})
            if(query_passwd.length != 0){
                //overime si ci user existuje
                const now = new Date();
                await RevMdl.updateOne({review_id: queryId },{stars: req.params.stars, text: req.params.text, date: now.getDate() + "." + (now.getMonth() + 1) + "." + now.getFullYear()})
                res.send("ok")
            }
            else
            res.send("Bad password!")
        }
        else
        res.send("Not ok!")
    }
    catch (error) {
        console.log(error)
    }
}

static deleteReview = async (req, res) => {
    try {
        const query = await RevMdl.find({ $and: [ {user: req.params.userId}, {game : req.params.gameId }]})
        if(query.length!=0){
            const query_passwd = await UsrMdl.find({ $and: [ {user_id: req.params.userId}, {password : req.params.password }]})
            if(query_passwd.length != 0){
                const idecka = query[0]['review_id'];
                await RevMdl.remove({review_id: idecka})
                await GamMdl.updateOne({game_id: req.params.gameId},{$pull: { reviews: idecka }})
                await UsrMdl.updateOne({user_id: req.params.userId},{$pull: { reviews: idecka }})
                res.send("ok")
            }
            else
            res.send("Bad password!")
        }
        else
        res.send("Not ok!")
    }
    catch (error) {
        console.log(error)
    }
}

}

export default reviewController;
