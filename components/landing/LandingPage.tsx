"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion, useInView, useScroll, useSpring } from "framer-motion";
import { ArrowDown, ArrowRight, ArrowUpRight, BadgeCheck, Bell, BriefcaseBusiness, Check, ChevronDown, CircleDot, Cloud, Code2, Database, FileText, GitBranch, GitCommitHorizontal, GraduationCap, Handshake, LockKeyhole, Network, RefreshCw, Rocket, Search, Server, ShieldCheck, Sparkles, Terminal, Users, Workflow, Zap } from "lucide-react";
import { GlobalBackground } from "@/components/effects/GlobalBackground";
import { ClassroomGallery } from "./ClassroomGallery";
import { FeedbackGallery } from "./FeedbackGallery";
import { careers, principles, programStats, roadmapStages, technologies } from "@/data/program";

function Reveal({ children, className = "", delay = 0, direction = "up", tabIndex }: { children: React.ReactNode; className?: string; delay?: number; direction?: "up" | "left" | "right" | "scale"; tabIndex?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.16 });
  const initial = direction === "scale" ? { opacity: 0, scale: 0.94 } : direction === "left" ? { opacity: 0, x: -30 } : direction === "right" ? { opacity: 0, x: 30 } : { opacity: 0, y: 34 };
  return <motion.div ref={ref} className={className} tabIndex={tabIndex} initial={initial} animate={inView ? { opacity: 1, x: 0, y: 0, scale: 1 } : initial} transition={{ duration: 0.72, delay, ease: [0.2, 0.7, 0.2, 1] }}>{children}</motion.div>;
}

function SectionTitle({ eyebrow, title, copy }: { eyebrow: string; title: React.ReactNode; copy?: string }) {
  return <div className="section-heading"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{copy && <p>{copy}</p>}</div>;
}

function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const numericValue = Number.parseInt(value, 10);
  const suffix = value.replace(/^\d+/, "");
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!inView || Number.isNaN(numericValue)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayValue(numericValue);
      return;
    }
    const start = performance.now();
    const duration = 900;
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(numericValue * eased));
      if (progress < 1) frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [inView, numericValue]);

  const formattedValue = displayValue >= numericValue
    ? String(displayValue).padStart(value.length - suffix.length, "0")
    : String(displayValue);
  return <span ref={ref} aria-label={value}>{formattedValue}{suffix}</span>;
}

const nodeIcons = [Terminal, Code2, Server, Database, Cloud, Network];
function LearnerProof() {
  return <section id="feedback" className="section-shell learner-proof-section learner-proof-section--images"><Reveal><SectionTitle eyebrow="LEARNER PROOF" title={<>Học thật.<br /><span>Feedback thật.</span></>} copy="Ảnh chụp nguyên bản từ học viên, giữ nguyên ngữ cảnh để bạn tự đánh giá trải nghiệm học tập." /></Reveal><FeedbackGallery /></section>;
}

function HeroArchitecture() {
  const nodes = ["USER", "NEXT.JS", "REST API", "SPRING BOOT", "DATABASE", "DOCKER", "CLOUD", "MONITORING"];
  const [activeNode, setActiveNode] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setActiveNode((current) => (current + 1) % nodes.length), 6000 / nodes.length);
    return () => window.clearInterval(timer);
  }, []);
  return <div className="architecture" aria-label="Luồng từ người dùng đến hệ thống production">
    <div className="arch-label">SYSTEM FLOW <span>LIVE</span></div>
    <svg className="arch-connections" viewBox="0 0 500 520" fill="none" aria-hidden="true"><path className="connection-path" d="M54 70 L205 145 L58 224 L258 228 L155 318 L406 390 L241 480 L423 122" /><circle className="connection-packet" r="4"><animateMotion dur="6s" repeatCount="indefinite" path="M54 70 L205 145 L58 224 L258 228 L155 318 L406 390 L241 480 L423 122" /></circle></svg><div className="arch-line" />
    {nodes.map((node, index) => { const Icon = nodeIcons[index % nodeIcons.length]; return <motion.div className={`arch-node node-${index} ${index === activeNode ? "is-active" : index < activeNode ? "is-passed" : ""}`} key={node} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.35 + index * 0.12, duration: 0.5 }}><div className="arch-icon"><Icon size={15} /></div><div><small>{index === 0 ? "ENTRY POINT" : index === nodes.length - 1 ? "OBSERVE" : `LAYER 0${index}`}</small><strong>{node}</strong></div><span className="status-dot" /></motion.div>; })}
    <motion.div className="data-packet" animate={{ opacity: [0, 1, 1, 0] }} transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 2 }} />
    <div className="arch-caption"><span className="pulse" />request → response <b>production ready</b></div>
  </div>;
}

function MetricStrip() { return <div className="metric-strip">{programStats.map((item, index) => <Reveal key={item.label} delay={1.2 + index * 0.08}><div className="metric"><strong><CountUp value={item.value} /></strong><span>{item.label}</span></div></Reveal>)}</div>; }

function HeroRoadmapPreview() {
  const [activeStage, setActiveStage] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setActiveStage((current) => (current + 1) % roadmapStages.length), 5500 / roadmapStages.length);
    return () => window.clearInterval(timer);
  }, []);
  return <div className="hero-roadmap-preview"><div className="hero-roadmap-label"><span>15-MONTH ROADMAP</span><b>8 STAGES / ONE SYSTEM</b></div><div className="hero-roadmap-system"><div className="vertical-roadmap"><div className="vertical-roadmap-line" />{roadmapStages.map((stage, index) => <div className={`vertical-roadmap-stage ${index === activeStage ? "active" : index < activeStage ? "passed" : ""}`} key={stage.id}><span>{stage.id}</span><i /><strong>{stage.name}</strong></div>)}<motion.div className="vertical-roadmap-packet" animate={{ top: ["3%", "97%"], opacity: [0, 1, 1, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }} /></div><div className="roadmap-architecture"><HeroArchitecture /></div></div></div>;
}

function HeroProofCard() {
  return <aside className="hero-proof-card hero-proof-card--trust" aria-label="Cách AI5.VN đồng hành cùng học viên"><div className="hero-proof-card-top"><span><i /> LEARNING PARTNER</span><span>PROOF / REAL WORK</span></div><div className="hero-proof-trust-title">Học để<br /><em>làm được việc.</em></div><ul><li>Được chấm và review code.</li><li>Hiểu sai ở đâu, vì sao sai.</li><li>Đồng hành đến khi hiểu bản chất.</li></ul><div className="hero-proof-card-foot"><Check size={16} aria-hidden="true" /> HỌC THẬT · REVIEW THẬT</div></aside>;
}

function Hero() {
  return <section id="overview" className="hero section-shell"><div className="hero-orbit orbit-one" /><div className="hero-content"><Reveal delay={0.1}><div className="hero-badge"><span className="pulse" /> SOFTWARE ENGINEER PROGRAM <b>AI5.VN · 2026</b></div></Reveal><Reveal delay={0.2}><h1><span>Học để làm được việc.</span><br /><em>Xây hệ thống thật.</em></h1></Reveal><Reveal delay={0.35}><p className="hero-copy">15 tháng từ Backend, Frontend đến DevSecOps — để bạn có dự án thật, portfolio thật và năng lực sẵn sàng cho công việc.</p></Reveal><Reveal delay={0.42}><div className="hero-stack" aria-label="Các lớp công nghệ"><span>JAVA / SPRING BOOT</span><b>+</b><span>REACT / NEXT.JS</span><b>+</b><span>DEVSECOPS</span><b>+</b><span>AI ENGINEERING</span></div></Reveal><Reveal delay={0.48}><div className="hero-actions"><a className="button button-primary" href="#contact">Nhận tư vấn lộ trình <ArrowRight size={17} /></a><a className="button button-ghost" href="#feedback">Xem feedback học viên</a></div></Reveal><MetricStrip /></div><Reveal className="hero-visual" direction="right" delay={0.25}><HeroProofCard /></Reveal><a className="scroll-cue" href="#feedback"><span>HỌC VIÊN NÓI GÌ</span><ArrowDown size={16} /></a></section>;
}

const programPromise = [
  ["01", "XÂY ĐƯỢC", "Backend + Frontend", "Java, Spring Boot, React, Next.js."],
  ["02", "ĐƯA LÊN ĐƯỢC", "Production", "Docker, Cloud, CI/CD, security, monitoring."],
  ["03", "CHỨNG MINH ĐƯỢC", "Năng lực thật", "02 dự án thương mại và portfolio có minh chứng."],
];

const compactStages = [
  ["01", "Backend Java", "API · Database · Security"],
  ["02", "Frontend React / Next.js", "Product UI · Auth · Hiệu năng"],
  ["03", "SEO Web & AI", "Tìm kiếm · Đo lường · AI"],
  ["04", "DevSecOps & Cloud", "Docker · CI/CD · Monitoring"],
  ["05", "02 dự án thương mại", "Teamwork · Nghiệm thu · Bàn giao"],
  ["06", "Nghiên cứu khoa học", "Thực nghiệm · Báo cáo · Bảo vệ"],
  ["07", "Chứng chỉ công nghệ", "Chuẩn hóa năng lực"],
  ["08", "Freelance & bán code", "Portfolio · Proposal · Handover"],
];

function ProgramAtAGlance() {
  const outcomeEvidence = [
    ["01", "REPOSITORY", "Source code có cấu trúc, README và tài liệu để tiếp quản."],
    ["02", "PRODUCT DEMO", "Sản phẩm chạy được với API, giao diện và luồng nghiệp vụ rõ ràng."],
    ["03", "DEPLOYMENT", "Biết đưa hệ thống lên môi trường thật, theo dõi và xử lý sự cố."],
    ["04", "PORTFOLIO", "Hồ sơ có dự án, bằng chứng kỹ thuật và câu chuyện để trình bày."],
  ];
  return <section id="mindset" className="section-shell compact-intro-section outcome-section"><Reveal><SectionTitle eyebrow="KẾT QUẢ SAU 15 THÁNG" title={<>Không chỉ học thêm công nghệ.<br /><span>Bạn có một hệ thống năng lực.</span></>} copy="Từ code đầu tiên đến sản phẩm production, portfolio và hồ sơ đủ để tự tin bước vào thị trường." /></Reveal><div className="outcome-lead"><Reveal className="outcome-number" direction="left"><span>15</span><small>THÁNG ĐỂ XÂY NĂNG LỰC</small><strong>Từ người học<br /><em>→ người xây được hệ thống.</em></strong></Reveal><div className="program-promise-grid">{programPromise.map(([number, label, title, copy], index) => <Reveal className={"program-promise outcome-card outcome-card-" + (index + 1)} key={number} delay={index * 0.08}><span>{number} · {label}</span><h3>{title}</h3><p>{copy}</p></Reveal>)}</div></div><div className="outcome-evidence" aria-label="Bằng chứng đầu ra của chương trình">{outcomeEvidence.map(([number, label, copy], index) => <Reveal className="outcome-evidence-item" key={number} delay={index * 0.06}><span>{number}</span><div><strong>{label}</strong><p>{copy}</p></div>{index < outcomeEvidence.length - 1 && <ArrowRight className="outcome-evidence-arrow" size={16} aria-hidden="true" />}</Reveal>)}</div></section>;
  return <section id="mindset" className="section-shell compact-intro-section"><Reveal><SectionTitle eyebrow="PROGRAM AT A GLANCE" title={<>Một chương trình.<br /><span>Một đích đến rõ ràng.</span></>} copy="Trở thành Software Engineer có thể xây, deploy và bàn giao sản phẩm thật." /></Reveal><div className="program-promise-grid">{programPromise.map(([number, label, title, copy], index) => <Reveal className="program-promise" key={number} delay={index * 0.08}><span>{number} · {label}</span><h3>{title}</h3><p>{copy}</p></Reveal>)}</div></section>;
}

function CompactRoadmap() {
  return <section id="roadmap" className="section-shell compact-roadmap-section"><Reveal><SectionTitle eyebrow="15 THÁNG · 08 GIAI ĐOẠN" title={<>Lộ trình học để<br /><span>làm được việc.</span></>} copy="Đi từ nền tảng kỹ thuật đến sản phẩm, portfolio và cơ hội nghề nghiệp." /></Reveal><div className="compact-stage-grid">{roadmapStages.map((stage, index) => <Reveal className="compact-stage" key={stage.id} delay={index * 0.045} tabIndex={0}><span>{stage.id}</span><h3>{stage.name}</h3><p>{compactStages[index][2]}</p><div className="compact-stage-detail"><strong>HỌC ĐƯỢC GÌ</strong><div className="compact-stage-topics">{stage.topics.slice(0, 4).map((topic) => <span key={topic}>{topic}</span>)}</div><small>{stage.output}</small></div></Reveal>)}</div></section>;
}

function ProgramOutcomes() {
  return <section className="section-shell compact-outcomes-section"><Reveal><SectionTitle eyebrow="SAU CHƯƠNG TRÌNH" title={<>Không chỉ là CV.<br /><span>Là bộ hồ sơ năng lực.</span></>} copy="Có sản phẩm, có tài liệu kỹ thuật và có câu chuyện để nói trong buổi phỏng vấn." /></Reveal><div className="compact-outcomes"><Reveal className="compact-outcome" direction="left"><span>02</span><div><strong>Dự án thương mại</strong><p>Đi từ requirement đến deploy và bàn giao.</p></div></Reveal><Reveal className="compact-outcome" delay={0.08}><span>01</span><div><strong>Portfolio có minh chứng</strong><p>Repository, diagram, test, deploy và runbook.</p></div></Reveal><Reveal className="compact-outcome" direction="right" delay={0.16}><span>∞</span><div><strong>Hướng phát triển</strong><p>Backend, Frontend, Fullstack, DevOps hoặc Freelance.</p></div></Reveal></div></section>;
}

const programPrivileges = [
  ["01", "Lớp giới hạn 6 học viên", "Đào tạo sát sao, kèm 1:1 khi cần."],
  ["02", "Học một lần, quay lại học", "Không giới hạn, cập nhật công nghệ cùng các khóa sau."],
  ["03", "Hỗ trợ việc làm", "Định hướng vị trí phù hợp, mức lương khởi điểm từ 8 triệu/tháng."],
  ["04", "Hỗ trợ bài báo quốc tế", "Xây hồ sơ học thuật nếu muốn đi sâu trong ngành."],
  ["05", "Định hướng cao học", "Theo hướng ứng dụng hoặc nghiên cứu."],
  ["06", "Kết nối cơ hội nghề nghiệp", "Tại doanh nghiệp và đơn vị nhà nước, phù hợp năng lực."],
  ["07", "Đội ngũ giảng viên thực chiến", "Tech Lead 8+ năm kinh nghiệm, chủ doanh nghiệp và chuyên gia từ các tập đoàn công nghệ."],
  ["08", "Vượt qua tư duy Intern & Fresher", "Học cách làm như Junior Developer 2+ năm: dự án thật và quy trình thương mại."],
];
const privilegeIcons = [Users, RefreshCw, BriefcaseBusiness, FileText, GraduationCap, Handshake, BadgeCheck, Rocket];

function UrgencyOffer() {
  const [secondsLeft, setSecondsLeft] = useState(6 * 60 * 60);
  useEffect(() => {
    const timer = window.setInterval(() => setSecondsLeft((current) => current > 0 ? current - 1 : 0), 1000);
    return () => window.clearInterval(timer);
  }, []);
  const hours = String(Math.floor(secondsLeft / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((secondsLeft % 3600) / 60)).padStart(2, "0");
  const seconds = String(secondsLeft % 60).padStart(2, "0");
  return <section id="offer" className="section-shell urgency-offer-section"><div className="urgency-offer"><div><span className="eyebrow">ƯU ĐÃI TƯ VẤN TRONG 6 GIỜ</span><h2>Đăng ký để nhận tư vấn tận tình<br /><span>và ưu đãi học phí lên tới 11 triệu.</span></h2><p>Để lại thông tin trong thời gian ưu đãi để được tư vấn lộ trình phù hợp với mục tiêu của bạn.</p></div><div className="urgency-offer-action"><div className="urgency-timer" aria-label={`Thời gian ưu đãi còn ${hours} giờ ${minutes} phút ${seconds} giây`}><span>{hours}</span><i>:</i><span>{minutes}</span><i>:</i><span>{seconds}</span></div><div className="urgency-offer-cta"><span className="urgency-bell" aria-hidden="true"><Bell size={18} /></span><a className="button button-primary" href="#contact">Đăng ký nhận tư vấn <ArrowUpRight size={17} /></a></div></div></div></section>;
}

function InstructorTeam() {
  const points = [
    ["01", "Chấm & review code", "Bài làm được chấm, sửa trực tiếp theo tư duy hệ thống để biết sai ở đâu và vì sao sai."],
    ["02", "AI-Driven Learning", "Đọc code, phân tích thiết kế, so sánh phương án, debug và kiểm chứng tư duy."],
    ["03", "Định hướng thương mại", "Học để xây sản phẩm, deploy và bàn giao theo cách doanh nghiệp vận hành."],
  ];
  const instructorIcons = [Code2, Sparkles, BriefcaseBusiness];
  return <section id="instructors" className="section-shell instructor-section"><div className="instructor-layout"><Reveal className="instructor-intro" direction="left"><span className="eyebrow">ĐỘI NGŨ GIẢNG VIÊN</span><h2>Hơn cả một người Thầy.<br /><span>Một người đồng hành.</span></h2><p className="instructor-lead">🚀 Học để làm được việc, không học để hoàn thành giáo trình. Khác biệt nằm ở việc có người chấm, review code và đồng hành đến khi bạn hiểu bản chất.</p><p className="instructor-support">🧑‍💻 Bạn sẽ biết mình sai ở đâu, vì sao sai và lần sau cần làm tốt hơn thế nào.</p><div className="instructor-experience"><strong>11</strong><span>NĂM KINH NGHIỆM<br />IT & ĐỊNH HƯỚNG THƯƠNG MẠI</span></div></Reveal><div className="instructor-points">{points.map(([number, title, copy], index) => { const Icon = instructorIcons[index]; return <Reveal className="instructor-point" key={number} delay={index * .08}><span>{number}</span><Icon className="instructor-point-icon" size={20} aria-hidden="true" /><div><h3>{title}</h3><p>{copy}</p></div></Reveal>; })}</div></div></section>;
}

function ProgramPrivileges() {
  return <section className="section-shell privileges-section"><div className="privileges-layout"><Reveal><div className="privileges-copy"><span className="eyebrow">PROGRAM PRIVILEGES · 08</span><h2>Đặc quyền chỉ có tại<br /><span>Program AI5.VN.</span></h2><p>Học kỹ thuật là nền tảng. Sự đồng hành và cơ hội để đi tiếp mới tạo khác biệt.</p><a className="button button-ghost" href="#contact">Nhận tư vấn lộ trình <ArrowRight size={16} /></a></div></Reveal><div className="privileges-list">{programPrivileges.map(([number, title, copy], index) => { const Icon = privilegeIcons[index]; return <Reveal className="privilege" key={number} delay={index * 0.05}><span className="privilege-number">{number}</span><Icon size={18} aria-hidden="true" /><div><h3>{title}</h3><p>{copy}</p></div></Reveal>; })}</div></div></section>;
}

function Mindset() {
  const steps = ["CODE", "TEST", "SECURE", "DEPLOY", "MONITOR", "OPTIMIZE"];
  const details = [
    ["FOUNDATION", "CODE", "Biến requirement thành cấu trúc rõ ràng: module, API, dữ liệu và các điểm cần kiểm soát.", "OUTPUT · repository có cấu trúc và README để người khác tiếp quản."],
    ["CONFIDENCE", "TEST", "Mỗi thay đổi đều có bằng chứng: unit test, integration test và một cách kiểm tra lỗi có thể lặp lại.", "OUTPUT · test report và checklist review cho từng mốc."],
    ["TRUST", "SECURE", "Bảo vệ dữ liệu, quyền truy cập và dependency ngay từ lúc thiết kế thay vì chờ đến khi có sự cố.", "OUTPUT · security checklist + AI audit có giải thích."],
    ["DELIVERY", "DEPLOY", "Đưa sản phẩm qua CI/CD, môi trường staging và production với rollback rõ ràng.", "OUTPUT · pipeline chạy được và runbook xử lý deploy."],
    ["VISIBILITY", "MONITOR", "Đọc log, metric và trace để biết hệ thống đang khỏe hay đang âm thầm lỗi.", "OUTPUT · dashboard và incident evidence cho một tình huống thật."],
    ["GROWTH", "OPTIMIZE", "Đo bottleneck, cải thiện hiệu năng và chọn trade-off dựa trên dữ liệu thay vì cảm giác.", "OUTPUT · before/after benchmark và quyết định kỹ thuật."],
  ];
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const resumeRef = useRef<number | null>(null);
  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % steps.length), 3600);
    return () => window.clearInterval(timer);
  }, [paused, steps.length]);
  useEffect(() => () => { if (resumeRef.current) window.clearTimeout(resumeRef.current); }, []);
  const selectStep = (index: number) => {
    setActive(index);
    setPaused(true);
    if (resumeRef.current) window.clearTimeout(resumeRef.current);
    resumeRef.current = window.setTimeout(() => setPaused(false), 7000);
  };
  const current = details[active];
  return <section id="mindset" className="section-shell mindset-section"><div className="mindset-grid"><Reveal><SectionTitle eyebrow="BEYOND FRAMEWORKS" title={<>Không chỉ học cách viết code.<br /><span>Học cách xây một hệ thống.</span></>} copy="Một tính năng chỉ là điểm bắt đầu. Người kỹ sư phải hiểu hệ thống hoạt động ra sao, vì sao chọn kiến trúc đó, lỗi nằm ở đâu và cách bàn giao cho người tiếp quản." /><AnimatePresence mode="wait"><motion.div className="mindset-detail" key={current[1]} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: .28 }}><div className="mindset-detail-meta">{current[0]} <span>· ACTIVE STAGE {String(active + 1).padStart(2, "0")}</span></div><h3>{current[1]}</h3><p>{current[2]}</p><div className="mindset-detail-output">{current[3]}</div></motion.div></AnimatePresence></Reveal><Reveal className="mindset-flow" direction="right"><div className="flow-kicker">LEARN <span>→</span> BUILD <span>→</span> PROVE</div>{steps.map((step, index) => <button type="button" className={`flow-step ${index === active ? "is-active" : ""}`} key={step} onClick={() => selectStep(index)} aria-pressed={index === active}><span>0{index + 1}</span><strong>{step}</strong><i /></button>)}</Reveal></div></section>;
}

function Principles() { return <section className="section-shell principles-section"><Reveal><SectionTitle eyebrow="OPERATING SYSTEM" title="6 nguyên tắc xuyên suốt." copy="Không học công nghệ rời rạc. Mỗi quyết định đều phải trả lời được: dùng ở đâu, giải quyết gì và đo bằng bằng chứng nào." /></Reveal><div className="principles-list">{principles.map(([number, title, copy], index) => <Reveal key={number} delay={index * 0.06} className="principle-row"><span className="principle-number">{number}</span><h3>{title}</h3><p>{copy}</p><ArrowUpRight size={18} /></Reveal>)}</div></section>; }

function Roadmap() {
  const [active, setActive] = useState(0);
  const progressRef = useRef<HTMLDivElement>(null);
  const inView = useInView(progressRef, { amount: 0.35 });
  return <section id="roadmap" className="section-shell roadmap-section"><Reveal><SectionTitle eyebrow="THE 15-MONTH SYSTEM" title={<>8 giai đoạn.<br /><span>Một lộ trình xuyên suốt.</span></>} copy="Từ nền tảng Backend đến portfolio nghề nghiệp, mỗi stage mở khóa một lớp năng lực mới và tạo ra một sản phẩm có thể kiểm chứng." /></Reveal><div className="roadmap-layout"><div className="roadmap-rail" ref={progressRef}><motion.div className="rail-fill" initial={{ height: 0 }} animate={inView ? { height: "100%" } : { height: 0 }} transition={{ duration: 1.4 }} />{roadmapStages.map((stage, index) => <button key={stage.id} className={`rail-node ${active === index ? "active" : ""} ${index < active ? "passed" : ""}`} onClick={() => setActive(index)}><span>{stage.id}</span><i /></button>)}</div><div className="roadmap-details"><AnimatePresence mode="wait"><motion.div key={active} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.4 }}><div className="stage-meta"><span>STAGE {roadmapStages[active].id}</span><b>{roadmapStages[active].tag}</b></div><h3>{roadmapStages[active].name}</h3><p className="stage-summary">{roadmapStages[active].summary}</p><div className="topic-cloud">{roadmapStages[active].topics.map((topic) => <span key={topic}>{topic}</span>)}</div><div className="stage-output"><span className="output-icon"><Check size={15} /></span><div><small>OUTPUT / EVIDENCE</small><p>{roadmapStages[active].output}</p></div></div></motion.div></AnimatePresence></div></div><div className="roadmap-mobile-list">{roadmapStages.map((stage, index) => <details key={stage.id} open={index === 0}><summary><span>{stage.id}</span>{stage.name}<ChevronDown size={16} /></summary><p>{stage.summary}</p><div className="topic-cloud">{stage.topics.map((topic) => <span key={topic}>{topic}</span>)}</div></details>)}</div></section>;
}

function Technology() { return <section id="technology" className="section-shell technology-section"><div className="technology-copy"><Reveal><SectionTitle eyebrow="THE TOOLCHAIN" title={<>Công nghệ là lớp vỏ.<br /><span>Hệ thống là năng lực.</span></>} copy="Bạn đi qua các lớp của một sản phẩm thật: code, data, browser, network, server, container, cloud và monitoring." /></Reveal><Reveal className="tech-stamp" delay={0.2}><span>STACK / 2026</span><strong>BUILD<br /><em>→</em> SHIP</strong></Reveal></div><div className="tech-map">{technologies.map(([id, name, tag], index) => <Reveal key={id} delay={index * 0.06} className="tech-node"><span className="tech-index">{id}</span><div><small>{tag}</small><strong>{name}</strong></div><span className="tech-status"><i /> ready</span></Reveal>)}</div></section>; }

function LearningLoop() { const items = [["01", "Lý thuyết", "Nắm mô hình và trade-off"], ["02", "Demo / case", "Đọc hệ thống, lỗi production"], ["03", "Lab thật", "Code, deploy, debug, audit"], ["04", "Review", "Giải thích, kiểm tra, sửa"], ["05", "Bàn giao", "README, diagram, runbook"]]; return <section className="section-shell loop-section"><Reveal><SectionTitle eyebrow="THE LEARNING LOOP" title={<>Một chủ đề chỉ được xem là đã học<br /><span>khi bạn làm được và giải thích được.</span></>} /></Reveal><div className="loop-track">{items.map(([id, title, copy], index) => <Reveal key={id} delay={index * 0.1} className="loop-item"><span>{id}</span><div className="loop-icon">{index === 0 ? <Sparkles /> : index === 1 ? <Search /> : index === 2 ? <Terminal /> : index === 3 ? <ShieldCheck /> : <Check />}</div><h3>{title}</h3><p>{copy}</p>{index < items.length - 1 && <ArrowRight className="loop-arrow" size={18} />}</Reveal>)}</div></section>; }

function Projects() { return <section id="projects" className="section-shell projects-section"><Reveal><SectionTitle eyebrow="COMMERCIAL PROJECT EXPERIENCE" title={<>Project không chỉ để<br /><span>ghi vào CV.</span></>} copy="Bạn phải chứng minh được cách mình xây sản phẩm — từ requirement đến nghiệm thu, từ branch đến deploy." /></Reveal><div className="project-grid"><Reveal className="project-card project-one" direction="left"><div className="project-top"><span>PROJECT 01</span><Code2 size={20} /></div><h3>Business<br />Application</h3><p>Độ hoàn thiện end-to-end cho một sản phẩm nghiệp vụ có thể bàn giao.</p><div className="project-flow">{["REQUIREMENT", "ERD / API", "BACKEND", "FRONTEND", "AUTH", "TEST", "DEPLOY"].map((item, i) => <span key={item}>{item}{i < 6 && <ArrowDown size={13} />}</span>)}</div><div className="project-foot"><span>MONOLITH / MODULAR</span><span>END-TO-END</span></div></Reveal><Reveal className="project-card project-two" direction="right" delay={0.1}><div className="project-top"><span>PROJECT 02</span><Network size={20} /></div><h3>Scalable /<br />Integrated System</h3><p>Tăng độ khó với external API, queue, cache, resilience và observability.</p><div className="system-diagram"><div className="diagram-node">SERVICE A</div><div className="diagram-line" /><div className="diagram-node active">QUEUE</div><div className="diagram-line" /><div className="diagram-node">SERVICE B</div><div className="diagram-node small">CACHE</div></div><div className="project-foot"><span>SECURITY / SCALE</span><span>OBSERVE</span></div></Reveal></div></section>; }

function AIAndProduction() { const production = ["SOURCE", "BUILD", "TEST", "DOCKER", "CI/CD", "SERVER", "NGINX", "CLOUDFLARE", "MONITORING"]; return <><section className="section-shell ai-section"><Reveal><SectionTitle eyebrow="AI-ASSISTED ENGINEERING" title={<>AI tăng tốc kỹ sư.<br /><span>Không thay thế tư duy kỹ sư.</span></>} copy="AI có thể generate, refactor, test, audit, đọc log và tự động hóa. Kỹ sư phải hiểu, verify, debug và chịu trách nhiệm." /></Reveal><div className="ai-split"><Reveal className="ai-column can" direction="left"><span>AI CAN</span>{["GENERATE", "REFACTOR", "TEST", "AUDIT", "ANALYZE LOG", "AUTOMATE"].map((item) => <strong key={item}><Zap size={15} />{item}</strong>)}</Reveal><div className="ai-core"><span>AI</span><b>+</b><span>ENGINEER</span><ArrowRight /></div><Reveal className="ai-column must" direction="right"><span>ENGINEER MUST</span>{["UNDERSTAND", "VERIFY", "TEST", "DEBUG", "AUDIT", "TAKE RESPONSIBILITY"].map((item) => <strong key={item}><LockKeyhole size={15} />{item}</strong>)}</Reveal></div></section><section className="section-shell production-section"><Reveal><SectionTitle eyebrow="PRODUCTION PIPELINE" title={<>Code chỉ là<br /><span>điểm bắt đầu.</span></>} copy="Bạn học cách đưa một hệ thống từ source code lên môi trường thật, theo dõi, xử lý incident và quay lại deploy." /></Reveal><div className="pipeline">{production.map((item, index) => <Reveal className="pipeline-node" key={item} delay={index * 0.05}><span className={`pipeline-icon ${index === production.length - 1 ? "last" : ""}`}>{index === 0 ? <GitBranch /> : index === 1 ? <Workflow /> : index === 2 ? <Check /> : index === 3 ? <Code2 /> : index === 4 ? <Rocket /> : index === production.length - 1 ? <CircleDot /> : <Server />}</span><strong>{item}</strong>{index < production.length - 1 && <i />}</Reveal>)}</div><div className="incident-bar"><span className="incident-dot" /> INCIDENT DETECTED <b>→</b> LOG <b>→</b> DEBUG <b>→</b> ROLLBACK / FIX <b>→</b> DEPLOY</div></section></>; }

function Portfolio() {
  const projects = [
    { name: "Backend Service", tag: "SPRING BOOT · API", summary: "Nền tảng backend có thể kiểm thử, bảo mật và bàn giao.", artifacts: ["Backend repository", "API documentation", "Security checklist + AI audit", "Monitoring + incident evidence", "Handover documentation"] },
    { name: "Frontend Platform", tag: "REACT · NEXT.JS", summary: "Giao diện sản phẩm thật, tối ưu trải nghiệm và hiệu năng.", artifacts: ["Frontend repository", "Architecture diagram + ERD", "Test report + code review", "SEO + performance audit", "Deployment checklist"] },
    { name: "Commercial #01", tag: "BUSINESS APPLICATION", summary: "Dự án thương mại đầu tiên đi từ requirement đến nghiệm thu.", artifacts: ["02 commercial projects", "Architecture diagram + ERD", "CI/CD + deploy / rollback", "Test report + code review", "Client handover notes"] },
    { name: "Commercial #02", tag: "INTEGRATED SYSTEM", summary: "Hệ thống tích hợp có queue, cache, observability và phương án xử lý sự cố.", artifacts: ["API documentation", "Security checklist + AI audit", "Research report + defense", "Monitoring + incident evidence", "Production runbook"] },
  ];
  const [activeProject, setActiveProject] = useState(0);
  const [paused, setPaused] = useState(false);
  const resumeRef = useRef<number | null>(null);
  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => setActiveProject((current) => (current + 1) % projects.length), 4800);
    return () => window.clearInterval(timer);
  }, [paused, projects.length]);
  useEffect(() => () => { if (resumeRef.current) window.clearTimeout(resumeRef.current); }, []);
  const selectProject = (index: number) => {
    setActiveProject(index);
    setPaused(true);
    if (resumeRef.current) window.clearTimeout(resumeRef.current);
    resumeRef.current = window.setTimeout(() => setPaused(false), 8000);
  };
  const current = projects[activeProject];
  return <section id="outcomes" className="section-shell portfolio-section"><div className="portfolio-heading"><Reveal><SectionTitle eyebrow="PORTFOLIO / EVIDENCE" title={<>CV nói bạn biết gì.<br /><span>Portfolio chứng minh bạn đã làm gì.</span></>} copy="Sau 15 tháng, bạn không chỉ mang theo danh sách công nghệ. Bạn mang theo một hệ thống năng lực có thể mở ra, đọc, test và tiếp quản." /></Reveal><Reveal className="workspace-tabs" direction="right"><span className="tab-active">README.md</span><span>ARCHITECTURE</span><span>API</span><span>SECURITY</span><span>DEPLOY</span></Reveal></div><div className="portfolio-workspace"><div className="workspace-sidebar"><span>PROJECTS</span>{projects.map((project, index) => <button type="button" className={index === activeProject ? "selected" : ""} key={project.name} onClick={() => selectProject(index)} aria-pressed={index === activeProject}><GitCommitHorizontal size={14} />{project.name}</button>)}</div><div className="artifact-list"><div className="portfolio-selection-head"><span>{current.tag}</span><strong>{current.summary}</strong></div>{current.artifacts.map((item, index) => <Reveal key={`${activeProject}-${item}`} delay={index * 0.05} className="artifact"><span><Check size={14} /></span><p>{item}</p><small>{String(index + 1).padStart(2, "0")}</small></Reveal>)}</div></div></section>;
}

function OutcomesAndCareers() { return <><section className="section-shell competency-section"><Reveal><SectionTitle eyebrow="COMPETENCY OUTPUT" title={<>Sau 15 tháng,<br /><span>bạn mang theo một hệ thống năng lực.</span></>} /></Reveal><div className="competency-map">{["Backend Engineering", "Frontend Engineering", "Fullstack Integration", "DevSecOps & Cloud", "Security & Reliability", "Performance & Troubleshooting", "AI-assisted Engineering", "SEO & Product Growth", "Research & Evidence", "Commercial & Professional"].map((item, index) => <Reveal key={item} delay={index * 0.04} className={`competency-node node-${index}`}><span>{String(index + 1).padStart(2, "0")}</span>{item}</Reveal>)}</div></section><section id="careers" className="section-shell career-section"><Reveal><SectionTitle eyebrow="CAREER PATH" title={<>Một nền tảng.<br /><span>Nhiều hướng phát triển.</span></>} copy="Chương trình mở ra các hướng đi theo thế mạnh và portfolio thực tế — không đóng khung bạn vào một chức danh duy nhất." /></Reveal><div className="career-tree"><div className="career-root"><span className="pulse" /> SOFTWARE ENGINEER</div><div className="career-branches">{careers.map((career, index) => <Reveal key={career} delay={index * 0.05} className="career-branch"><i /><span>{career}</span><ArrowUpRight size={14} /></Reveal>)}</div></div></section><section className="section-shell evaluation-section"><Reveal><SectionTitle eyebrow="EVALUATION" title={<>Không đánh giá bằng việc nhớ bao nhiêu.<br /><span>Đánh giá bằng việc làm được gì.</span></>} /></Reveal><div className="evaluation-flow">{[["01", "FOUNDATION", "quiz · mini-lab · explain"], ["02", "INTEGRATION", "backend · database · security · frontend"], ["03", "PRODUCTION", "deploy · CI/CD · monitoring · rollback"], ["04", "PROJECT", "architecture · review · acceptance"], ["05", "FINAL DEFENSE", "demo · trade-off · incident · AI audit"]].map(([id, title, copy], index) => <Reveal key={id} className="evaluation-step" delay={index * 0.08}><span>{id}</span><h3>{title}</h3><p>{copy}</p>{index < 4 && <ArrowRight size={17} />}</Reveal>)}</div></section></>; }

function FAQ() {
  const questions = [
    ["Người mới bắt đầu có theo được không?", "Có. Lộ trình đi từ nền tảng Java, frontend và tư duy hệ thống trước khi vào các phần production."],
    ["Lịch học và hình thức học như thế nào?", "Chương trình kéo dài 15 tháng, kết hợp buổi học kỹ thuật, thực hành, review và dự án thương mại."],
    ["Nếu bỏ lỡ một buổi học thì sao?", "Bạn có thể xem lại nội dung và tiếp tục theo lộ trình. Học viên cũng được hỗ trợ để không bị đứt mạch thực hành."],
    ["Sau khóa học có được hỗ trợ việc làm không?", "Chương trình hỗ trợ định hướng vị trí, hoàn thiện portfolio và chuẩn bị bằng chứng kỹ thuật cho quá trình ứng tuyển."],
    ["Học xong tôi có được học lại không?", "Có. Một đặc quyền của chương trình là được quay lại học và cập nhật công nghệ cùng các khóa sau."],
  ];
  const [open, setOpen] = useState(0);
  return <section id="faq" className="section-shell faq-section"><Reveal><SectionTitle eyebrow="CÂU HỎI THƯỜNG GẶP" title={<>Trước khi bắt đầu,<br /><span>bạn cần biết gì?</span></>} copy="Những câu hỏi thực tế nhất về cách học, đầu ra và sự đồng hành trong chương trình." /></Reveal><div className="faq-list">{questions.map(([question, answer], index) => <Reveal className={`faq-item${open === index ? " is-open" : ""}`} key={question} delay={index * 0.05}><button type="button" aria-expanded={open === index} onClick={() => setOpen(open === index ? -1 : index)}><span>{String(index + 1).padStart(2, "0")}</span><strong>{question}</strong><ChevronDown size={18} /></button><div className="faq-answer"><p>{answer}</p></div></Reveal>)}</div></section>;
}

function FinalCTA() { const [sent, setSent] = useState(false); return <section id="contact" className="section-shell final-section"><div className="final-lines" /> <Reveal><div className="final-copy"><span className="eyebrow">READY WHEN YOU ARE</span><h2>15 tháng để không chỉ học code —<br /><span>mà học cách trở thành một Software Engineer.</span></h2><p>Xây sản phẩm. Deploy production. Bảo mật hệ thống. Xử lý sự cố. Xây portfolio.</p></div></Reveal><Reveal className="contact-panel" direction="right"><div className="contact-panel-head"><span>START A CONVERSATION</span><Sparkles size={17} /></div>{sent ? <div className="success-state"><Check size={28} /><h3>Đã nhận thông tin.</h3><p>AI5.VN sẽ liên hệ với bạn trong thời gian phù hợp.</p><button className="button button-ghost" onClick={() => setSent(false)}>Gửi lại</button></div> : <form onSubmit={(event) => { event.preventDefault(); setSent(true); }}><label>Họ và tên<input required name="name" placeholder="Nguyễn Văn A" /></label><label>Số điện thoại<input required name="phone" placeholder="09xx xxx xxx" /></label><label>Email<input required type="email" name="email" placeholder="you@example.com" /></label><label>Mục tiêu học tập<select name="goal" defaultValue=""><option value="" disabled>Chọn một mục tiêu</option><option>Trở thành Fullstack Developer</option><option>Củng cố Backend / Frontend</option><option>Học DevSecOps & Cloud</option><option>Xây sản phẩm thương mại</option></select></label><button className="button button-primary" type="submit">Đăng ký tư vấn <ArrowUpRight size={17} /></button><small>Thông tin chỉ được dùng để tư vấn lộ trình phù hợp.</small></form>}</Reveal></section>; }

export function LandingPage() { const { scrollYProgress } = useScroll(); const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 }); useEffect(() => { document.documentElement.style.setProperty("--scroll-progress", "0"); return () => { document.documentElement.style.removeProperty("--scroll-progress"); }; }, []); return <MotionConfig reducedMotion="user"><GlobalBackground /><motion.div className="scroll-progress" style={{ scaleX }} /><main><Hero /><UrgencyOffer /><LearnerProof /><ClassroomGallery /><InstructorTeam /><ProgramPrivileges /><ProgramAtAGlance /><CompactRoadmap /><ProgramOutcomes /><FAQ /><FinalCTA /></main><footer className="site-footer"><div><span className="brand-mark">AI5</span><span className="brand-dot">.</span>VN</div><span>SOFTWARE ENGINEER / FULLSTACK DEVELOPER</span><p>Nội dung công nghệ, công cụ và case study có thể được điều chỉnh theo đầu vào lớp học, phiên bản công nghệ và nhu cầu thực tế của doanh nghiệp.</p><span>© 2026 AI5.VN</span></footer><div className="mobile-cta"><span className="mobile-offer-bell" aria-hidden="true"><Bell size={17} /></span><a href="#contact"><span>ƯU ĐÃI 11 TRIỆU</span><strong>ĐĂNG KÝ TƯ VẤN <ArrowUpRight size={16} /></strong></a></div></MotionConfig>; }
