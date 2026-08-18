// ฐานข้อมูลภาพยนตร์ยอดนิยม 10 เรื่อง (Universe U)
const MOVIES_DATA = [
  { 
    id: 1, 
    title: "Interstellar", 
    price: 220, 
    categories: ["Sci-Fi", "Drama"], 
    platform: "Major", 
    poster: "assets/movie1.jpg" 
  },
  { 
    id: 2, 
    title: "Inception", 
    price: 180, 
    categories: ["Sci-Fi", "Action"], 
    platform: "Netflix", 
    poster: "assets/movie2.jpg" 
  },
  { 
    id: 3, 
    title: "The Conjuring", 
    price: 160, 
    categories: ["Horror"], 
    platform: "Major", 
    poster: "assets/movie3.jpg" 
  },
  { 
    id: 4, 
    title: "John Wick: Chapter 4", 
    price: 200, 
    categories: ["Action"], 
    platform: "Netflix", 
    poster: "assets/movie4.jpg" 
  },
  { 
    id: 5, 
    title: "Oppenheimer", 
    price: 220, 
    categories: ["Drama"], 
    platform: "Disney+", 
    poster: "assets/movie5.jpg" 
  },
  { 
    id: 6, 
    title: "A Quiet Place", 
    price: 170, 
    categories: ["Sci-Fi", "Horror"], 
    platform: "Disney+", 
    poster: "assets/movie6.png" 
  },
  { 
    id: 7, 
    title: "The Dark Knight", 
    price: 200, 
    categories: ["Action", "Drama"], 
    platform: "Major", 
    poster: "assets/movie7.jpg" 
  },
  { 
    id: 8, 
    title: "Train to Busan", 
    price: 150, 
    categories: ["Horror", "Action"], 
    platform: "Netflix", 
    poster: "assets/movie8.jpg" 
  },
  { 
    id: 9, 
    title: "Alien", 
    price: 190, 
    categories: ["Sci-Fi", "Horror"], 
    platform: "Disney+", 
    poster: "assets/movie9.jpg" 
  },
  { 
    id: 10, 
    title: "Avatar: The Way of Water", 
    price: 240, 
    categories: ["Sci-Fi", "Action"], 
    platform: "Major", 
    poster: "assets/movie10.jpg" 
  }
];

// ฟังก์ชันดึง Watchlist จาก localStorage
function getWatchlist() {
  const saved = localStorage.getItem("cineverse_watchlist");
  return saved ? JSON.parse(saved) : [];
}

// ฟังก์ชันเพิ่มหนังลง Watchlist
function addToWatchlist(id) {
  let list = getWatchlist();
  if (!list.includes(id)) {
    list.push(id);
    localStorage.setItem("cineverse_watchlist", JSON.stringify(list));
    alert("เพิ่มเข้าสู่ Watchlist เรียบร้อยแล้ว!");
  } else {
    alert("ภาพยนตร์เรื่องนี้อยู่ใน Watchlist แล้ว");
  }
}