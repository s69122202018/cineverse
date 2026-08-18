document.addEventListener("DOMContentLoaded", () => {
  renderCategories();
  renderFeaturedMovies();
});

// ใช้ Set Theory ในการดึง Category ที่ไม่ซ้ำ
function renderCategories() {
  const categoryContainer = document.getElementById("categoryList");
  
  // สร้าง Set เพื่อตัดค่าซ้ำ (Set Theory)
  const categorySet = new Set();
  
  MOVIES_DATA.forEach(movie => {
    movie.categories.forEach(cat => categorySet.add(cat));
  });

  // นำสมาชิกใน Set มาแสดงผล
  categorySet.forEach(category => {
    const badge = document.createElement("div");
    badge.className = "cat-badge";
    badge.textContent = `🎬 ${category}`;
    categoryContainer.appendChild(badge);
  });
}

// แสดงรายการหนังแนะนำ (3 เรื่องแรก)
function renderFeaturedMovies() {
  const grid = document.getElementById("featuredMovies");
  const featured = MOVIES_DATA.slice(0, 3); // Subset ของภาพยนตร์แนะนำ

  grid.innerHTML = featured.map(movie => `
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