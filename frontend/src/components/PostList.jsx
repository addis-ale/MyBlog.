import { useInfiniteQuery } from "@tanstack/react-query";
import PostListItem from "./PostListItem";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchParams } from "react-router-dom";
const fetchPosts = async ({ pageParam, searchParams }) => {
  const searchParamObj = Object.fromEntries(searchParams);
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts`, {
    params: { page: pageParam, limit: 5, ...searchParamObj },
  });
  return res;
};
const PostList = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["posts", searchParams.toString()],
    queryFn: ({ pageParam = 1 }) => fetchPosts({ pageParam, searchParams }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasMore ? pages.length + 1 : undefined,
  });

  const allPosts = data?.pages?.flatMap((page) => page.data.posts) || [];
  return status === "pending" ? (
    <p>Loading...</p>
  ) : status === "error" ? (
    <p>Error: {error.message}</p>
  ) : (
    <>
      <InfiniteScroll
        dataLength={allPosts.length} //This is important field to render the next data
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={<h4>Loading more posts...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>All posts loaded.</b>
          </p>
        }
      >
        {allPosts.map((post) => (
          <PostListItem key={post.id} post={post} />
        ))}
      </InfiniteScroll>
    </>
  );
};

export default PostList;
