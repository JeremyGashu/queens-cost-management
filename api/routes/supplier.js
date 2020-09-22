const express = require('express')
const SupplierController = require('../controller/supplier')

const router = express.Router()

router.get('/', SupplierController.suppliers_all)

router.get('/:supplier_id' ,SupplierController.supplier_by_id)

router.post('/', SupplierController.create_supplier)

router.delete('/:supplier_id',  SupplierController.delete_review)


router.patch('/:supplier_id', SupplierController.update_supplier_name)

router.use(SupplierController.error_handler)


module.exports = router