import { useEffect, useState } from 'react';
import { Skeleton } from '@chakra-ui/react';

import { lambdaURL } from '#/utils';
import {
  BlogPosts,
  BlogPost,
  YearBreadcrumbs,
} from '#/components/blog/BlogPosts';
import {
  BlogContainer,
  BlogPostsContainer,
} from '#/components/blog/Containers';

export default function Year() {
  const [posts, setPosts] = useState([]);
  const [year, setYear] = useState(2019);

  useEffect(() => {
    let subscribed = true;

    if (subscribed) {
      fetch(`${lambdaURL}/blog`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          year,
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          setPosts(json.posts);
        });
    }
    return () => {
      subscribed = false;
    };
  }, [year]);

  return (
    <BlogContainer>
      <YearBreadcrumbs
        handleBreadcrumbClick={(selected) => {
          if (selected !== year) {
            setYear(selected);
          }
        }}
      />
      {
        <BlogPostsContainer>
          <BlogPosts
            posts={posts}
            renderBlogPost={({
              name,
              chip,
              min,
              date,
              renderedPreview,
              aboveDivider,
              belowDivider,
              title,
            }) => (
              <Skeleton
                key={name}
                isLoaded={posts.length > 0}
                fadeDuration={0.7}>
                <BlogPost
                  year={year}
                  name={name}
                  chip={chip}
                  min={min}
                  date={date}
                  renderedPreview={renderedPreview}
                  aboveDivider={aboveDivider}
                  belowDivider={belowDivider}
                  title={title}
                />
              </Skeleton>
            )}
          />
        </BlogPostsContainer>
      }
    </BlogContainer>
  );
}
