# 🍎 Poly Apple - Frontend

Đây là giao diện người dùng (Client-side) của tựa game **Poly Apple** - một trò chơi mang tính giáo dục và cạnh tranh, nơi người chơi vận dụng kiến thức Toán học (viết các phương trình đa thức) để vẽ ra đồ thị ăn những quả táo trên màn hình càng nhanh càng tốt.

## 🛠 Tech Stack & Versions

- **Core:** Vanilla JavaScript (ES6+), HTML5 Canvas, CSS3. (Không sử dụng Framework UI để tối ưu hiệu năng render Game).
- **Trình đóng gói (Bundler):** Vite (`^5.0.0`) - Giúp khởi tạo môi trường dev nhanh chóng và Hot Module Replacement (HMR).
- **Real-time Communication:** Socket.io-client (`^4.8.1`).

## 🚀 Cách chạy dự án (Local Development)

1. Mở Terminal tại thư mục `frontend/`.
2. Cài đặt các thư viện phụ thuộc:
   ```bash
   npm install
   ```
3. Khởi động môi trường Dev:
   ```bash
   npm run dev
   ```
4. Truy cập vào đường link được cung cấp (thường là `http://localhost:5173`). 
*(Lưu ý: Bạn cần phải bật cả thư mục Backend lên thì mới chơi được).*

## 📂 Tổ chức File (File Structure)

```text
frontend/
├── index.html       # File gốc chứa bộ khung Giao diện (Lobby, Game Screen, Summary).
├── style.css        # Toàn bộ CSS tự code tay, mang phong cách Game UI (Glassmorphism, Bouncy animations).
├── script.js        # "Trái tim" của Frontend. Xử lý Logic game, vẽ đồ thị Canvas và gọi Socket.
├── package.json     # Chứa danh sách các thư viện (Vite, socket.io-client).
└── README.md        # File tài liệu bạn đang đọc.
```

## ⚙️ Cách hoạt động của các Chức năng chính (Functionals)

- **UI Rendering (DOM Manipulation):** Game sử dụng Vanilla JS để ẩn/hiện các màn hình (`lobbyScreen`, `gameScreen`, `summaryScreen`) tuỳ theo state của game.
- **Canvas Graphing (`gameCanvas`):** Hệ tọa độ được vẽ thủ công bằng Javascript. Khi người dùng nhập một phương trình (VD: `x^2 + 2x`), Frontend sẽ phân tích chuỗi này (Parser) và tính toán từng toạ độ Y dựa trên X để vẽ ra một đường cong liên tục. 
- **Collision Detection (Phát hiện va chạm):** So sánh toạ độ của đường cong đồ thị và toạ độ của các quả táo trên màn hình. Nếu đồ thị chạm vào táo, gửi tín hiệu `updateGameState` lên Server báo cáo.
- **Real-time Syncing:** Frontend lắng nghe các sự kiện từ Server (như `playerJoined`, `gameStart`, `gameStateUpdated`) để đồng bộ vị trí táo bị ăn và lịch sử phương trình của đối thủ ngay lập tức.
