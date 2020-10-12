const express = require('express')
const EntriesController = require('../controller/entry')

const multer = require('multer')

const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, './assets/images/uploads')
    },
    filename : (req, file, cb) => {
        cb(null, new Date().toISOString() + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true)
    }
    else {
        cb(null, false)
    }
}

const upload = multer({
    storage,limits : {
    fileSize : 1024 * 1024 * 6
    },
    fileFilter

})

const router = express.Router()

router.get('/', EntriesController.get_all_entries)

router.get('/:entry_id' ,EntriesController.entries_by_id)

router.post('/', EntriesController.create_entry)

router.post('/image/:entry_id', EntriesController.add_entry_image)

router.delete('/:entry_id',  EntriesController.delete_entry)

router.post('/user/:entry_id',  EntriesController.entry_checked_by_user)

router.post('/marketing/:entry_id', EntriesController.entry_checked_by_marketing_manager)

router.post('/manager/:entry_id',EntriesController.entry_checked_by_general_manager)

router.use(EntriesController.error_handler)

module.exports = router