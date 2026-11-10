document.addEventListener('DOMContentLoaded', () => {
  const apiUrl = 'https://inovasidigital-si.id/dtw/api/peserta.json';
  const tableBody = document.getElementById('data-peserta');

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Gagal mengambil data dari API');
      }
      return response.json();
    })
    .then(data => {

      tableBody.innerHTML = '';

      
      const listPeserta = Array.isArray(data) ? data : (data.peserta || data.data || []);

      listPeserta.forEach((peserta, index) => {
        const row = document.createElement('tr');

      
        const nama = peserta.nama || peserta.name || '-';
        const email = peserta.email || '-';

        row.innerHTML = `
          <td>${index + 1}</td>
          <td>${nama}</td>
          <td>${email}</td>
        `;

        tableBody.appendChild(row);
      });
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      tableBody.innerHTML = `
        <tr>
          <td colspan="3" style="text-align: center; color: red;">
            Gagal memuat data peserta.
          </td>
        </tr>
      `;
    });
});