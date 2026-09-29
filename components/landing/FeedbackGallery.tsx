"use client";

import { ArrowUpRight } from "lucide-react";

const feedbackImages = [
  { file: "feedback-01.png", label: "Feedback về kiến thức và cách giảng dạy" },
  { file: "feedback-02.png", label: "Feedback sau khi nhận việc" },
  { file: "feedback-03.png", label: "Feedback về lộ trình thực tế" },
  { file: "feedback-04.png", label: "Feedback về DevOps và Java" },
];

export function FeedbackGallery() {
  const items = [...feedbackImages, ...feedbackImages];

  return (
    <section className="section-shell feedback-images-section" aria-labelledby="feedback-images-title">
      <div className="feedback-images-heading">
        <div className="section-heading">
          <span className="eyebrow">FEEDBACK GỐC · 04 ẢNH</span>
          <h2 id="feedback-images-title">Người học nói bằng<br /><span>trải nghiệm thật.</span></h2>
          <p>Ảnh chụp nguyên bản từ học viên, giữ nguyên ngữ cảnh để khách hàng tự đánh giá.</p>
        </div>
        <span className="feedback-images-note">DỪNG CHUỘT ĐỂ ĐỌC</span>
      </div>
      <div className="feedback-images-viewport" tabIndex={0} aria-label="Ảnh feedback học viên">
        <div className="feedback-images-track">
          {items.map((item, index) => (
            <figure className="feedback-image-card" key={`${item.file}-${index}`} aria-hidden={index >= feedbackImages.length}>
              <a href={`/images/feedback/${item.file}`} target="_blank" rel="noreferrer" tabIndex={index >= feedbackImages.length ? -1 : undefined}>
                <img src={`/images/feedback/${item.file}`} alt={index < feedbackImages.length ? item.label : ""} loading={index < feedbackImages.length ? "lazy" : "eager"} />
                <span> MỞ ẢNH <ArrowUpRight size={14} aria-hidden="true" /></span>
              </a>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
