const express = require("express");
const path = require("path");
const paymentRoutes = require("./routing/paymentRoutes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/payments", paymentRoutes);

module.exports = app;
