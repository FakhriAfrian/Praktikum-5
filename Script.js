// Kopi Kampus — JavaScript interaksi halaman
// Contoh materi: event, innerHTML, perubahan atribut, CSS, show/hide, dan validasi form.

document.addEventListener("DOMContentLoaded", () => {
  const menuGrid = document.getElementById("menuGrid");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const menuFeedback = document.getElementById("menuFeedback");
  const toast = document.getElementById("toast");
  const nav = document.getElementById("mainNav");
  const menuToggle = document.getElementById("menuToggle");
  const backToTop = document.getElementById("backToTop");
  let toastTimer;

  // Menampilkan notifikasi dengan mengubah konten HTML (innerHTML).
  function showToast(message) {
    toast.innerHTML = message;
    toast.classList.add("show");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("show"), 2800);
  }

  // Mengubah konten dan gaya elemen ketika kategori menu dipilih.
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedCategory = button.dataset.filter;
      filterButtons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");

      let visibleCount = 0;
      menuGrid.querySelectorAll(".menu-card").forEach((card) => {
        const shouldShow = selectedCategory === "all" || card.dataset.category === selectedCategory;
        card.hidden = !shouldShow; // Menyembunyikan/menampilkan elemen HTML.
        if (shouldShow) visibleCount += 1;
      });

      const categoryNames = {
        all: "semua menu favorit",
        coffee: "menu coffee",
        noncoffee: "menu non-coffee",
        snack: "menu snack"
      };
      menuFeedback.innerHTML = `Menampilkan ${visibleCount} pilihan dari ${categoryNames[selectedCategory]}.`;
      console.log("Filter menu dipilih:", selectedCategory);
    });
  });

  // Tombol tambah pesanan: merespons event klik.
  document.querySelectorAll(".add-order").forEach((button) => {
    button.addEventListener("click", () => {
      const productName = button.dataset.product;
      showToast(`☕ <b>${productName}</b> ditambahkan ke daftar pesanan (demo).`);
      const oldText = button.innerHTML;
      button.innerHTML = "Ditambahkan ✓";
      button.style.color = "var(--orange)"; // Mengubah gaya CSS dengan JavaScript.
      window.setTimeout(() => {
        button.innerHTML = oldText;
        button.style.color = "";
      }, 1500);
    });
  });

  // Mengubah atribut aria-expanded sekaligus menampilkan/menyembunyikan navigasi.
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.innerHTML = isOpen ? "×" : "☰";
  });

  // Menampilkan atau menyembunyikan cerita tambahan.
  const storyButton = document.getElementById("storyButton");
  const storyExtra = document.getElementById("storyExtra");
  storyButton.addEventListener("click", () => {
    const isHidden = storyExtra.hidden;
    storyExtra.hidden = !isHidden;
    storyButton.innerHTML = isHidden ? "Tutup cerita ↑" : "Baca cerita kami ↗";
    if (isHidden) storyExtra.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });

  // Validasi form email di sisi client sebelum diproses.
  const newsletterForm = document.getElementById("newsletterForm");
  const emailInput = document.getElementById("emailInput");
  const formMessage = document.getElementById("formMessage");

  newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Mencegah halaman reload saat demo.
    const email = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      formMessage.textContent = "Email belum diisi. Silakan masukkan alamat email.";
      formMessage.className = "form-message error";
      emailInput.focus();
      window.alert("Alamat email wajib diisi.");
      return;
    }

    if (!emailPattern.test(email)) {
      formMessage.textContent = "Format email belum benar. Contoh: nama@email.com";
      formMessage.className = "form-message error";
      emailInput.focus();
      window.alert("Periksa kembali format alamat email kamu.");
      return;
    }

    formMessage.innerHTML = `Terima kasih! Email <b>${email}</b> berhasil didaftarkan (demo).`;
    formMessage.className = "form-message success";
    emailInput.value = "";
    showToast("✨ Kamu sudah bergabung dengan cerita Kopi Nusa!");
    console.log("Form newsletter tervalidasi.");
  });

  // Tombol pesan di navigasi mengarahkan pengguna ke menu.
  document.getElementById("orderNav").addEventListener("click", () => {
    document.getElementById("menu").scrollIntoView({ behavior: "smooth" });
    showToast("Pilih menu favoritmu untuk mulai memesan.");
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.innerHTML = "☰";
  });

  // Menampilkan tombol kembali ke atas berdasarkan posisi scroll.
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("visible", window.scrollY > 450);
  });
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  console.log("Kopi Nusa siap digunakan.");
});

