const { createClient } = require("@supabase/supabase-js");

console.log(process.env.SUPABASE_URL);
console.log(process.env.SUPABASE_SERVICE_ROLE_KEY);

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error(
    "SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY wajib diisi di environment variable."
  );
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

module.exports = supabase;
