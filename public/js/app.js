const form =
  document.getElementById("paymentForm");

const tbody =
  document.querySelector("#paymentTable tbody");

async function loadPayments() {
  try {
    const res = await fetch("/api/payments");
    const data = await res.json();

    console.log(data);

    tbody.innerHTML = "";

    data.forEach((item) => {
      tbody.innerHTML += `
        <tr>
          <td>${item.nama}</td>
          <td>${item.kelas}</td>
          <td>${item.tanggal}</td>
          <td>Rp ${Number(item.nominal).toLocaleString()}</td>
          <td>${item.status}</td>
          <td>
            <a href="${item.bukti}" target="_blank">Lihat</a>
          </td>
          <td>
              ${
                item.status === "pending"
                  ? `
                    <a href="edit-pembayaran.html?id=${item.id}">
                      <button>Edit</button>
                    </a>

                    <button onclick="hapus(${item.id})">
                      Hapus
                    </button>
                  `
                  : "-"
              }
          </td>
        </tr>
      `;
    });
  } catch (error) {
    console.error("Gagal mengambil data:", error);
  }
}

form.addEventListener(
  "submit",
  async (e) => {
    e.preventDefault();

    const formData =
      new FormData(form);

    const res = await fetch("/api/payments", {
      method: "POST",
      body: formData,
    });

    const result = await res.json();

    if (!res.ok) {
      alert(result.message || "Pembayaran gagal disimpan");
      return;
    }

    alert(result.message);
    form.reset();

    loadPayments();
  }
);

async function hapus(id) {
  const yakin = confirm("Yakin ingin menghapus data ini?");

  if (!yakin) {
    return;
  }

  const res = await fetch(`/api/payments/${id}`, {
    method: "DELETE",
  });

  const result = await res.json();

  alert(result.message);
  loadPayments();
}

loadPayments();