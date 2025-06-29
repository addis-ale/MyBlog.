import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      const query = e.target.value;
      if (location.pathname.startsWith("/posts")) {
        const updatedSearchParams = Object.fromEntries(searchParams);
        updatedSearchParams.searchQuery = query;
        setSearchParams(updatedSearchParams);
      } else {
        navigate(`/posts?searchQuery=${encodeURIComponent(query)}`);
      }
    }
  };
  return (
    <div
      className="relative bg-gray-100 rounded-full p-2 flex items-center gap-2"
      onKeyDown={handleKeyPress}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="none"
        stroke="gray"
      >
        <circle cx="10.5" cy="10.5" r="7.5" />
        <line x1="16.5" y1="16.5" x2="22" y2="22" />
      </svg>
      <input
        type="text"
        placeholder="search a post..."
        className=" bg-transparent focus:outline-none"
      />
    </div>
  );
};

export default Search;
