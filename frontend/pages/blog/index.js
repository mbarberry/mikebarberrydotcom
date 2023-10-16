import { useContext, useEffect, useState } from 'react';

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
  const [posts, setPosts] = useState([]);
  const [year, setYear] = useState(years[0]);

  const { dataRef, yearRef } = useContext(CacheContext);

  const getYear = () => {
    return yearRef.current;
  };
  const didYearChange = (year) => {
    return yearRef.current !== year;
  };
  const updateYear = (year) => {
    yearRef.current = year;
  };
  const addYearToCache = (year, data) => {
    const updatedCache = { ...dataRef.current };
    updatedCache[year] = data;
    dataRef.current = updatedCache;
  };

  useEffect(() => {
    let subscribed = true;

    if (subscribed) {
      const changedYear = didYearChange(year);
      if (changedYear) {
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
            updateYear(year);
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
          years={years}
          selectedYear={year}
          selectBreadcrumb={(year) => {
            setYear(year);
          }}
          renderBreadcrumb={({ year, isFirst, handleClick }) => (
            <YearBreadcrumb
              key={year}
              year={year}
              handleClick={handleClick}
              isFirst={isFirst}
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
