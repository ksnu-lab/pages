"use client";

import { useState } from "react";
import { useTranslation } from "@/i18n";
import publicationsJson from "@/data/publications.json";
import type { Publication } from "@/types";

const publications = publicationsJson.publications as Publication[];

const typeFilters = [
  "all",
  "international",
  "domestic",
] as const;

export default function PublicationsPage() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<string>("all");

  const filtered =
    filter === "all"
      ? publications
      : publications.filter((p) => p.type === filter);

  const years = [...new Set(filtered.map((p) => p.year))].sort(
    (a, b) => b - a
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <h1 className="text-3xl font-bold mb-6">{t("publications.title")}</h1>

      {/* Filter */}
      <div className="flex flex-wrap gap-2 mb-10">
        {typeFilters.map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filter === type
                ? "bg-primary-600 text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            {t(`publications.${type}`)}
          </button>
        ))}
      </div>

      {/* Publications by year */}
      <div className="space-y-10">
        {years.map((year) => (
          <div key={year}>
            <h2 className="text-xl font-bold text-primary-700 dark:text-primary-400 mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
              {year}
            </h2>
            <div className="space-y-4">
              {filtered
                .filter((p) => p.year === year)
                .map((pub) => (
                  <div
                    key={pub.id}
                    className="pl-4 border-l-2 border-gray-200 dark:border-gray-700 hover:border-primary-400 dark:hover:border-primary-500 transition-colors"
                  >
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">{pub.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {pub.authors.join(", ")}
                    </p>
                    <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mt-1.5">
                      {pub.venue}, {pub.year}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-gray-400 text-center py-12">
          No publications in this category.
        </p>
      )}
    </div>
  );
}
