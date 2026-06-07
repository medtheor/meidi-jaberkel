const params =
  new URLSearchParams(
    window.location.search
  );

const id = params.get("id");

const form =
  document.getElementById("editForm");

async function loadData() {

  const res =
    await fetch(`/api/payments/${id}`);

  const data = await res.json();

  if (!res.ok) {
    alert(data.message || "Data tidak ditemukan");
    window.location.href = "pembayaran.html";
    return;
  }

  document.getElementById("nama").value =
    data.nama;

  document.getElementById("kelas").value =
    data.kelas;

  document.getElementById("tanggal").value =
    data.tanggal;

  document.getElementById("nominal").value =
    data.nominal;
}

form.addEventListener(
  "submit",
  async (e) => {
    e.preventDefault();

    const formData =
      new FormData();

    formData.append(
      "nama",
      document.getElementById("nama").value
    );

    formData.append(
      "kelas",
      document.getElementById("kelas").value
    );

    formData.append(
      "tanggal",
      document.getElementById("tanggal").value
    );

    formData.append(
      "nominal",
      document.getElementById("nominal").value
    );

    const bukti =
      document.getElementById("bukti")
        .files[0];

    if (bukti) {
      formData.append("bukti", bukti);
    }

    const res = await fetch(`/api/payments/${id}`, {
      method: "PUT",
      body: formData,
    });

    const result = await res.json();

    if (!res.ok) {
      alert(result.message || "Pembayaran gagal diperbarui");
      return;
    }

    alert(result.message);

    window.location.href =
      "pembayaran.html";
  }
);

loadData();