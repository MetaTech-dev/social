// components/MasonryGrid.tsx
import React from "react";

interface MasonryGridProps {
  children: React.ReactNode;
  columnCount: number; // You can pass the number of columns as a prop
  gap?: number; // Adjust the gap as needed
}

export const MasonryGrid: React.FC<MasonryGridProps> = ({
  children,
  columnCount,
  gap,
}) => {
  // Tailwind doesn't have built-in utilities for columns, so we use a style object
  const masonryStyle = {
    columnCount,
    ...(gap && { gap: `${gap * 0.25}rem` }),
  };

  return (
    <div style={masonryStyle}>
      {React.Children.map(children, (child) => (
        <div
          style={{
            breakInside: "avoid",
            ...(gap && { marginBottom: `${gap * 0.25}rem` }),
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};
