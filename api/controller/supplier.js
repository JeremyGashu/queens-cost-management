const Supplier = require('../models/supplier')
const mongoose = require('mongoose')

// @Previlage = user
// @Required fields =  No
// @Optional params = No
// @ Success status code = 200
// @ Faillure Status code = 404
// @Request = GET
exports.suppliers_all = (req, res) => {
    Supplier.find()
        .exec()
        .then(result => {
            res.status(200).json({
                count : result.length,
                suppliers : result
            })
        }).
        catch(err => {
            res.status(404).json({error : true, msg : err})
        })
}

// @Purpose = Get single supplier using id
// @Previlage = user
// @Required fields =  review_id
// @Optional params = No
// @ Success status code = 200
// @ Faillure Status code = 404
// @Request = GET
exports.supplier_by_id = (req, res) => {
    let id = req.params.supplier_id
    Supplier.findById(id).
        exec().
        then(result => {
            if(result) {
                res.status(200).json(result)
            }
            else {res.status(404).json({error : true, msg : 'No Supplier Found with this ID.'})}
            
        }).
        catch(err => {
            res.status(404).json({error : true, msg : 'No Supplier Found with this ID.'})
        })
}

// @Purpose = Creating Supplier
// @Previlage = No
// @Required fields =  name, supplierId
// @Optional params = No
// @ Success status code = 201
// @ Faillure Status code = 400
// @Request = POST
exports.create_supplier = (req, res) => {
    const {name, supplierId} = req.body
    if(name && supplierId) {
        let newSupplier = new Supplier({
            _id : new mongoose.Types.ObjectId(),
            name,
            supplierId
        })
        newSupplier.save().then(() => {
            res.status(201).json({msg:'Created!',review : newSupplier})
        })
    }
    else {
        res.status(400).json({error : true, msg : 'Name and supplierID should be provided'})
    }
}

// @Purpose = Delete single Supplier
// @Previlage = User
// @Required fields =  supplierId
// @Optional params = No
// @ Success status code = 200
// @ Faillure Status code = 400
// @Request = DELETE
exports.delete_review = (req, res) => {
    let id = req.params.supplier_id
    try {
       Supplier.deleteOne({_id : mongoose.Types.ObjectId(id)}).exec().
       then((val => {
           res.status(200).json({msg : 'Deleted!', val})
       }))
    } catch (error) {
        res.status(400).json({error : true, msg : 'No Supplier found with this ID'})
    }
}

// @Purpose = Update Supplier
// @Previlage = User
// @Required fields =  name
// @Optional params = No
// @ Success status code = 200
// @ Faillure Status code = 400, 404
// @Request = PATCH
exports.update_supplier_name = (req, res) => {
    const {name} = req.body
    let id = req.params.supplier_id
    if(name) {
        try {
            Supplier.updateOne({_id : mongoose.Types.ObjectId(id)},{name}).exec().
            then((val => {
                res.status(200).json({msg : 'Updated! ', val})
            }))
         } catch (error) {
             res.status(400).json({error : true, msg :'No Supplier found with this ID'})
         }
         } 
    else {
        res.status(400).json({error : true, msg : 'name Should Be Provided'})
    }
}

// @Purpose = Handling error
// @Previlage = No
// @Required fields =  No
// @Optional params = No
// @ status code = 404
// @Request = No
exports.error_handler = (req, res) => {
    res.status(404).json({
        error : 'Page Not Found!'
    })
}