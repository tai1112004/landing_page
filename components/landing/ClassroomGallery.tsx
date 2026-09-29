"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Pause, Play, ArrowUpRight } from "lucide-react";

const photos = [
  { file: "01", width: 1908, height: 962, caption: "Thực hành landing page", alt: "Buổi học trực tuyến với phần chia sẻ dự án landing page và trao đổi của học viên" },
  { file: "02", width: 1548, height: 1600, caption: "Kết nối ngoài lớp học", alt: "Giảng viên và học viên cùng gặp mặt, giao lưu bên bàn ăn" },
  { file: "03", width: 1919, height: 1079, caption: "Trao đổi về dự án", alt: "Lớp học trực tuyến thảo luận về tài liệu nghiệm thu và bàn giao dự án" },
  { file: "04", width: 1920, height: 1080, caption: "Bài học về Abstraction", alt: "Giảng viên trình bày khái niệm Abstraction và ví dụ thiết kế hệ thống thanh toán" },
  { file: "05", width: 1894, height: 912, caption: "Sửa bài & thực hành CI/CD", alt: "Học viên chia sẻ sơ đồ Kubernetes trong buổi sửa bài và thực hành CI/CD" },
  { file: "06", width: 1067, height: 1801, caption: "Thực hành DevSecOps", alt: "Buổi học DevSecOps với phần thực hành cấu hình DNS trên Cloudflare" },
  { file: "07", width: 1920, height: 1080, caption: "Phân tích yêu cầu mới", alt: "Lớp học thảo luận yêu cầu bổ sung phương thức thanh toán VNPay vào hệ thống" },
  { file: "08", width: 1600, height: 1557, caption: "Cùng học, cùng phát triển", alt: "Giảng viên và học viên tại lớp với câu hỏi phỏng vấn về xử lý sự cố website" },
];

export function ClassroomGallery() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.05 });
  const [paused, setPaused] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);

  useEffect(() => {
    const updateVisibility = () => setTabVisible(!document.hidden);
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    return () => document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  return (
    <>
      <section ref={ref} id="classroom" className="section-shell classroom-section" aria-labelledby="classroom-title">
      <div className="classroom-heading">
        <div className="section-heading">
          <span className="eyebrow">HÌNH ẢNH LỚP HỌC</span>
          <h2 id="classroom-title">Những buổi học thật.<br /><span>Những kết nối thật.</span></h2>
          <p>Từ giờ thực hành, trao đổi dự án đến những buổi gặp gỡ ngoài lớp học — một góc hành trình cùng AI5.VN.</p>
        </div>
        <button type="button" className="classroom-toggle" aria-pressed={paused} aria-controls="classroom-photos" onClick={() => setPaused(!paused)}>
          {paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
          {paused ? "Tiếp tục" : "Tạm dừng"}
        </button>
      </div>
      <div id="classroom-photos" className="classroom-viewport" tabIndex={0} role="region" aria-label="Ảnh lớp học, chọn ảnh để xem kích thước đầy đủ">
        <div className="classroom-track" style={{ animationPlayState: inView && tabVisible && !paused ? "running" : "paused" }}>
          {[0, 1].map((copy) => (
            <div className="classroom-group" key={copy} aria-hidden={copy === 1 ? true : undefined}>
              {photos.map((photo) => (
                <figure className={`classroom-photo${photo.height > photo.width ? " portrait" : ""}`} key={photo.file}>
                  <a href={`/images/classroom/classroom-${photo.file}.png`} target="_blank" rel="noreferrer" tabIndex={copy === 1 ? -1 : undefined}>
                    <Image src={`/images/classroom/classroom-${photo.file}.png`} alt={copy === 0 ? photo.alt : ""} width={photo.width} height={photo.height} sizes={photo.height > photo.width ? "(max-width: 760px) 220px, 280px" : "(max-width: 760px) 84vw, 520px"} />
                  </a>
                  <figcaption><span>{photo.caption}</span><ArrowUpRight size={15} aria-hidden="true" /></figcaption>
                </figure>
              ))}
            </div>
          ))}
        </div>
      </div>
      <p className="classroom-hint">Dừng chuột để xem · Chọn ảnh để mở ảnh đầy đủ</p>
      </section>
    </>
  );
}
