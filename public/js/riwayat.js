const tbody = document.querySelector("#paymentTable tbody");

async function loadPayments() {
  try {
    const res = await fetch("/api/payments");
    const data = await res.json();

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

async function hapus(id) {
  await fetch(`/api/payments/${id}`, {
    method: "DELETE",
  });

  loadPayments();
}

loadPayments();