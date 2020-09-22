const jwt = require('jsonwebtoken')
const types = require('../utils/types')

exports.userAuthChecker = (req, res, next) => {
    if(req.cookies['queens_auth_token']) {
        try {
            const decoded = jwt.verify(req.cookies['queens_auth_token'],'PLEASE_CHANGE_IT_LATER')
            if(decoded.type === types.USER) {
                req.userData = decoded
                next()
            }
            else {
                res.status(401).json({success : false, msg : 'Auth Failed!'})
            }
        } catch (error) {
            res.status(401).json({success : false, msg : 'Auth Failed!'})
        }   
    }
    else {
        res.status(401).json({success : false, msg : 'Auth Failed!'})
    }
}

exports.marketingAuthChecker = (req, res, next) => {
    if(req.cookies['queens_auth_token']) {
        try {
            const decoded = jwt.verify(req.cookies['queens_auth_token'],'PLEASE_CHANGE_IT_LATER')
            if(decoded.type === types.MARKETING) {
                req.userData = decoded
                next()
            }
            else {
                res.status(401).json({success : false, msg : 'Auth Failed!'})
            }
        } catch (error) {
            res.status(401).json({success : false, msg : 'Auth Failed!'})
        }   
    }
    else {
        res.status(401).json({success : false, msg : 'Auth Failed!'})
    }
}

exports.managerAuthChecker = (req, res, next) => {
    if(req.cookies['queens_auth_token']) {
        try {
            const decoded = jwt.verify(req.cookies['queens_auth_token'],'PLEASE_CHANGE_IT_LATER')
            if(decoded.type === types.MANAGER) {
                req.userData = decoded
                next()
            }
            else {
                res.status(401).json({success : false, msg : 'Auth Failed!'})
            }
        } catch (error) {
            res.status(401).json({success : false, msg : 'Auth Failed!'})
        }   
    }
    else {
        res.status(401).json({success : false, msg : 'Auth Failed!'})
    }
}

exports.authNeeded = (req, res, next) => {
    if(req.cookies['queens_auth_token']) {
        try {
            const decoded = jwt.verify(req.cookies['queens_auth_token'],'PLEASE_CHANGE_IT_LATER')
            req.userData = decoded
            next()
        } catch (error) {
            res.status(401).json({success : false, msg : 'Auth Failed!'})
        }   
    }
    else {
        res.status(401).json({success : false, msg : 'Auth Failed!'})
    }
}