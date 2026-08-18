document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const setASelect = document.getElementById("setASelect");
  const operationSelect = document.getElementById("operationSelect");
  const setBSelect = document.getElementById("setBSelect");

  // Event Listeners
  searchInput.addEventListener("input", applyFilters);
  setASelect.addEventListener("change", applyFilters);
  operationSelect.addEventListener("change", () => {
    // ปลดล็อก Set B เมื่อเลือกการดำเนินการ
    setBSelect.disabled = (operationSelect.value === "NONE");
    applyFilters();
  });
  setBSelect.addEventListener("change", applyFilters);

  // โหลดครั้งแรก
  applyFilters();
});

function applyFilters() {
  const search = document.getElementById("searchInput").value.trim().toLowerCase();
  const setA = document.getElementById("setASelect").value;
  const op = document.getElementById("operationSelect").value;
  const setB = document.getElementById("setBSelect").value;
  const mathExpl = document.getElementById("mathExplanation");

  let filtered = MOVIES_DATA;

  // 1. ค้นหาด้วยชื่อ
  if (search !== "") {
    filtered = filtered.filter(m => m.title.toLowerCase().includes(search));
  }

  // 2. กรองด้วย Set Theory & Set Operations
  if (op === "NONE") {
    if (setA !== "ALL") {
      filtered = filtered.filter(m => m.categories.includes(setA));
      mathExpl.innerHTML = `สูตรการกรองปัจจุบัน: $A = \\{ x \\in U \\mid x \\text{ is } ${setA} \\}$`;
    } else {
      mathExpl.innerHTML = `สูตรการกรองปัจจุบัน: $U$ (ภาพยนตร์ทั้งหมด)`;
    }
  } else {
    // กรณีมี Operation บน Set A และ Set B
    if (setA === "ALL" || setB === "ALL") {
      mathExpl.innerHTML = `<span style="color:#ff758f;">⚠️ กรุณาเลือกทั้ง เซต A และ เซต B เพื่อประมวลผล Operation</span>`;
    } else {
      filtered = filtered.filter(movie => {
        const hasA = movie.categories.includes(setA);
        const hasB = movie.categories.includes(setB);

        if (op === "INTERSECTION") {
          return hasA && hasB; // A ∩ B
        } else if (op === "UNION") {
          return hasA || hasB; // A ∪ B
        } else if (op === "DIFFERENCE") {
          return hasA && !hasB; // A - B
        }
        return true;
      });

      if (op === "INTERSECTION") {
        mathExpl.innerHTML = `สูตรการกรองปัจจุบัน: $A \\cap B = \\{ x \\mid x \\text{ is } ${setA} \\land x \\text{ is } ${setB} \\}$`;
      } else if (op === "UNION") {
        mathExpl.innerHTML = `สูตรการกรองปัจจุบัน: $A \\cup B = \\{ x \\mid x \\text{ is } ${setA} \\lor x \\text{ is } ${setB} \\}$`;
      } else if (op === "DIFFERENCE") {
        mathExpl.innerHTML = `สูตรการกรองปัจจุบัน: $A - B = \\{ x \\mid x \\text{ is } ${setA} \\land x \\text{ is not } ${setB} \\}$`;
      }
    }
  }

  renderMovies(filtered);
}

function renderMovies(movies) {
  const container = document.getElementById("moviesContainer");
  const countDisplay = document.getElementById("movieCount");

  countDisplay.textContent = `พบภาพยนตร์ทั้งหมด ${movies.length} เรื่อง`;

  if (movies.length === 0) {
    container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-sub); padding: 2rem;">ไม่พบภาพยนตร์ที่ตรงกับเงื่อนไขทางเซตที่กำหนด (∅ เซตว่าง)</p>`;
    return;
  }

  container.innerHTML = movies.map(movie => `
    <div class="movie-card">
      <img src="${movie.poster}" alt="${movie.title}">
      <div class="movie-card-body">
        <h3 class="movie-title">${movie.title}</h3>
        <div class="tags">
          ${movie.categories.map(c => `<span class="tag">${c}</span>`).join('')}
          <span class="tag" style="border-color: var(--accent-pink); color: var(--accent-pink);">${movie.platform}</span>
        </div>
        <p style="margin-bottom: 0.8rem; font-weight: bold; color: var(--neon-glow);">${movie.price} บาท</p>
        <button class="btn" style="margin-top: auto;" onclick="addToWatchlist(${movie.id})">+ เพิ่มใน Watchlist</button>
      </div>
    </div>
  `).join('');
}