import RevMdl from "../models/Review.js"

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
}

export default reviewController;
