import Image from 'next/image';
import Link from 'next/link';

import { BlogPost } from '@/entities/blog';
import { Typography } from '@/shared/ui/typography';

interface BlogPostCardProperties {
  post: BlogPost;
}

export const BlogPostCard = ({ post }: BlogPostCardProperties) => {
  return (
    <div className='flex flex-col overflow-hidden rounded-lg border bg-card shadow-sm transition-all hover:shadow-md'>
      <div className='relative h-48'>
        <Image
          fill
          alt={post.title}
          className='object-cover'
          src={post.image || '/placeholder.svg'}
        />
      </div>
      <div className='flex flex-1 flex-col p-6'>
        <Typography className='mb-2 text-muted-foreground' variant='small'>
          {post.date}
        </Typography>
        <Typography className='mb-2 text-xl font-semibold' variant='h3'>
          {post.title}
        </Typography>
        <Typography className='mb-6 flex-1' variant='muted'>
          {post.excerpt}
        </Typography>
        <Link
          className='font-medium text-primary hover:underline'
          href={`/blog/${post.slug}`}
        >
          Читать далее
        </Link>
      </div>
    </div>
  );
};
