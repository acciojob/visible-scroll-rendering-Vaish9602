import React, { useRef, useState } from "react";

const ITEM_HEIGHT = 50;
const TOTAL_ITEMS = 1000;
const CONTAINER_HEIGHT = 500;

export default function App() {
  const scrollRef = useRef(null);

  const [range, setRange] = useState({
    start: 0,
    end: 9, // ✅ exactly 10 items
  });

  const handleScroll = () => {
    const scrollTop = scrollRef.current.scrollTop;

    const startIndex = Math.floor(scrollTop / ITEM_HEIGHT);
    const visibleCount = Math.floor(CONTAINER_HEIGHT / ITEM_HEIGHT);
    const endIndex = Math.min(startIndex + visibleCount - 1, TOTAL_ITEMS - 1);

    setRange({
      start: startIndex,
      end: endIndex,
    });
  };

  const visibleItems = [];
  for (let i = range.start; i <= range.end; i++) {
    visibleItems.push(
      <h2
        key={i}
        style={{
          height: `${ITEM_HEIGHT}px`,
          margin: 0,
          border: "1px solid #ccc",
          display: "flex",
          alignItems: "center",
          paddingLeft: "10px",
        }}
      >
        Item {i}
      </h2>
    );
  }

  return (
    <div
      ref={scrollRef}
      onScroll={handleScroll}
      style={{
        height: "500px",
        overflow: "auto", // ✅ important fix
        border: "2px solid black",
        width: "300px",
        margin: "20px auto",
        position: "relative",
      }}
    >
      <div
        style={{
          height: `${TOTAL_ITEMS * ITEM_HEIGHT}px`,
          position: "relative",
        }}
      >
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