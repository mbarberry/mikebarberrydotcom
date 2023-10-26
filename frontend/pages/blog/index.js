import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { lambdaURL } from '#/utils';
import {
  BlogPosts,
  BlogPost,
  YearBreadcrumbs,
  YearBreadcrumb,
  BlogPostsWrapper,
  XSkeletons,
} from '#/components/blog/BlogPosts';
import {
  BlogContainer,
  BlogPostsContainer,
  BreadcrumbWrapper,
} from '#/components/blog/Containers';
import { CacheContext } from '#/components/context/CacheContext';

export async function getStaticProps() {
  try {
    const response = await fetch(`${lambdaURL}/blog/years`);
    const json = await response.json();

    return {
      props: {
        years: json.years,
      },
    };
  } catch (e) {
    console.log(`Error fetching all blog data:\n${e}`);
    return {
      props: {
        years: [],
      },
    };
  }
}

export default function Blog({ years }) {
  const router = useRouter();

  const { dataRef, yearRef, scrollRef } = useContext(CacheContext);

  const [posts, setPosts] = useState([]);
  const [year, setYear] = useState(yearRef.current || years[0].year);

  const addYearToCache = (year, data) => {
    const updatedCache = { ...dataRef.current };
    updatedCache[year] = data;
    dataRef.current = updatedCache;
  };

  const scrollOnDelay = () => {
    const id = setInterval(() => {
      const isLoading =
        scrollRef.current > document.querySelector('main').scrollHeight;
      if (!isLoading) {
        window.scrollTo({ top: scrollRef.current, behavior: 'smooth' });
        clearInterval(id);
      }
    }, 10);
  };

  useEffect(() => {
    let subscribed = true;
    if (subscribed) {
      scrollOnDelay();
      if (!(year in dataRef.current)) {
        fetch(`${lambdaURL}/blog/year`, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            year,
          }),
        })
          .then((res) => res.json())
          .then(({ posts }) => {
            setPosts(posts);
            addYearToCache(year, posts);
          });
      } else {
        setPosts(dataRef.current[year]);
      }
    }
    return () => {
      subscribed = false;
    };
  }, [year]);

  return (
    <BlogContainer>
      <BreadcrumbWrapper>
        <YearBreadcrumbs
          years={years.map(({ year }) => year)}
          selectedYear={year}
          selectBreadcrumb={(year) => {
            // Remember last viewed year.
            yearRef.current = year;
            // Reset position to
            // top when year changes.
            scrollRef.current = 0;
            setYear(year);
          }}
          renderBreadcrumb={({ year, isSelectedYear, handleClick }) => (
            <YearBreadcrumb
              key={year}
              year={year}
              handleClick={handleClick}
              isSelectedYear={isSelectedYear}
            />
          )}
        />
      </BreadcrumbWrapper>
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
                      key={name}
                      name={name}
                      handleClick={() => {
                        scrollRef.current = window.scrollY;
                        router.push(`/blog/${year}/${name}`);
                      }}
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
            // Show many skeletons as
            // blog posts.
            return (
              <XSkeletons
                x={years.filter((element) => element.year === year)[0].count}
              />
            );
          }
        }}
      />
    </BlogContainer>
  );
}
