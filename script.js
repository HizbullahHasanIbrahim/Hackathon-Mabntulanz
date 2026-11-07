// TODO: ganti dengan fitur atau keunggulan produk kalian
// Array objek data fitur produk
const fitur = [
    { judul: 'Bahan Alami Pilihan', keterangan: 'Ekstrak berkualitas dari bahan botani Nusantara untuk karakter aroma yang kaya dan autentik.', ikon: '✦', kategori: 'Kualitas' },
    { judul: 'Racikan Artisanal', keterangan: 'Setiap formula dikembangkan dan diracik tangan oleh master perfumer lokal berpengalaman.', ikon: '◌', kategori: 'Warisan' },
    { judul: 'Kemewahan Terjangkau', keterangan: 'Harga adil tanpa mengorbankan kualitas, ketahanan, atau pengalaman premium.', ikon: '◇', kategori: 'Nilai' },
];

// Fungsi render kartu fitur ke elemen HTML #daftar-fitur
function tampilkanFitur() {
    const wadah = document.getElementById('daftar-fitur'); // Ambil elemen kontainer grid
    wadah.innerHTML = ''; // Bersihkan isi sebelum render ulang
    for (const f of fitur) { // Loop setiap item data fitur
        const kartu = document.createElement('article'); // Buat elemen article baru
        kartu.className = 'kartu animate-on-scroll'; // Set class untuk styling & animasi
        kartu.innerHTML = `<div class="fitur-ikon" aria-hidden="true">${f.ikon}</div><small class="fitur-kategori">${f.kategori}</small><h3>${f.judul}</h3><p>${f.keterangan}</p>`; // Isi HTML kartu
        wadah.appendChild(kartu); // Sisipkan kartu ke kontainer grid
    }
}

// Form belum dikirim ke server; cukup periksa isian lalu tampilkan pesan.
const form = document.getElementById('form-daftar'); // Ambil elemen form pendaftaran
const pesan = document.getElementById('pesan'); // Ambil elemen p penampil pesan status

form.addEventListener('submit', (e) => {
    e.preventDefault(); // Cegah reload halaman default browser
    const nama = form.nama.value.trim(); // Ambil input nama tanpa spasi luar
    const email = form.email.value.trim(); // Ambil input email tanpa spasi luar

    pesan.hidden = false; // Tampilkan elemen pesan yang sebelumnya tersembunyi
    // checkValidity() memeriksa atribut required dan type="email" di HTML
    if (nama === '' || !form.email.checkValidity()) { // Jika nama kosong atau format email invalid
        pesan.textContent = 'Isi nama dan email yang benar.'; // Tulis teks pesan gagal
        pesan.className = 'pesan gagal'; // Beri style latar merah
        return; // Hentikan eksekusi
    }
    pesan.textContent = `Terima kasih, ${nama}. Kami akan menghubungi ${email}.`; // Tulis teks pesan sukses
    pesan.className = 'pesan berhasil'; // Beri style latar hijau
    form.reset(); // Kosongkan input form setelah berhasil
});

// State tema terpusat: pilihan manual disimpan agar refresh mempertahankan preferensi.
const themeToggle = document.getElementById('theme-toggle'); // Ambil tombol switch tema di navbar
function perbaruiTema(tema) {
    document.documentElement.dataset.theme = tema; // Set atribut data-theme di <html> (light/dark)
    localStorage.setItem('mbantulanz-theme', tema); // Simpan pilihan tema ke storage browser
    themeToggle.setAttribute('aria-pressed', tema === 'dark'); // Update atribut aksesibilitas tombol
    themeToggle.setAttribute('aria-label', tema === 'dark' ? 'Aktifkan mode terang' : 'Aktifkan mode gelap'); // Update label bacaan screen reader
}

// Event listener klik tombol toggle tema untuk bolak-balik light & dark mode
themeToggle.addEventListener('click', () => {
    perbaruiTema(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
});

// Filter tab hanya menampilkan panel kategori aktif tanpa dependency tambahan.
document.querySelectorAll('.tab-button').forEach((tab) => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.tab-button').forEach((item) => item.classList.remove('active')); // Nonaktifkan semua tab
        document.querySelectorAll('.panel').forEach((panel) => panel.classList.remove('active')); // Sembunyikan semua panel
        tab.classList.add('active'); // Aktifkan tab yang diklik
        document.querySelector(`.panel[data-category="${tab.dataset.category}"]`).classList.add('active'); // Tampilkan panel sesuai kategori tab
    });
});

// IntersectionObserver menyalakan reveal saat elemen masuk viewport; observer berhenti setelah sekali tampil.
const observer = new IntersectionObserver((entries, instance) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) { // Jika elemen sudah masuk area layar pengguna
            entry.target.classList.add('is-visible'); // Tambah class CSS pemicu animasi fade-up
            instance.unobserve(entry.target); // Lepas pantauan observer agar animasi tidak berulang
        }
    });
}, { threshold: 0.12 }); // Pemicu aktif saat 12% elemen terlihat di layar

tampilkanFitur(); // Jalankan render awal fitur
document.querySelectorAll('.animate-on-scroll').forEach((element) => observer.observe(element)); // daftarkan semua elemen animasi ke observer
perbaruiTema(document.documentElement.dataset.theme || 'light'); // Terapkan tema awal saat skrip selesai muat
