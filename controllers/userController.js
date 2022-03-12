import UsrMdl from '../models/User.js'

class UserController {
    static getAllDoc = async (req, res) => {
        try {
            const result = await UsrMdl.find()
            res.send(result)
        } catch (error) {
            console.log(error)
        }
    }
}

export default UserController