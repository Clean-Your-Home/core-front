import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { BLOG_POSTS } from '@/entities/blog';
import { ROUTES } from '@/shared/config/routes';
import { Button } from '@/shared/ui/button';
import { BlogHeader } from './BlogHeader';
import { BlogPostCard } from './BlogPostCard';

export const BlogPreview = () => {
  return (
    <section className='py-16 md:py-24'>
      <div className='container mx-auto px-4'>
        <BlogHeader />

        <div className='mt-16 grid grid-cols-1 gap-8 md:grid-cols-3'>
          {BLOG_POSTS.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>

        <div className='mt-12 text-center'>
          <Button asChild>
            <Link href={ROUTES.BLOG}>
              Все статьи
              <ArrowRight className='ml-2 h-4 w-4' />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
