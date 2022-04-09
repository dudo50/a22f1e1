const UsrMdl = require ('../models/User.js')
var fs = require('fs');

class UserController {
    static getAllDoc = async (req, res) => {
        try {
            const result = await UsrMdl.find()
            res.send(result)
        } catch (error) {
            console.log(error)
        }
    }

    static getUserDetails = async (req,res) => {
        try {
            const query_result = await UsrMdl.find({ $and: [ {username: req.params.username}, {password : req.params.password }]})
            const username = query_result[0]['username'];
            res.send(username)
        }
        catch (error) {
            console.log(error)
        }
    }



    static handleLogin = async (req, res) => {
        try {
            //JE USER LOGNUTY?
            const query = await UsrMdl.find({username: req.params.username, password: req.params.password })
            if(query.length != 0)
                {
                const status = query[0]['status'];
                const id = query[0]["user_id"]
                const strId = id.toString();
                if(status == "INACTIVE"){
                    const response = await UsrMdl.updateOne({username: req.params.username, password : req.params.password }, {status:"ACTIVE"})
                    //TU PRIDAT POTOM CO MA SPRAVIT FRONT END KED JE USER LOGNUTY
                    res.send(strId)
                }    
                else
                    res.send("0")
            }
            else{
                res.send("0")
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    static handleRegister = async (req, res) => {
        try {
            //EXISTUJE USER?
            const query = await UsrMdl.find({$or: [{username: req.body.username}, {email: req.body.email }]})
            console.log(query)
            if(query.length > 0){
                res.send("0")
            }
            else{

            //QUERY FOR HIGHEST USER ID
            var nove_id=1
            const query_result = await UsrMdl.find().sort({'user_id': -1}).select('user_id').limit(1) 
            if(query_result.length != 0)  
            {// zored tabulku podla user_id, vrat iba 1 prvok
                nove_id = String(Number(query_result[0]['user_id']) + 1) 
            }   // Prehod hodnotu na cislo, +1, preved naspat na string

            await UsrMdl.create({ username: req.body.username, password : req.body.password, email:req.body.email, user_id: nove_id})
            //PO REGISTRACII HNED LOGNEME
            await UsrMdl.updateOne({ $and: [ {username: req.body.username}, {password : req.body.password }]}, {status:"ACTIVE"})
            
            //TU PRIDAT POTOM CO MA SPRAVIT FRONT END KED JE USER REGNUTY
            const strId = nove_id.toString();
            res.send(strId)
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    static handleSignout = async (req, res) => {
        try {
            //JE USER PRIHLASENY? 
            const query = await UsrMdl.find({username: req.params.username, password: req.params.password })
            const status = query[0]['status'];
            if(status == "ACTIVE"){

                if( await UsrMdl.updateOne({ $and: [ {username: req.params.username}, {password : req.params.password }]}, {status:"INACTIVE"}))
                //TU PRIDAT POTOM CO MA SPRAVIT FRONT END KED JE USER LOGNUTY
                res.send("User signed out correctly.")
            }
            else
                res.send("User is not logged in!")
        }
        catch (error) {
            console.log(error)
        }
    }
    static getById = async (req, res) => {
        console.log("Getting user by ID " + String(req.params.userId));
        try {
            const query_result = await UsrMdl.find({user_id: req.params.userId});
            res.send(query_result);
        }
        catch (error) {
            console.log(error)
        }
    }
    static updateData = async (req, res) => {
        console.log("Trying to update data");
        try {
            const query_result = await UsrMdl.find({user_id: req.params.userId});
            const old_password = query_result[0]['password'];
            if (old_password == req.params.oldPassword) {
                // Is this okay for PUT method?
                console.log("Password OK, updating profile")
                await UsrMdl.updateOne({user_id: req.params.userId}, {
                    username:req.params.username,
                    password:req.params.password,
                    email:req.params.email,
                    //profilePicture:(req.params.profilePicture).replaceAll('%2F', '/')
                });
                res.send("Profile updated!")
            }
            else {
                res.send("Incorrect password!");
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    static updatePhoto = async (req, res) => {
        try {
                const query = await UsrMdl.find({$and: [{user_id: req.params.userId}, {password: req.params.password }]})
                if(query.length > 0){
                    const query = await UsrMdl.find({user_id: req.params.userId, password: req.params.password })
                    const status = query[0]['status'];
                    if(status == "ACTIVE"){
                        //get file route
                        //get route to db
                        const queryy = await UsrMdl.updateOne({$and: [{user_id: req.params.userId}, {password: req.params.password }]}, {profilePicture: req.file.path})
                        console.log(queryy)
                        res.send("File uploaded")
                    }
                    else
                    {
                        //vymaz file
                        fs.unlinkSync(req.file.path)
                        res.send("User is not logged in!")
                    }
                }
                else{

                    //vymaz file
                    fs.unlinkSync(req.file.path)
                    res.send("User does not exist!")
                }
            }
        
        catch (error) {
            console.log(error)
        }
    }



}


module.exports = UserController;