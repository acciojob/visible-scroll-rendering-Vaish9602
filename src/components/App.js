import React, { useRef, useState } from "react";

const ITEM_HEIGHT = 50;
const TOTAL_ITEMS = 1000;
const CONTAINER_HEIGHT = 500;

export default function App() {
  const scrollRef = useRef(null);

  const [range, setRange] = useState({
    start: 0,
    end: 10,
  });

  const handleScroll = () => {
    const scrollTop = scrollRef.current.scrollTop;

    const startIndex = Math.floor(scrollTop / ITEM_HEIGHT);
    const visibleCount = Math.ceil(CONTAINER_HEIGHT / ITEM_HEIGHT);
    const endIndex = startIndex + visibleCount;

    setRange({
      start: startIndex,
      end: endIndex,
    });
  };

  const visibleItems = [];
  for (let i = range.start; i <= range.end; i++) {
    visibleItems.push(
      <div
        key={i}
        style={{
          height: `${ITEM_HEIGHT}px`,
          border: "1px solid #ccc",
          display: "flex",
          alignItems: "center",
          paddingLeft: "10px",
        }}
      >
        Item {i}
      </div>
    );
  }

  return (
    <div
      ref={scrollRef}
      onScroll={handleScroll}
      style={{
        height: "500px",
        overflowY: "auto",
        border: "2px solid black",
        width: "300px",
        margin: "20px auto",
        position: "relative",
      }}
    >
      {/* Full height container */}
      <div
        style={{
          height: `${TOTAL_ITEMS * ITEM_HEIGHT}px`,
          position: "relative",
        }}
      >
        {/* Visible items */}
        <div
          style={{
            position: "absolute",
            top: `${range.start * ITEM_HEIGHT}px`,
            width: "100%",
          }}
        >
          {visibleItems}
        </div>
      </div>
    </div>
  );
}