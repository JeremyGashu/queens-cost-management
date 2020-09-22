const express = require('express')
const EntriesController = require('../controller/entry')
const AuthChecker = require('../middlewares/auth_user')

const router = express.Router()

router.get('/',AuthChecker.authNeeded, EntriesController.get_all_entries)

router.get('/:entry_id' ,EntriesController.entries_by_id)

router.post('/',AuthChecker.userAuthChecker, EntriesController.create_entry)

router.delete('/:entry_id', AuthChecker.authNeeded, EntriesController.delete_entry)

router.patch('/user/:entry_id', AuthChecker.userAuthChecker, EntriesController.entry_checked_by_user)

router.patch('/marketing/:entry_id',AuthChecker.marketingAuthChecker, EntriesController.entry_checked_by_marketing_manager)

router.patch('/manager/:entry_id', AuthChecker.managerAuthChecker, EntriesController.entry_checked_by_general_manager)

router.use(EntriesController.error_handler)

module.exports = router