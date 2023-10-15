import { useEffect, useState } from 'react';

import { lambdaURL } from '#/utils';
import {
  BlogPosts,
  BlogPost,
  YearBreadcrumbs,
  BlogPostsWrapper,
  XSkeletons,
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
      <BlogPostsWrapper
        isLoaded={posts.length > 0}
        render={(isLoaded) => {
          if (isLoaded) {
            return (
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
                  )}
                />
              </BlogPostsContainer>
            );
          } else {
            return <XSkeletons x={5} />;
          }
        }}
      />
    </BlogContainer>
  );
}
