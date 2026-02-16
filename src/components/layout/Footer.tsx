"use client";

import { useTranslation } from "@/i18n";
import siteConfig from "@/data/siteConfig.json";

export default function Footer() {
  const { locale } = useTranslation();
  const config = siteConfig;

  return (
    <footer className="bg-gray-900 dark:bg-gray-900 text-gray-300 border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-3">
              {config.labName[locale]}
            </h3>
            <p className="text-sm text-gray-400">
              {config.department[locale]}
              <br />
              {config.university[locale]}
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Contact</h4>
            <div className="text-sm space-y-1.5">
              <p>{config.address[locale]}</p>
              <p>Tel: {config.phone}</p>
              <p>Email: {config.email}</p>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Links</h4>
            <div className="text-sm space-y-1.5">
              <a
                href={`mailto:${config.email}`}
                className="block hover:text-white transition-colors"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} {config.labName[locale]}. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
