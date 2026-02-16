"use client";

import { useState } from "react";
import { useTranslation } from "@/i18n";
import siteConfig from "@/data/siteConfig.json";
import type { LocalizedString } from "@/types";

interface FaqItem {
  question: LocalizedString;
  answer: LocalizedString;
  order: number;
}

export default function SupportPageClient({
  faqItems,
}: {
  faqItems: FaqItem[];
}) {
  const { t, locale } = useTranslation();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <h1 className="text-3xl font-bold mb-10">
        {locale === "ko" ? "지원 안내" : "Support"}
      </h1>

      {/* Recruitment Info */}
      <section className="mb-12">
        <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-6">
          <h2 className="font-semibold text-primary-900 dark:text-primary-100 mb-2 text-lg">
            {locale === "ko"
              ? "대학원생 모집 안내"
              : "Graduate Student Recruitment"}
          </h2>
          <p className="text-sm text-primary-700 dark:text-primary-300 leading-relaxed">
            {locale === "ko"
              ? "저희 연구실에서는 보안 연구에 관심 있는 석사 및 박사과정 학생을 모집하고 있습니다. 지원을 원하시는 분은 이메일로 CV와 간단한 자기소개 및 관심 연구 분야를 보내주세요."
              : "We are recruiting M.S. and Ph.D. students who are interested in security research. Please send your CV and research interests via email."}
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">
          {locale === "ko" ? "자주 묻는 질문" : "FAQ"}
        </h2>
        <div className="space-y-3">
          {faqItems.map((item, index) => (
            <FaqAccordion
              key={index}
              question={item.question[locale]}
              answer={item.answer[locale]}
            />
          ))}
          {faqItems.length === 0 && (
            <p className="text-gray-400 text-center py-8">
              {locale === "ko"
                ? "등록된 질문이 없습니다."
                : "No FAQs available."}
            </p>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6">
          {locale === "ko" ? "연락처" : "Contact"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">
                {siteConfig.labName[locale]}
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                {siteConfig.department[locale]}
                <br />
                {siteConfig.university[locale]}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  {t("contact.address")}
                </h4>
                <p className="text-gray-800 dark:text-gray-200">
                  {siteConfig.address[locale]}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  {t("contact.phone")}
                </h4>
                <p className="text-gray-800 dark:text-gray-200">
                  {siteConfig.phone}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  {t("contact.email")}
                </h4>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-primary-600 dark:text-primary-400 hover:underline"
                >
                  {siteConfig.email}
                </a>
              </div>
            </div>

          </div>

          {/* Map */}
          <div>
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
              {t("contact.directions")}
            </h4>
            <div className="rounded-xl overflow-hidden aspect-[4/3]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3220.0!2d126.6828!3d35.9468!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357014a3a2d6e8e5%3A0x1a4f4f2a1a5b5b5b!2z6rWt66a96rWw7IKw64yA7ZWZ6rWQ!5e0!3m2!1sko!2skr!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={locale === "ko" ? "캠퍼스 위치" : "Campus Location"}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function FaqAccordion({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
      >
        <span className="font-medium text-gray-900 dark:text-gray-100 pr-4">
          {question}
        </span>
        <svg
          className={`w-5 h-5 text-gray-400 shrink-0 transition-transform ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {open && (
        <div className="px-6 pb-4">
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
}
