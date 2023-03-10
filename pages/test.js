import React, { useState } from "react";

const test = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [timeoutId, setTimeoutId] = useState(null);

  const handleInputChange = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    console.log(searchTerm);
    if (timeoutId) {
      clearTimeout(timeoutId); // Xóa timeout trước đó nếu còn tồn tại
    }

    if (searchTerm.length > 0) {
      const newTimeoutId = setTimeout(() => {
        fetch(
          `http://localhost:8080/QLNT-Server/nhan-vien/thuoc-va-loai-thuoc/tim-thuoc?keyword=${encodeURIComponent(
            searchTerm
          )}`
        )
          .then((response) => response.json())
          .then((results) => {
            if (Array.isArray(results)) {
              setSuggestions(results.slice(0, 5));
              console.log(results);
            } else {
              setSuggestions([]);
            }
          });
      }, 500);
      setTimeoutId(newTimeoutId);
    } else {
      setSuggestions([]);
    }
  };
  return (
    <div>
      <input type="text" value={searchTerm} onChange={handleInputChange} />
      <ul className="list-group">
        {suggestions.map((suggestion) => (
          <li class="list-group-item w-25" key={suggestion.maThuoc}>
            {suggestion.tenThuoc}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default test;
