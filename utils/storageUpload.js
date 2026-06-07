const path = require("path");
const supabase = require("./supabaseClient");

const BUCKET_NAME = process.env.SUPABASE_BUCKET || "bukti-pembayaran";

async function uploadBukti(file) {
  if (!file) {
    return null;
  }

  const ext = path.extname(file.originalname) || ".jpg";
  const safeName = file.originalname
    .replace(ext, "")
    .replace(/[^a-zA-Z0-9-_]/g, "-")
    .toLowerCase();

  const fileName = `${Date.now()}-${safeName}${ext}`;

  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(fileName, file.buffer, {
      contentType: file.mimetype,
      upsert: false,
    });

  if (error) {
    throw error;
  }

  const { data } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(fileName);

  return data.publicUrl;
}

module.exports = uploadBukti;
