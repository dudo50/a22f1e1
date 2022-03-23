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
    static handleLogin = async (req, res) => {
        try {
            if( await UsrMdl.updateOne({ $and: [ {username: req.params.username}, {password : req.params.password }]}, {status:"ACTIVE"}))
            //TU PRIDAT POTOM CO MA SPRAVIT FRONT END KED JE USER LOGNUTY
            res.send("OK")
        }
        catch (error) {
            console.log(error)
        }
    }
    static handleRegister = async (req, res) => {
        try {
            //QUERY FOR HIGHEST USER ID


            if( await UsrMdl.create({ username: req.params.username, password : req.params.password, email:req.params.email, user_id: "44"}))
            //PO REGISTRACII HNED LOGNEME
            await UsrMdl.updateOne({ $and: [ {username: req.params.username}, {password : req.params.password }]}, {status:"ACTIVE"})
            
            //TU PRIDAT POTOM CO MA SPRAVIT FRONT END KED JE USER REGNUTY
            res.send("OK")
        }
        catch (error) {
            console.log(error)
        }
    }

    static handleSignout = async (req, res) => {
        try {
            if( await UsrMdl.updateOne({ $and: [ {username: req.params.username}, {password : req.params.password }]}, {status:"INACTIVE"}))
            //TU PRIDAT POTOM CO MA SPRAVIT FRONT END KED JE USER LOGNUTY
            res.send("OK")
        }
        catch (error) {
            console.log(error)
        }
    }
}

export default UserController