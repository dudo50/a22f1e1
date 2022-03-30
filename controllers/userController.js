const UsrMdl = require ('../models/User.js')


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
            const status = query[0]['status'];
            console.log(query)
            if(status == "INACTIVE"){
                await UsrMdl.updateOne({username: req.params.username, password : req.params.password }, {status:"ACTIVE"})
                //TU PRIDAT POTOM CO MA SPRAVIT FRONT END KED JE USER LOGNUTY
                res.send("User successfuly logged in")
            }    
            else
                res.send("User could not be signed in")
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
                res.send("Details already exists!")
            }
            else{

            //QUERY FOR HIGHEST USER ID
            var nove_id=1
            const query_result = await UsrMdl.find().sort({'user_id': -1}).select('user_id').limit(1) 
            if(query_result.length != 0)  
            {// zored tabulku podla user_id, vrat iba 1 prvok
                nove_id = String(Number(query_result[0]['user_id']) + 1) 
            }   // Prehod hodnotu na cislo, +1, preved naspat na string

            if( await UsrMdl.create({ username: req.body.username, password : req.body.password, email:req.body.email, user_id: nove_id}))
            //PO REGISTRACII HNED LOGNEME
            await UsrMdl.updateOne({ $and: [ {username: req.body.username}, {password : req.body.password }]}, {status:"ACTIVE"})
            
            //TU PRIDAT POTOM CO MA SPRAVIT FRONT END KED JE USER REGNUTY
            res.send("User registered and logged in successfuly.")
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
            //kontrola pw
             const userid = req.params._id;
            
                if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
            
                const path = req.file.path.replace(/\\/g, "/")
            
                await User.update({user_id: userid}, {profilePicture: path} );
                res.json("OK");
            }
            //const query = await UsrMdl.find({ $and: [ {username: req.params.username}, {password : req.params.password }]})
            //if(query.length!=0){
            /*var form = new IncomingForm.IncomingForm()
            form.uploadDir = 'uploads'
            form.parse(req, function(err, fields, files) {
              if (err) {
                console.log('some error', err)
              } else if (!files.file) {
                console.log('no file received')
              } else {
                var file = files.file
                console.log('saved file to', file.path)
                console.log('original name', file.name)
                console.log('type', file.type)
                console.log('size', file.size)
                }
            })*/
            //}
            //else{
            //    res.send("Bad user!")
            //}
        catch (error) {
            console.log(error)
        }
    }



}


module.exports = UserController;