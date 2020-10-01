const mongoose = require('mongoose')
const Entry = require('../models/entry')
const types = require('../utils/types')

// @Purpose = List all entries
// @Previlage = No
// @Required fields =  No
// @Optional params = No
// @ Success status code = 200
// @ Faillure Status code = 404
// @Request = GET
exports.get_all_entries = (req, res) => {

    Entry.find()
    .populate('supplierId')
    .exec()
    .then(result => {
        res.status(200).json({
            count : result.length,
            entries : result
        })
    }).
    catch(err => {
        res.status(404).json({error : true, msg : err})
    }) 

    // const userType = req.userData.type
    // switch(userType) {
    //     case types.USER:
    //             Entry.find({
    //                 userChecked : false,
    //                 marketingManagerChecked : false,
    //                 generalManagerChecked : false
    //             })
    //             .populate('supplierId')
    //             .exec()
    //             .then(result => {
    //                 res.status(200).json({
    //                     count : result.length,
    //                     entries : result
    //                 })
    //             }).
    //             catch(err => {
    //                 res.status(404).json({error : true, msg : err})
    //             }) 
    //         //give entries uncheked by all users
    //         break;
    //     case types.MARKETING:
    //             Entry.find({
    //                 userChecked : true,
    //                 marketingManagerChecked : false,
    //                 generalManagerChecked : false
    //             })
    //             .populate('supplierId')
    //             .exec()
    //             .then(result => {
    //                 res.status(200).json({
    //                     count : result.length,
    //                     entries : result
    //                 })
    //             }).
    //             catch(err => {
    //                 res.status(404).json({error : true, msg : err})
    //             }) 
    //         break;
    //     case types.MANAGER:
    //             Entry.find({
    //                 userChecked : true,
    //                 marketingManagerChecked : true,
    //                 generalManagerChecked : false
    //             })
    //             .populate('supplierId')
    //             .exec()
    //             .then(result => {
    //                 res.status(200).json({
    //                     count : result.length,
    //                     entries : result
    //                 })
    //             }).
    //             catch(err => {
    //                 res.status(404).json({error : true, msg : err})
    //             })
    //     default:
    //             Entry.find()
    //             .populate('supplierId')
    //             .exec()
    //             .then(result => {
    //                 res.status(200).json({
    //                     count : result.length,
    //                     entries : result
    //                 })
    //             }).
    //             catch(err => {
    //                 res.status(404).json({error : true, msg : err})
    //             })
    // }

    // Entry.find()
    //     .populate('supplierId')
    //     .exec()
    //     .then(result => {
    //         res.status(200).json({
    //             count : result.length,
    //             entries : result
    //         })
    //     }).
    //     catch(err => {
    //         res.status(404).json({error : true, msg : err})
    //     })   
}

// @Purpose = Get single entry using id
// @Previlage = No
// @Required fields =  entry_id
// @Optional params = No
// @ Success status code = 200
// @ Faillure Status code = 404
// @Request = GET
exports.entries_by_id = (req, res) => {
    let id = req.params.entry_id
    Entry.findById(id)
        .populate('supplierId')
        .exec().
        then(item => {
            if (item) {
                res.status(200).json(item)
            } else {
                res.status(404).json({error : true, msg : 'No Entry Found with this ID.'})
            }
        }).
        catch(err => {
            res.status(404).json({error : true, msg : 'No Entry Found with this ID.'})
        })
}

// @Purpose = Creating Entry
// @Previlage = User
// @Required fields =  entries
// @Optional params = No
// @ Success status code = 201
// @ Faillure Status code = 400
// @Request = POST
exports.create_entry = (req, res) => {
    const {entries, supplier} = req.body
    console.log(entries)
    const supplierId = supplier ? new mongoose.Types.ObjectId(supplier) : new mongoose.Types.ObjectId('5f6aebaaee2db900171ee583')
    if(entries) {
        let newEntry = new Entry({
            _id : new mongoose.Types.ObjectId(),
            supplierId : supplierId,
            entries
        })
        if(req.file) {
            if(req.file.filename) {
                newEntry.imageName = req.file.filename
            }
        }
        newEntry.save().then(() => {
            res.status(201).json({msg:'Created!',entry : newEntry})
        })
    }
    else {
        res.status(400).json({error : true, msg : 'entries  Should Be Provided'})
    }
}

// @Purpose = Delete single Entry
// @Previlage = User
// @Required fields =  entry_id
// @Optional params = No
// @ Success status code = 200
// @ Faillure Status code = 400
// @Request = DELETE
exports.delete_entry = (req, res) => {
    let id = req.params.entry_id
    try {
       Entry.deleteOne({_id : mongoose.Types.ObjectId(id)}).exec().
       then((val => {
           res.status(200).json({msg : 'Deleted!', val})
       }))
    } catch (error) {
        res.status(400).json({error : true, msg : 'No Entry found with this ID'})
    }
}

// @Purpose = Checked by user
// @Previlage = User
// @Required fields =  name
// @Optional params = No
// @ Success status code = 200
// @ Faillure Status code = 400, 404
// @Request = PATCH
exports.entry_checked_by_user = (req, res) => {
    let id = req.params.entry_id
    try {
        Entry.findById({_id :mongoose.Types.ObjectId(id)}).exec().then(result => {
            if(result) {
                if(!result.userChecked) {
                    result.userChecked = true
                    result.save()
                    res.status(200).json({msg:'User checked!', result})
                }
                else{
                    res.status(200).json({msg:'Already approved!', result})
                }
            }
            else{
                res.status(400).json({error : true, msg : 'No Entry found with this ID'})
            }
        }).catch(err => res.status(400).json({error : true, msg : 'Invalid Format Encounterd.'}))
    } catch (error) {
        res.status(400).json({error : 'No Entry found with this ID'})
    }
}

// @Purpose = Checked by marketing staff
// @Previlage = Marketting manager
// @Required fields =  name
// @Optional params = No
// @ Success status code = 200
// @ Faillure Status code = 400, 404
// @Request = PATCH
exports.entry_checked_by_marketing_manager = (req, res) => {
    let id = req.params.entry_id
    try {
        Entry.findById({_id :mongoose.Types.ObjectId(id)}).exec().then(result => {
            if(result) {
                if(!result.marketingManagerChecked) {
                    result.marketingManagerChecked = true
                    result.save()
                    res.status(200).json({msg:'User checked!', result})
                }
                else{
                    res.status(200).json({msg:'Already approved!', result})
                }
            }
            else{
                res.status(400).json({error : true, msg : 'No Entry found with this ID'})
            }
        }).catch(err => res.status(400).json({error : true, msg : 'Invalid Format Encounterd.'}))
    } catch (error) {
        res.status(400).json({error : 'No Entry found with this ID'})
    }
}

// @Purpose = Checked by general manager
// @Previlage = General manager
// @Required fields =  name
// @Optional params = No
// @ Success status code = 200
// @ Faillure Status code = 400, 404
// @Request = PATCH
// exports.approve_entry = (req, res) => {
//     let id = req.params.entry_id
//     try {
//         Entry.findById({_id :mongoose.Types.ObjectId(id)}).exec().then(result => {
//             if(result) {
//                 if(!result.generalManagerChecked) {
//                     result.generalManagerChecked = true
//                     result.save()
//                     res.status(200).json({msg:'User checked!', result})
//                 }
//                 else{
//                     res.status(200).json({msg:'Already approved!', result})
//                 }
//             }
//             else{
//                 res.status(400).json({error : true, msg : 'No Entry found with this ID'})
//             }
//         }).catch(err => res.status(400).json({error : true, msg : 'Invalid Format Encounterd.'}))
//     } catch (error) {
//         res.status(400).json({error : 'No Entry found with this ID'})
//     }
// }
exports.entry_checked_by_general_manager = (req, res) => {
    let id = req.params.entry_id
    try {
        Entry.findById({_id :mongoose.Types.ObjectId(id)}).exec().then(result => {
            if(result) {
                if(!result.generalManagerChecked) {
                    result.generalManagerChecked = true
                    result.save()
                    res.status(200).json({msg:'User checked!', result})
                }
                else{
                    res.status(200).json({msg:'Already approved!', result})
                }
            }
            else{
                res.status(400).json({error : true, msg : 'No Entry found with this ID'})
            }
        }).catch(err => res.status(400).json({error : true, msg : 'Invalid Format Encounterd.'}))
    } catch (error) {
        res.status(400).json({error : 'No Entry found with this ID'})
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