const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

let patients = [
  { name: 'John Doe', age: 35, disease: 'Fever', admissionDate: '2023-01-01', room: '101' },
  { name: 'Jane Smith', age: 45, disease: 'Flu', admissionDate: '2023-02-05', room: '102' },
];

let bills = [
  { patientName: 'John Doe', amount: 100, status: 'belum dibayar' },
  { patientName: 'Jane Smith', amount: 200, status: 'belum dibayar' },
];

app.get('/', (req, res) => {
  // res.sendFile(__dirname + '/public/views/index.html');
  res.sendFile(path.join(__dirname, 'public', 'views', 'index.html'));
});

app.post('/addPatient', (req, res) => {
  const { name, age, disease, admissionDate, room } = req.body;
  const newPatient = { name, age, disease, admissionDate, room };
  patients.push(newPatient);
  res.redirect('/');
});

app.get('/getPatients', (req, res) => {
  res.json(patients);
});

app.post('/searchPatients', (req, res) => {
  const { searchTerm } = req.body;
  const searchResults = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  res.json(searchResults);
});

app.post('/createBill', (req, res) => {
  const { patientName, amount } = req.body;
  const newBill = { patientName, amount, status: 'belum dibayar' };
  bills.push(newBill);
  res.redirect('/');
});

app.get('/getBills', (req, res) => {
  res.json(bills);
});

app.post('/payBill', (req, res) => {
  const { patientName } = req.body;
  const bill = bills.find(bill => bill.patientName === patientName && bill.status === 'belum dibayar');
  if (bill) {
    bill.status = ' sudah dibayar';
    res.send('Pembayaran berhasil.');
  } else {
    res.status(404).send('Tagihan tidak ditemukan atau sudah dibayar.');
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
