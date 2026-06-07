const express = require("express");
const upload = require("../middleware/upload");
const paymentController = require("../controller/paymentController");

const router = express.Router();

router.get("/", paymentController.getPayments);
router.get("/:id", paymentController.getPaymentById);
router.post("/", upload.single("bukti"), paymentController.createPayment);
router.put("/:id", upload.single("bukti"), paymentController.updatePayment);
router.delete("/:id", paymentController.deletePayment);

module.exports = router;
