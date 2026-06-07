const Payment = require("../models/paymentModel");
const uploadBukti = require("../utils/storageUpload");

async function getPayments(req, res) {
  try {
    const payments = await Payment.findAll();
    res.json(payments);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Gagal mengambil data pembayaran",
      error: error.message,
    });
  }
}

async function getPaymentById(req, res) {
  try {
    const id = Number(req.params.id);
    const payment = await Payment.findById(id);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Data tidak ditemukan",
      });
    }

    res.json(payment);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Gagal mengambil detail pembayaran",
      error: error.message,
    });
  }
}

async function createPayment(req, res) {
  try {
    const buktiUrl = await uploadBukti(req.file);

    const payment = await Payment.create({
      nama: req.body.nama,
      kelas: req.body.kelas,
      tanggal: req.body.tanggal,
      nominal: req.body.nominal,
      bukti: buktiUrl,
    });

    if (!payment) {
      return res.status(409).json({
        success: false,
        message: "Data pembayaran sudah pernah dikirim",
      });
    }

    res.status(201).json({
      success: true,
      message: "Pembayaran berhasil disimpan",
      data: payment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Pembayaran gagal disimpan",
      error: error.message,
    });
  }
}

async function updatePayment(req, res) {
  try {
    const id = Number(req.params.id);
    const buktiUrl = await uploadBukti(req.file);

    const result = await Payment.update(id, {
      nama: req.body.nama,
      kelas: req.body.kelas,
      tanggal: req.body.tanggal,
      nominal: req.body.nominal,
      bukti: buktiUrl,
    });

    if (result.error === "NOT_FOUND") {
      return res.status(404).json({
        success: false,
        message: "Data tidak ditemukan",
      });
    }

    if (result.error === "ALREADY_VALIDATED") {
      return res.status(400).json({
        success: false,
        message: "Pembayaran sudah divalidasi",
      });
    }

    res.json({
      success: true,
      message: "Pembayaran berhasil diperbarui",
      data: result.data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Pembayaran gagal diperbarui",
      error: error.message,
    });
  }
}

async function deletePayment(req, res) {
  try {
    const id = Number(req.params.id);
    const result = await Payment.remove(id);

    if (result.error === "NOT_FOUND") {
      return res.status(404).json({
        success: false,
        message: "Data tidak ditemukan",
      });
    }

    if (result.error === "ALREADY_VALIDATED") {
      return res.status(400).json({
        success: false,
        message: "Pembayaran yang sudah divalidasi tidak dapat dihapus",
      });
    }

    res.json({
      success: true,
      message: "Data berhasil dihapus",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Data gagal dihapus",
      error: error.message,
    });
  }
}

module.exports = {
  getPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment,
};
