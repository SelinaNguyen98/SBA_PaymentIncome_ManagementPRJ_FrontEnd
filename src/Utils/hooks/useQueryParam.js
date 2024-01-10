import { useSearchParams } from "react-router-dom";

function useQueryParam() {
  const [searchParams, setSearchParams] = useSearchParams();
  return Object.fromEntries([...searchParams]);
}

export default useQueryParam