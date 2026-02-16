import { getAllNewsPosts } from "@/lib/mdx";
import NewsListClient from "./NewsListClient";

export default function NewsPage() {
  const posts = getAllNewsPosts();

  return <NewsListClient posts={posts} />;
}
