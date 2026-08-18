document.addEventListener("DOMContentLoaded", () => {
  renderWatchlist();
  renderRecommendations();
  calculateTotal();
});

// ดึงหนังจาก Watchlist มาแสดง
function renderWatchlist() {
  const container = document.getElementById("watchlistContainer");
  const listIds = getWatchlist();
  
  const watchlistMovies = MOVIES_DATA.filter(m => listIds.includes(m.id));

  if (watchlistMovies.length === 0) {
    container.innerHTML = `<p style="color: var(--text-sub); text-align: center; padding: 1.5rem;">ยังไม่มีภาพยนตร์ใน Watchlist<br><a href="products.html" style="color: var(--neon-glow);">คลิกที่นี่เพื่อไปเลือกชม</a></p>`;
    return;
  }

  container.innerHTML = watchlistMovies.map(m => `
    <div class="watchlist-item">
      <div>
        <strong style="color: #fff;">${m.title}</strong>
        <div style="font-size: 0.85rem; color: var(--text-sub);">${m.categories.join(', ')} | ${m.platform}</div>
      </div>
      <div style="display: flex; align-items: center; gap: 1rem;">
        <span style="color: var(--neon-glow); font-weight: bold;">${m.price} บ.</span>
        <button onclick="removeFromWatchlist(${m.id})" style="background: rgba(255, 0, 127, 0.2); border: 1px solid var(--accent-pink); color: var(--accent-pink); border-radius: 4px; padding: 0.2rem 0.5rem; cursor: pointer;">ลบ</button>
      </div>
    </div>
  `).join('');
}

// ลบออกจาก Watchlist
function removeFromWatchlist(id) {
  let list = getWatchlist();
  list = list.filter(itemId => itemId !== id);
  localStorage.setItem("cineverse_watchlist", JSON.stringify(list));
  renderWatchlist();
  renderRecommendations();
  calculateTotal();
}

// ล้าง Watchlist ทั้งหมด
function clearWatchlist() {
  localStorage.removeItem("cineverse_watchlist");
  renderWatchlist();
  renderRecommendations();
  calculateTotal();
}

// Discrete Math: Set Difference (U - Watchlist) แนะนำหนังที่ยังไม่ได้เลือก
function renderRecommendations() {
  const container = document.getElementById("recommendedContainer");
  const listIds = new Set(getWatchlist());

  // Difference: สมาชิกใน Universe ที่ไม่อยู่ใน Watchlist
  const unselectedMovies = MOVIES_DATA.filter(movie => !listIds.has(movie.id));

  if (unselectedMovies.length === 0) {
    container.innerHTML = `<p style="color: var(--text-sub); font-size: 0.85rem;">คุณได้เลือกชมภาพยนตร์ทั้งหมดในระบบแล้ว!</p>`;
    return;
  }

  container.innerHTML = unselectedMovies.slice(0, 3).map(m => `
    <div class="movie-card" style="font-size: 0.85rem;">
      <img src="${m.poster}" alt="${m.title}" style="height: 140px;">
      <div class="movie-card-body" style="padding: 0.6rem;">
        <p style="font-weight: bold; margin-bottom: 0.3rem;">${m.title}</p>
        <p style="color: var(--neon-glow); margin-bottom: 0.5rem;">${m.price} บ.</p>
        <button class="btn" style="padding: 0.3rem 0.6rem; font-size: 0.8rem;" onclick="addToWatchlistAndRefresh(${m.id})">+ เพิ่ม</button>
      </div>
    </div>
  `).join('');
}

function addToWatchlistAndRefresh(id) {
  addToWatchlist(id);
  renderWatchlist();
  renderRecommendations();
  calculateTotal();
}

// Discrete Math: Boolean Logic & If-Else คำนวณส่วนลด
function calculateTotal() {
  const listIds = getWatchlist();
  const watchlistMovies = MOVIES_DATA.filter(m => listIds.includes(m.id));
  
  const subtotal = watchlistMovies.reduce((sum, item) => sum + item.price, 0);

  const isStudent = document.getElementById("studentCheck").checked;
  const isWednesday = document.getElementById("wednesdayCheck").checked;
  const isVIP = document.getElementById("vipCheck").checked;
  const coupon = document.getElementById("couponCode").value.trim();

  let discountRate = 0;
  let logicApplied = [];

  // กฎ Logic ที่ 1: (Student ∧ Wednesday) -> ลด 30%
  if (isStudent && isWednesday) {
    discountRate = Math.max(discountRate, 0.30);
    logicApplied.push("โปรนักเรียนวันพุธ ($Student \\land Wednesday$) ลด 30%");
  }

  // กฎ Logic ที่ 2: (Subtotal >= 400 ∨ Coupon == 'CINE2026') -> ลด 15%
  if (subtotal >= 400 || coupon === "CINE2026") {
    discountRate = Math.max(discountRate, 0.15);
    logicApplied.push("โปรยอดครบ 400 หรือ โค้ดลด ($Total \\ge 400 \\lor Coupon$) ลด 15%");
  }

  // กฎ Logic ที่ 3: VIP -> ลด 10%
  if (isVIP) {
    discountRate = Math.max(discountRate, 0.10);
    logicApplied.push("สิทธิ์สมาชิก ($VIP$) ลด 10%");
  }

  const discountAmount = subtotal * discountRate;
  const finalTotal = subtotal - discountAmount;

  // Render ข้อมูล
  document.getElementById("subtotalDisplay").textContent = `${subtotal.toLocaleString()} บาท`;
  document.getElementById("discountDisplay").textContent = `-${discountAmount.toLocaleString()} บาท (${(discountRate * 100)}%)`;
  document.getElementById("finalTotalDisplay").textContent = `${finalTotal.toLocaleString()} บาท`;

  const logicBox = document.getElementById("logicExplanation");
  if (logicApplied.length > 0) {
    logicBox.innerHTML = `<strong>ตรรกะที่ตรงเงื่อนไข:</strong><br>${logicApplied.join('<br>')}`;
  } else {
    logicBox.textContent = "ตรรกะที่ใช้งาน: ไม่ตรงตามเงื่อนไขส่วนลดใดๆ (Discount = 0%)";
  }
}

function confirmOrder() {
  const listIds = getWatchlist();
  if (listIds.length === 0) {
    alert("กรุณาเลือกภาพยนตร์ลงใน Watchlist ก่อนทำรายการ");
    return;
  }
  alert("🎉 ดำเนินการสำเร็จ! ขอบคุณที่ใช้บริการ CineVerse");
  clearWatchlist();
}