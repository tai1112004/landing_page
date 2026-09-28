export const programStats = [
  { value: "15", label: "tháng" },
  { value: "08", label: "giai đoạn" },
  { value: "106+", label: "buổi kỹ thuật cốt lõi" },
  { value: "02", label: "dự án thương mại" },
];

export const principles = [
  ["01", "System over tools", "Học công cụ để giải quyết bài toán hệ thống và nói rõ trade-off."],
  ["02", "Production first", "Mỗi học phần hướng tới sản phẩm có thể build, deploy, quan sát và xử lý lỗi."],
  ["03", "Security by design", "Auth, secrets, validation, hardening và logging đi vào từ lúc thiết kế."],
  ["04", "AI-assisted · human-accountable", "AI tăng tốc generate, test, audit; kỹ sư vẫn xác minh và chịu trách nhiệm."],
  ["05", "Evidence-based learning", "Năng lực có bằng chứng: repository, commit, diagram, test, log và handover."],
  ["06", "Commercial & research readiness", "Làm việc theo team, nghiên cứu có dữ liệu và đưa năng lực ra thị trường."],
];

export const roadmapStages = [
  { id: "01", name: "Backend Java", tag: "ENGINEERING", color: "cyan", summary: "Từ Java core đến API, database, security và microservices.", topics: ["Java / OOP", "Spring Boot", "REST API", "SQL + JPA", "JWT / RBAC", "Testing", "Resilience"], output: "Backend service có API, security, test, observability và deploy readiness." },
  { id: "02", name: "Frontend React / NextJS", tag: "PRODUCT UI", color: "emerald", summary: "Xây trải nghiệm responsive, kết nối API và tổ chức source hướng production.", topics: ["HTML / CSS", "TypeScript", "React", "Next.js", "CRUD + forms", "Auth + state", "Performance"], output: "Ứng dụng NextJS hoàn chỉnh, có auth, dashboard, README và demo." },
  { id: "03", name: "SEO Web & AI", tag: "GROWTH", color: "amber", summary: "Làm sản phẩm được tìm thấy, đo lường được và tối ưu có căn cứ.", topics: ["Technical SEO", "Core Web Vitals", "Search Console", "GA4 mindset", "IA + schema", "AI workflow"], output: "SEO audit, performance backlog và dashboard theo dõi hành vi." },
  { id: "04", name: "DevSecOps & Cloud", tag: "PRODUCTION", color: "cyan", summary: "Đưa source code qua server, bảo vệ hệ thống và vận hành sau go-live.", topics: ["Linux + Network", "Cloud", "Docker", "Kubernetes", "CI/CD", "Cloudflare / WAF", "Monitoring"], output: "Production deployment, rollback, backup/restore và runbook bàn giao." },
  { id: "05", name: "02 dự án thương mại", tag: "DELIVER", color: "emerald", summary: "Làm việc theo requirement, sprint, review, staging, nghiệm thu và bảo hành.", topics: ["Requirement", "Architecture", "Team Git flow", "Acceptance", "Incident", "Handover"], output: "Hai sản phẩm end-to-end với hồ sơ kỹ thuật có thể kiểm chứng." },
  { id: "06", name: "Nghiên cứu khoa học", tag: "EVIDENCE", color: "amber", summary: "Đặt vấn đề, thiết kế thực nghiệm, đo lường và trình bày có căn cứ.", topics: ["Problem framing", "Related work", "Experiment", "Metrics", "Technical report", "Defense"], output: "Một research proposal, experiment plan và technical report." },
  { id: "07", name: "Chứng chỉ công nghệ", tag: "STANDARD", color: "cyan", summary: "Đối chiếu năng lực thực tế với track chứng chỉ phù hợp.", topics: ["Competency map", "Lab practice", "Mock test", "Readiness review", "Exam plan"], output: "Skill gap matrix và lộ trình chứng chỉ cá nhân hóa." },
  { id: "08", name: "Freelance & bán code", tag: "CAREER", color: "emerald", summary: "Biến năng lực kỹ thuật thành dịch vụ có scope, giá và bàn giao rõ.", topics: ["Discovery", "Estimate", "Proposal", "Change control", "Handover", "IP + support"], output: "Portfolio, service profile, proposal và handover pack." },
];

export const technologies = [
  ["01", "Java / Spring Boot", "BACKEND"], ["02", "React / Next.js", "FRONTEND"], ["03", "TypeScript", "LANGUAGE"],
  ["04", "PostgreSQL / JPA", "DATA"], ["05", "Docker / Kubernetes", "CONTAINER"], ["06", "GitHub Actions", "CI/CD"],
  ["07", "Linux / Nginx", "INFRA"], ["08", "Cloudflare / WAF", "SECURITY"],
];

export const portfolioArtifacts = ["Backend repository", "Frontend repository", "02 commercial projects", "Architecture diagram + ERD", "API documentation", "Test report + code review", "Security checklist + AI audit", "CI/CD + deploy / rollback", "Monitoring + incident evidence", "Research report + defense", "Handover documentation"];

export const careers = ["Java Backend Developer", "Frontend / NextJS Developer", "Fullstack Developer", "DevOps / DevSecOps Engineer", "Platform Engineering", "Technical Cloud Support", "Technical SEO / Web Performance", "Research / Engineering Track", "Freelance / Product Builder"];
