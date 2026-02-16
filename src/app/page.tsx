import { getAllNewsPosts, getNewsPostBySlug } from "@/lib/mdx";
import HomeClient from "./HomeClient";

export default function Home() {
  const allPosts = getAllNewsPosts();

  // Homepage: show only announcement posts, pinned first
  const newsPosts = allPosts
    .filter((post) => post.category === "announcement")
    .sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return 0; // keep date order within same pinned status
    })
    .map((post) => {
      if (!post.thumbnail) {
        const { content } = getNewsPostBySlug(post.slug);
        const match = content.match(/!\[[^\]]*\]\(([^)]+)\)/);
        if (match) {
          return { ...post, thumbnail: match[1] };
        }
      }
      return post;
    });

  return <HomeClient newsPosts={newsPosts} />;
}
