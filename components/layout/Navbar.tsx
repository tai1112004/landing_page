"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

const links = [
  ["overview", "Tổng quan"], ["roadmap", "Lộ trình"], ["technology", "Công nghệ"], ["projects", "Dự án"], ["outcomes", "Đầu ra"], ["careers", "Nghề nghiệp"],
];

const priorityLinks = [
  ["overview", "Tổng quan"], ["feedback", "Feedback"], ["classroom", "Hình ảnh lớp"], ["mindset", "Kết quả"], ["roadmap", "Lộ trình"], ["faq", "FAQ"],
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState("overview");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)), { rootMargin: "-30% 0px -55% 0px" });
    priorityLinks.forEach(([id]) => { const section = document.getElementById(id); if (section) observer.observe(section); });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { observer.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, []);

  const goTo = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setOpen(false); };

  return (
    <header className={`site-nav ${scrolled ? "is-scrolled" : ""}`}>
      <div className="nav-inner">
        <button className="brand" onClick={() => goTo("overview")} aria-label="Về đầu trang"><span className="brand-mark">AI5</span><span className="brand-dot">.</span><span>VN</span></button>
        <nav className={`nav-links ${open ? "is-open" : ""}`} aria-label="Điều hướng chính">
          {priorityLinks.map(([id, label]) => <button key={id} className={active === id ? "active" : ""} onClick={() => goTo(id)}>{label}</button>)}
          <button className="nav-cta" onClick={() => goTo("contact")}>Đăng ký tư vấn <ArrowUpRight size={15} /></button>
        </nav>
        <button className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? "Đóng menu" : "Mở menu"}>{open ? <X /> : <Menu />}</button>
      </div>
      <div className="nav-progress" style={{ transform: `scaleX(${progress})` }} />
    </header>
  );
}
