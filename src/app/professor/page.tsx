"use client";

import { useTranslation } from "@/i18n";
import professorData from "@/data/professor.json";
import type { Professor } from "@/types";

const professor = professorData as Professor;

export default function ProfessorPage() {
  const { t, locale } = useTranslation();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <h1 className="text-3xl font-bold mb-10">{t("professor.title")}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Profile Card */}
        <div className="md:col-span-1">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl aspect-[3/4] flex items-center justify-center mb-4">
            <svg
              className="w-24 h-24 text-gray-300 dark:text-gray-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold">{professor.name[locale]}</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">{professor.title[locale]}</p>

          <div className="mt-6 space-y-2 text-sm">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <span className="font-medium">Email:</span>
              <a
                href={`mailto:${professor.email}`}
                className="text-primary-600 dark:text-primary-400 hover:underline"
              >
                {professor.email}
              </a>
            </div>
            {professor.phone && (
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <span className="font-medium">Tel:</span>
                <span>{professor.phone}</span>
              </div>
            )}
            {professor.office && (
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <span className="font-medium">Office:</span>
                <span>{professor.office}</span>
              </div>
            )}
          </div>

          {/* External Links */}
          <div className="mt-6 flex flex-wrap gap-2">
            {professor.links.googleScholar && (
              <a
                href={professor.links.googleScholar}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                Google Scholar
              </a>
            )}
            {professor.links.dblp && (
              <a
                href={professor.links.dblp}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                DBLP
              </a>
            )}
            {professor.links.orcid && (
              <a
                href={professor.links.orcid}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                ORCID
              </a>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="md:col-span-2 space-y-10">
          {/* Research Interests */}
          <section>
            <h3 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
              {t("professor.researchInterests")}
            </h3>
            <div className="flex flex-wrap gap-2">
              {professor.researchInterests.map((interest) => (
                <span
                  key={interest}
                  className="bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 px-3 py-1 rounded-full text-sm"
                >
                  {interest}
                </span>
              ))}
            </div>
          </section>

          {/* Education */}
          <section>
            <h3 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
              {t("professor.education")}
            </h3>
            <div className="space-y-3">
              {professor.education.map((edu, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-sm text-gray-400 font-mono w-12 shrink-0">
                    {edu.year}
                  </span>
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-200">{edu.degree}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{edu.institution}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Career */}
          <section>
            <h3 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
              {t("professor.career")}
            </h3>
            <div className="space-y-3">
              {professor.career.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-sm text-gray-400 w-28 shrink-0">
                    {item.period}
                  </span>
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-200">{item.position}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{item.organization}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Awards */}
          {professor.awards && professor.awards.length > 0 && (
            <section>
              <h3 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                {t("professor.awards")}
              </h3>
              <div className="space-y-3">
                {professor.awards.map((award, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-sm text-gray-400 font-mono w-12 shrink-0">
                      {award.year}
                    </span>
                    <div>
                      <p className="font-medium text-gray-800 dark:text-gray-200">{award.title}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {award.organization}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
