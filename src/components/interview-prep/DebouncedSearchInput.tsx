import { useEffect, useState } from 'react';

function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState('');
  useEffect(() => {
    const timeoutID = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(timeoutID);
    };
  }, [value, delay]);
  return debouncedValue;
}

export default function SearchInput() {
  const [searchTerm, setSearchTerm] = useState('');
  const [apiCallCount, setApiCallCount] = useState(0);
  const [debouncedAPICallCount, setDebouncedAPICallCount] = useState(0);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      // ...api call logic
      setDebouncedAPICallCount((prev) => prev + 1);
    }
  }, [debouncedSearchTerm]);
  useEffect(() => {
    if (searchTerm) {
      // count to compare with debouncedAPICallCount
      setApiCallCount((prev) => prev + 1);
    }
  }, [searchTerm]);

  return (
    <div className="flex max-w-xs flex-col space-y-1 border-2 border-dashed border-teal-400 p-4">
      <label htmlFor="search">Search</label>
      <input
        id="search"
        type="search"
        autoComplete="off"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <p>API calls w/out debounce: {apiCallCount}</p>
      <p>API calls w/ debounce : {debouncedAPICallCount}</p>
    </div>
  );
}
