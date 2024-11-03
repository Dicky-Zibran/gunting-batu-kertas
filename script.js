const choices = ["Kertas", "Gunting", "Batu"];
const choiceEmojis = {
  "Kertas": "✋",
  "Gunting": "✌️",
  "Batu": "✊"
};

// Memuat efek suara
const winSound = new Audio("sound/yeay-childrens.mp3");
const drawSound = new Audio("sound/krik-krik-krik.mp3");
const loseSound = new Audio("sound/efecto-de-sonido-abucheo.mp3");

let roundActive = true; // Variabel untuk mengecek apakah ronde sedang aktif

// Tambahkan event `ended` untuk setiap suara agar dapat memulai ronde baru setelah suara selesai
winSound.addEventListener("ended", () => resetRound());
drawSound.addEventListener("ended", () => resetRound());
loseSound.addEventListener("ended", () => resetRound());

function playGame(playerChoice) {
  // Cegah pemain memulai ronde baru saat suara masih diputar
  if (!roundActive) return;

  const computerChoice = choices[Math.floor(Math.random() * choices.length)];
  const result = determineWinner(playerChoice, computerChoice);
  displayResult(playerChoice, computerChoice, result);
  roundActive = false; // Set ronde tidak aktif saat hasil ditampilkan
}

function determineWinner(player, computer) {
  if (player === computer) return "Seri";
  if (
    (player === "Kertas" && computer === "Batu") ||
    (player === "Gunting" && computer === "Kertas") ||
    (player === "Batu" && computer === "Gunting")
  ) {
    return "Kamu Menang!";
  } else {
    return "Komputer Menang!";
  }
}

function displayResult(playerChoice, computerChoice, result) {
  document.getElementById("round-result").innerText = "RONDE SELESAI";
  document.getElementById("player-choice").innerText = choiceEmojis[playerChoice];
  document.getElementById("computer-choice").innerText = choiceEmojis[computerChoice];

  const resultContainer = document.querySelector(".result-container");

  // Mengubah warna border dan memutar efek suara berdasarkan hasil
  if (result === "Kamu Menang!") {
    document.getElementById("round-status").innerText = "Gila selamat bro lu menang 🎉";
    resultContainer.style.borderColor = "green";
    resultContainer.style.backgroundColor = "#00ff00";
    winSound.play();  // Putar suara kemenangan
  } else if (result === "Komputer Menang!") {
    document.getElementById("round-status").innerText = "Yaelah sama bot🤖 aja kalah lu👎🏻";
    resultContainer.style.borderColor = "red";
    resultContainer.style.backgroundColor = "#d30000";
    loseSound.play();  // Putar suara kekalahan
  } else {
    document.getElementById("round-status").innerText = "Sengit nih pada seri😯";
    resultContainer.style.borderColor = "gray";
    resultContainer.style.backgroundColor = "#808588";
    drawSound.play();  // Putar suara seri
  }
}

// Fungsi untuk mengatur ulang ronde dan mengaktifkan kembali pilihan pemain
function resetRound() {
  roundActive = true; // Ronde sekarang aktif kembali, pemain bisa memilih lagi
  const resultContainer = document.querySelector(".result-container");
  resultContainer.style.borderColor = "#ffffff"; // Mengembalikan warna border awal
  resultContainer.style.backgroundColor = "#1e1e1e"; // Mengembalikan warna latar belakang awal
  document.getElementById("round-result").innerText = "...";
  document.getElementById("round-status").innerText = "Silakan pilih untuk memulai ronde baru";
  document.getElementById("player-choice").innerText = "";
  document.getElementById("computer-choice").innerText = "";
}
