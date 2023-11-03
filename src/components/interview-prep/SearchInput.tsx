import { useEffect, useState } from 'react';

export default function SearchInput() {
  const [searchTerm, setSearchTerm] = useState('');
  const [apiCallCount, setApiCallCount] = useState(0);

  useEffect(() => {
    if (searchTerm) {
      // ...api call logic
      setApiCallCount((prev) => prev + 1);
    }
  }, [searchTerm]);

  return (
    <div className="flex max-w-xs flex-col space-y-1 border-2 border-teal-400 border-dashed p-4">
      <label htmlFor="search">Search</label>
      <input
        id="search"
        type="search"
        autoComplete="off"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <p>API calls: {apiCallCount}</p>
    </div>
  );
}
