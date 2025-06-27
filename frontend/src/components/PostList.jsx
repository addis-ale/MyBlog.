import { useInfiniteQuery } from "@tanstack/react-query";
import PostListItem from "./PostListItem";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
const PostList = () => {
  const fetchPosts = async ({ pageParam }) => {
    const res = await axios("/api/posts", {
      params: { page: pageParam, limit: 5 },
    });
    return res;
  };
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasMore ? pages.length + 1 : undefined,
  });

  const allPosts = data?.pages?.flatMap((page) => page.data.posts) || [];
  console.log(allPosts);
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
