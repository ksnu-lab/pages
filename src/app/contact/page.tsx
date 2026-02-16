import { getAllFaqItems } from "@/lib/mdx";
import SupportPageClient from "./SupportPageClient";

export default function ContactPage() {
  const faqItems = getAllFaqItems();

  return <SupportPageClient faqItems={faqItems} />;
}
