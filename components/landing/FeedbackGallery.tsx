"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const feedbackImages = [
  { file: "feedback-01.png", label: "Feedback về kiến thức và cách giảng dạy" },
  { file: "feedback-02.png", label: "Feedback sau khi nhận việc" },
  { file: "feedback-03.png", label: "Feedback về lộ trình thực tế" },
  { file: "feedback-04.png", label: "Feedback về DevOps và Java" },
  { file: "feedback-05.png", label: "Feedback về chương trình sát thực tế" },
  { file: "feedback-06.png", label: "Feedback về trải nghiệm học tập" },
];

export function FeedbackGallery() {
  const items = [...feedbackImages, ...feedbackImages];
  const viewportRef = useRef<HTMLDivElement>(null);
  const inView = useInView(viewportRef, { amount: 0.05 });

  return (
    <section className="section-shell feedback-images-section" aria-labelledby="feedback-images-title">
      <div className="feedback-images-heading">
        <div className="section-heading">
          <span className="eyebrow">FEEDBACK GỐC</span>
          <h2 id="feedback-images-title">Người học nói bằng<br /><span>trải nghiệm thật.</span></h2>
        </div>
        <span className="feedback-images-note">DỪNG CHUỘT ĐỂ ĐỌC</span>
      </div>
      <div ref={viewportRef} className={`feedback-images-viewport${inView ? " is-active" : ""}`} tabIndex={0} aria-label="Ảnh feedback học viên">
        <div className="feedback-images-track">
          {items.map((item, index) => (
            <figure className="feedback-image-card" key={`${item.file}-${index}`} aria-hidden={index >= feedbackImages.length}>
              <a href={`/images/feedback/${item.file}`} target="_blank" rel="noreferrer" tabIndex={index >= feedbackImages.length ? -1 : undefined}>
                <Image src={`/images/feedback/${item.file}`} alt={index < feedbackImages.length ? item.label : ""} fill sizes="(max-width: 760px) 78vw, 31vw" quality={72} />
                <span> MỞ ẢNH <ArrowUpRight size={14} aria-hidden="true" /></span>
              </a>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
