// TODO: ganti dengan fitur atau keunggulan produk kalian
// Array objek data fitur produk
const fitur = [
    { judul: 'Bahan Alami Pilihan', keterangan: 'Ekstrak berkualitas dari bahan botani Nusantara untuk karakter aroma yang kaya dan autentik.', ikon: '✦', kategori: 'Kualitas' },
    { judul: 'Racikan Artisanal', keterangan: 'Setiap formula dikembangkan dan diracik tangan oleh master perfumer lokal berpengalaman.', ikon: '◌', kategori: 'Warisan' },
    { judul: 'Kemewahan Terjangkau', keterangan: 'Harga adil tanpa mengorbankan kualitas, ketahanan, atau pengalaman premium.', ikon: '◇', kategori: 'Nilai' },
    { judul: 'Konsentrasi Extrait 30%', keterangan: 'Ketahanan aroma 8 hingga 12 jam di iklim tropis berkat konsentrasi minyak wangi murni yang tinggi.', ikon: '❖', kategori: 'Performa' },
];

// Basis data rekomendasi parfum untuk fitur Interactive Scent Finder & Olfactory Pyramid
const katalogRacikan = {
    'siang-rempah': {
        koleksi: 'Signature Collection',
        judul: 'Heritage Bronze',
        tahan: '⏱ 10 Jam',
        deskripsi: 'Perpaduan hangat kayu cendana dan rempah Nusantara yang memancarkan ketenangan serta wibawa sepanjang aktivitas siang.',
        top: 'Bergamot Jawa, Kapulaga, Serai Wangi',
        heart: 'Cengkeh Nusantara, Melati Keraton, Pala',
        base: 'Kayu Cendana Sumba, Vetiver, Amber',
        harga: 'Rp 249.000'
    },
    'siang-floral': {
        koleksi: 'Everyday Luxe',
        judul: 'Daily Gold',
        tahan: '⏱ 8 Jam',
        deskripsi: 'Kemewahan harian yang segar, bersih, dan menenangkan—dirancang untuk produktivitas dan cuaca tropis Indonesia.',
        top: 'Jeruk Purut, Embun Teh Putih, Neroli',
        heart: 'Melati Gambir, Mawar Pegunungan, Magnolia',
        base: 'White Musk Alami, Kayu Manis Lembut, Cedar',
        harga: 'Rp 189.000'
    },
    'siang-oud': {
        koleksi: 'Everyday Luxe',
        judul: 'Everyday Bronze',
        tahan: '⏱ 9 Jam',
        deskripsi: 'Sentuhan kayu gaharu ringan yang dipadukan citrus segar, cocok bagi pemula yang ingin tampil berkarakter di siang hari.',
        top: 'Mandarin Segar, Lada Hitam, Daun Nilam',
        heart: 'Bunga Kenanga, Kayu Secang, Lavender',
        base: 'Gaharu Muda, Ambergris Vegan, Tonka Bean',
        harga: 'Rp 199.000'
    },
    'malam-rempah': {
        koleksi: 'Signature Collection',
        judul: 'Nusantara Gold',
        tahan: '⏱ 12 Jam',
        deskripsi: 'Mahakarya 12 botani Nusantara dengan ekstraksi ganda yang memikat untuk acara malam dan perjamuan formal.',
        top: 'Saffron Nusantara, Kayu Manis, Pekak',
        heart: 'Mawar Hitam, Cengkeh Tua, Kemenyan Jawa',
        base: 'Cendana Kuno, Vanila Papua, Gold Amber',
        harga: 'Rp 279.000'
    },
    'malam-floral': {
        koleksi: 'Private Reserve',
        judul: 'Master Perfumer',
        tahan: '⏱ 12 Jam',
        deskripsi: 'Buket bunga malam langka yang diracik terbatas dengan sentuhan madu hutan dan kayu hangat yang elegan.',
        top: 'Sedap Malam, Pir Segar, Pink Pepper',
        heart: 'Ylang-Ylang, Melati Malam, Madu Hutan',
        base: 'Patchouli Aceh, Benzoin, Musk Beludru',
        harga: 'Rp 349.000'
    },
    'malam-oud': {
        koleksi: 'Private Reserve',
        judul: 'Private Reserve',
        tahan: '⏱ 14 Jam',
        deskripsi: 'Eksklusif untuk kolektor: gaharu sumber tunggal Kalimantan yang difermentasi penuh dengan jejak aroma mewah tak terlupakan.',
        top: 'Kapulaga Hitam, الدخان (Smoky Incense), Bergamot',
        heart: 'Gaharu Kalimantan Murni, Kulit (Leather), Damar',
        base: 'Royal Oud, Labdanum, Cendana Tua, Dark Amber',
        harga: 'Rp 399.000'
    }
};

// Fungsi render kartu fitur ke elemen HTML #daftar-fitur
function tampilkanFitur() {
    const wadah = document.getElementById('daftar-fitur'); // Ambil elemen kontainer grid
    if (!wadah) return;
    wadah.innerHTML = ''; // Bersihkan isi sebelum render ulang
    for (const f of fitur) { // Loop setiap item data fitur
        const kartu = document.createElement('article'); // Buat elemen article baru
        kartu.className = 'kartu animate-on-scroll'; // Set class untuk styling & animasi
        kartu.innerHTML = `<div class="fitur-ikon" aria-hidden="true">${f.ikon}</div><small class="fitur-kategori">${f.kategori}</small><h3>${f.judul}</h3><p>${f.keterangan}</p>`; // Isi HTML kartu
        wadah.appendChild(kartu); // Sisipkan kartu ke kontainer grid
    }
}

// State pilihan pengguna untuk Scent Finder dan Atelier Grafir
let stateWaktu = 'siang';
let stateKarakter = 'rempah';
let stateVarianTerpilih = 'Heritage Bronze';
let stateFinishBotol = 'Champagne Gold';

// Fungsi memperbarui tampilan rekomendasi parfum & Olfactory Pyramid
function perbaruiRekomendasi() {
    const kunci = `${stateWaktu}-${stateKarakter}`;
    const data = katalogRacikan[kunci];
    if (!data) return;

    stateVarianTerpilih = data.judul;
    document.getElementById('rek-koleksi').textContent = data.koleksi;
    document.getElementById('rek-judul').textContent = data.judul;
    document.getElementById('rek-tahan').textContent = data.tahan;
    document.getElementById('rek-deskripsi').textContent = data.deskripsi;
    document.getElementById('rek-top').textContent = data.top;
    document.getElementById('rek-heart').textContent = data.heart;
    document.getElementById('rek-base').textContent = data.base;
    document.getElementById('rek-harga').innerHTML = `${data.harga} <small>/ 50ml</small>`;

    // Sinkronkan nama varian ke plakat botol di Atelier Grafir
    const previewVarian = document.getElementById('preview-varian');
    if (previewVarian) previewVarian.textContent = data.judul;
}

// Event listener untuk tombol pilihan waktu pada Scent Finder
document.querySelectorAll('#pilih-waktu .chip').forEach((btn) => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('#pilih-waktu .chip').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        stateWaktu = btn.dataset.waktu;
        perbaruiRekomendasi();
    });
});

// Event listener untuk tombol pilihan karakter aroma pada Scent Finder
document.querySelectorAll('#pilih-karakter .chip').forEach((btn) => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('#pilih-karakter .chip').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        stateKarakter = btn.dataset.karakter;
        perbaruiRekomendasi();
    });
});

// Fungsi menyalin konfigurasi parfum & grafir ke input form pendaftaran
function sinkronkanKeForm() {
    const inputPref = document.getElementById('input-preferensi');
    const teksGrafir = (document.getElementById('input-grafir')?.value || '').trim() || 'TANPA GRAFIR';
    if (inputPref) {
        inputPref.value = `${stateVarianTerpilih} (${stateFinishBotol}) — Grafir: "${teksGrafir.toUpperCase()}"`;
    }
}

// Tombol "Pilih Varian Ini" di Scent Finder mengarahkan pengguna ke form pendaftaran
const btnPakaiRekomendasi = document.getElementById('btn-pakai-rekomendasi');
if (btnPakaiRekomendasi) {
    btnPakaiRekomendasi.addEventListener('click', () => {
        sinkronkanKeForm();
        document.getElementById('daftar')?.scrollIntoView({ behavior: 'smooth' });
    });
}

// FITUR BARU 2: Live Bottle Engraving Simulator
const inputGrafir = document.getElementById('input-grafir');
const previewGrafir = document.getElementById('preview-grafir');
const bottleStage = document.getElementById('bottle-stage');

if (inputGrafir && previewGrafir) {
    inputGrafir.addEventListener('input', () => {
        const nilai = inputGrafir.value.trim();
        previewGrafir.textContent = nilai ? nilai.toUpperCase() : 'MBANTULANZ';
    });
}

document.querySelectorAll('.finish-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.finish-btn').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        if (bottleStage) bottleStage.dataset.finish = btn.dataset.finish;
        stateFinishBotol = btn.textContent.trim();
    });
});

const btnSimpanGrafir = document.getElementById('btn-simpan-grafir');
if (btnSimpanGrafir) {
    btnSimpanGrafir.addEventListener('click', () => {
        sinkronkanKeForm();
        document.getElementById('daftar')?.scrollIntoView({ behavior: 'smooth' });
    });
}

// Form belum dikirim ke server; cukup periksa isian lalu tampilkan pesan.
const form = document.getElementById('form-daftar'); // Ambil elemen form pendaftaran
const pesan = document.getElementById('pesan'); // Ambil elemen p penampil pesan status

form.addEventListener('submit', (e) => {
    e.preventDefault(); // Cegah reload halaman default browser
    const nama = form.nama.value.trim(); // Ambil input nama tanpa spasi luar
    const email = form.email.value.trim(); // Ambil input email tanpa spasi luar
    const preferensi = form.preferensi ? form.preferensi.value.trim() : '';

    pesan.hidden = false; // Tampilkan elemen pesan yang sebelumnya tersembunyi
    // checkValidity() memeriksa atribut required dan type="email" di HTML
    if (nama === '' || !form.email.checkValidity()) { // Jika nama kosong atau format email invalid
        pesan.textContent = 'Isi nama dan email yang benar.'; // Tulis teks pesan gagal
        pesan.className = 'pesan gagal'; // Beri style latar merah
        return; // Hentikan eksekusi
    }
    const infoTambahan = preferensi ? ` Pilihanmu (${preferensi}) telah dicatat.` : '';
    pesan.textContent = `Terima kasih, ${nama}. Kami akan menghubungi ${email}.${infoTambahan}`; // Tulis teks pesan sukses
    pesan.className = 'pesan berhasil'; // Beri style latar hijau
    form.reset(); // Kosongkan input form setelah berhasil
});

// State tema terpusat: pilihan manual disimpan agar refresh mempertahankan preferensi.
const themeToggle = document.getElementById('theme-toggle'); // Ambil tombol switch tema di navbar
function perbaruiTema(tema) {
    document.documentElement.dataset.theme = tema; // Set atribut data-theme di <html> (light/dark)
    try {
        localStorage.setItem('mbantulanz-theme', tema); // Simpan pilihan tema ke storage browser
    } catch {
        // Abaikan jika mode privat memblokir localStorage
    }
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

// ScrollSpy: Menandai tautan navigasi yang sedang aktif saat pengguna melakukan scroll
const navLinks = document.querySelectorAll('.atas nav a[href^="#"]');
const scrollSpyObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach((link) => {
                link.classList.toggle('nav-active', link.getAttribute('href') === `#${id}`);
            });
        }
    });
}, { rootMargin: '-35% 0px -55% 0px' });

document.querySelectorAll('main section[id]').forEach((sec) => scrollSpyObserver.observe(sec));

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
perbaruiRekomendasi(); // Inisialisasi tampilan awal Scent Finder
document.querySelectorAll('.animate-on-scroll').forEach((element) => observer.observe(element)); // Daftarkan semua elemen animasi ke observer
perbaruiTema(document.documentElement.dataset.theme || 'light'); // Terapkan tema awal saat skrip selesai muat