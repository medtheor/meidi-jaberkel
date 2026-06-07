const supabase = require("../utils/supabaseClient");

const TABLE_NAME = "payments";

async function findAll() {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}

async function findById(id) {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select("*")
    .eq("id", id)
    .single();

  if (error && error.code !== "PGRST116") {
    throw error;
  }

  return data || null;
}

async function isDuplicate(nama, kelas) {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select("id")
    .ilike("nama", nama)
    .ilike("kelas", kelas)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return Boolean(data);
}

async function create(data) {
  const duplicate = await isDuplicate(data.nama, data.kelas);

  if (duplicate) {
    return null;
  }

  const { data: payment, error } = await supabase
    .from(TABLE_NAME)
    .insert({
      nama: data.nama,
      kelas: data.kelas,
      tanggal: data.tanggal,
      nominal: data.nominal,
      bukti: data.bukti || null,
      status: "pending",
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return payment;
}

async function update(id, data) {
  const payment = await findById(id);

  if (!payment) {
    return { error: "NOT_FOUND" };
  }

  if (payment.status !== "pending") {
    return { error: "ALREADY_VALIDATED" };
  }

  const payload = {
    nama: data.nama,
    kelas: data.kelas,
    tanggal: data.tanggal,
    nominal: data.nominal,
  };

  if (data.bukti) {
    payload.bukti = data.bukti;
  }

  const { data: updatedPayment, error } = await supabase
    .from(TABLE_NAME)
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return { data: updatedPayment };
}

async function remove(id) {
  const payment = await findById(id);

  if (!payment) {
    return { error: "NOT_FOUND" };
  }

  if (payment.status !== "pending") {
    return { error: "ALREADY_VALIDATED" };
  }

  const { error } = await supabase
    .from(TABLE_NAME)
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }

  return { success: true };
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
