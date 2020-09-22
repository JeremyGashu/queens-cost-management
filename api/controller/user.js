const Auth = require('../models/user_auth')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// @Purpose = List all users
// @Previlage = Manager
// @Required fields =  No
// @Optional params = No
// @ Success status code = 200
// @ Faillure Status code = 404
// @Request = GET
exports.users_all = (req, res) => {
    Auth.find()
        .exec()
        .then(result => {
            res.status(200).json({
                count : result.length,
                users : result
            })
        }).
        catch(err => {
            res.status(500).json({
                error : true,
                msg : 'Some internal server error'
            })
        })
}

// @Purpose = Creating Admin
// @Previlage = Superadmin
// @Required fields =  phoneNo, password
// @Optional params = superAdmin
// @ Success status code = 201
// @ Faillure Status code = 400
// @Request = POST
exports.create_user = (req, res) => {

    const {username, password, type} = req.body
    if(username && password) {
        Auth.find({username}).exec()
        .then(users => {
            if(users.length >= 1) {
                res.status(400).json({error :true , msg : 'username number already registered'})
            }
            else{
                if(password.length < 8) {
                    res.status(400).json({error : true, msg : 'Password should be at least 8 characters'})
                }
                else {
                    bcrypt.hash(password,10,(err, hashed) => {
                        if(err) {
                            res.status(500).json({error : true, msg : 'Internal server error endountered'})
                        }
                        else {
                            let newAuth = new Auth({
                                _id : new mongoose.Types.ObjectId(),
                                username,
                                password : hashed,
                            })
                            if(type) {
                                newAuth.authType = type
                            }
                            newAuth.save().then(() => {
                                res.status(201).json({msg:'Created!',success : true})
                            })
                        }
                    })
                }
            }
        }).catch(err => {
            console.log(err)
            res.status(500).json({error : true, msg : 'Some intername error happened.'})
        })        
    }
    else {
        res.status(400).json({error :true, msg : 'username and password should be provided'})
    }
}

// @Purpose = Authenticate the user
// @Previlage = No
// @Required fields =  username, password
// @Optional params = No
// @ Success status code = 200
// @ Faillure Status code = 400
// @Request = POST
exports.login_user = (req, res) => {
    const {username, password} = req.body
    if(username && password) {
        Auth.find({username}).exec()
            .then(users => {
                if(users.length > 0) {
                    bcrypt.compare(password,users[0].password,(err, result) => {
                        if(err) {
                            res.status(401).json({error : true, msg : 'Auth Failed!', success:false})
                        }
                        if(result) {
                            let token = jwt.sign({
                                username : users[0].username,
                                type : users[0].authType
                            }, 'PLEASE_CHANGE_IT_LATER')
                            //instead of passing the token as a response, just put it in cookie
                            res.cookie('queens_auth_token',token)
                            res.cookie('queens_user_type', users[0].authType)
                            res.status(200).json({success : true, user:users[0], token})
                        }
                        else {
                            res.status(401).json({error : true, msg : 'Auth Failed!', success:false})
                        }
                    })
                }
                else {
                    res.status(401).json({error : true, msg : 'Auth Failed!', success:false})
                }
            })
            .catch(err => {
                res.status(401).json({error : true, msg : 'Auth Failed!', success:false})
            })
    }
    else {
        res.status(400).json({error :true, msg : 'username and password are required fields'})
    }
}

// @Purpose = Logout the user
// @Previlage = No
// @Required fields =  No
// @Optional params = No
// @ Success status code = 200
// @Request = GET
exports.logout_user = (req, res) => {
    res.clearCookie('queens_auth_token')
    res.status(200).json({
        success : true,
        error : false
    })
}