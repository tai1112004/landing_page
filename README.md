# AI5.VN — Software Engineer / Fullstack Developer

Landing page Next.js cho chương trình đào tạo 15 tháng, được dựng từ nội dung trong PDF chương trình.

## Chạy local

```bash
npm install
npm run dev
```

Mở `http://localhost:3000`.

Nếu PowerShell báo `No active Node.js version is configured`, máy đang ưu tiên shim nvm dù Node hệ thống đã được cài. Dùng Node hệ thống cho terminal hiện tại:

```powershell
$env:Path = "C:\Program Files\nodejs;" + $env:Path
node --version
npm --version
npm install
npm run dev
```

## Cấu trúc

- `app/` — App Router, metadata, global design system
- `components/landing/` — các section và tương tác chính của landing page
- `components/effects/` — background layer
- `components/layout/` — navbar
- `data/program.ts` — dữ liệu chương trình, tách khỏi phần trình bày
- `CONTENT-MAP.md` — content map nội bộ đối chiếu với PDF

## Motion & accessibility

Landing page dùng Framer Motion cho reveal, roadmap transition, hero architecture và scroll progress. CSS hover/transition xử lý các tương tác nhẹ. `prefers-reduced-motion` tắt background motion, packet loop và parallax-like effects.
