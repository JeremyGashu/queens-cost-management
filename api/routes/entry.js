const express = require('express')
const EntriesController = require('../controller/entry')
const AuthChecker = require('../middlewares/auth_user')

const router = express.Router()

router.get('/', EntriesController.get_all_entries)

router.get('/:entry_id' ,EntriesController.entries_by_id)

router.post('/', EntriesController.create_entry)

router.delete('/:entry_id',  EntriesController.delete_entry)

router.patch('/user/:entry_id',  EntriesController.entry_checked_by_user)

router.patch('/marketing/:entry_id', EntriesController.entry_checked_by_marketing_manager)

router.patch('/manager/:entry_id',EntriesController.entry_checked_by_general_manager)

router.use(EntriesController.error_handler)

module.exports = router