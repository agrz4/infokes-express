async function searchPatients() {
    const searchTerm = document.getElementById('searchTerm').value;
    const response = await fetch('/searchPatients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ searchTerm }),
    });
    const searchResults = await response.json();
  
    const searchResultsList = document.getElementById('searchResults');
    searchResultsList.innerHTML = '';
  
    if (searchResults.length === 0) {
      const noResultsItem = document.createElement('li');
      noResultsItem.textContent = 'Tidak ada hasil.';
      searchResultsList.appendChild(noResultsItem);
    } else {
      searchResults.forEach(patient => {
        const listItem = document.createElement('li');
        listItem.textContent = `${patient.name}, ${patient.age} tahun, ${patient.disease}, Tanggal Penerimaan: ${patient.admissionDate}, Ruangan: ${patient.room}`;
        searchResultsList.appendChild(listItem);
      });
    }
  }

  async function createBill() {
    const patientName = document.getElementById('patientName').value;
    const amount = document.getElementById('amount').value;
    const response = await fetch('/createBill', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ patientName, amount }),
    });
    // Handle response jika diperlukan
    // Refresh halaman atau ambil ulang daftar tagihan
    getBills();
  }
  
  async function getBills() {
    const response = await fetch('/getBills');
    const billList = await response.json();
    renderBillList(billList);
  }
  
  function payBill(patientName) {
    fetch('/payBill', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ patientName }),
    })
    .then(response => response.text())
    .then(message => {
      alert(message);
      getBills(); // Ambil ulang daftar tagihan setelah pembayaran
    })
    .catch(error => console.error('Error:', error));
  }
  
  function renderBillList(billList) {
    const billListElement = document.getElementById('billList');
    billListElement.innerHTML = '';
    billList.forEach(bill => {
      const listItem = document.createElement('li');
      listItem.textContent = `${bill.patientName}: Rp.${bill.amount} (${bill.status})`;
  
      if (bill.status === 'belum dibayar') {
        const payButton = document.createElement('button');
        payButton.textContent = 'Bayar';
        payButton.addEventListener('click', () => payBill(bill.patientName));
        payButton.style.width = 'auto';
        listItem.appendChild(payButton);
      }
  
      billListElement.appendChild(listItem);
    });
  }
  
  document.addEventListener('DOMContentLoaded', getBills);

  // alert pesan
  function submitChat() {
    alert("Pesan terkirim, mohon tunggu chat kami!")
    document.getElementById("chatForm").reset()
  }
  // hamburger
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  hamburger.addEventListener("click", mobileMenu);

  function mobileMenu() {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
  }
  // navLink
  const navLink = document.querySelectorAll(".nav-link");

  navLink.forEach(n => n.addEventListener("click", closeMenu));

function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}