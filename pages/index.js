import Link from 'next/link';
import { getPosts } from '../utils/mdx-utils';

import Footer from '../components/Footer';
import Header from '../components/Header';
import Layout, { GradientBackground } from '../components/Layout';
import ArrowIcon from '../components/ArrowIcon';
import { getGlobalData } from '../utils/global-data';
import SEO from '../components/SEO';

export default function Index({ posts, globalData }) {
  return (
    <Layout>
      <SEO title={globalData.name} description={globalData.blogTitle} />
      <Header name={globalData.name} />
      <main className="w-full">
        <h1 className="mb-12 text-3xl text-center lg:text-5xl">
          {globalData.blogTitle}
        </h1>

        {/* Container con 4 colonne su desktop */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {posts.map((post) => (
            <div
              key={post.filePath}
              className="transition border bg-white/10 border-gray-800/10 rounded-lg backdrop-blur-lg dark:bg-black/30 hover:bg-white/20 dark:hover:bg-black/50 dark:border-white/10 flex flex-col h-full"
              data-sb-object-id={`posts/${post.filePath}`}
            >
              <Link
                as={`/posts/${post.filePath.replace(/\.mdx?$/, '')}`}
                href={`/posts/[slug]`}
                className="block px-5 py-5 flex-grow focus:outline-hidden focus:ring-4 focus:ring-primary/50"
              >
                {post.data.date && (
                  <p
                    className="mb-2 font-bold uppercase text-sm opacity-60"
                    data-sb-field-path="date"
                  >
                    {post.data.date}
                  </p>
                )}
                <h2 className="text-lg md:text-xl" data-sb-field-path="title">
                  {post.data.title}
                </h2>
                {post.data.description && (
                  <p
                    className="mt-2 text-sm opacity-60 line-clamp-3"
                    data-sb-field-path="description"
                  >
                    {post.data.description}
                  </p>
                )}
                <div className="mt-3 flex items-center">
                  <span className="text-sm mr-2">Scopri di più</span>
                  <ArrowIcon className="w-4 h-4" />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </main>
      <Footer copyrightText={globalData.footerText} />
      <GradientBackground
        variant="large"
        className="fixed top-20 opacity-40 dark:opacity-60"
      />
      <GradientBackground
        variant="small"
        className="absolute bottom-0 opacity-20 dark:opacity-10"
      />
    </Layout>
  );
}

export function getStaticProps() {
  const posts = getPosts();
  const globalData = getGlobalData();

  return { props: { posts, globalData } };
}
