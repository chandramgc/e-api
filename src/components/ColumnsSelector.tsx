import React, { useState } from 'react';

interface ColumnsSelectorProps {
  columns: string[];
  onChange: (cols: string[]) => void;
}

const ColumnsSelector: React.FC<ColumnsSelectorProps> = ({ columns, onChange }) => {
  const [selected, setSelected] = useState<string[]>([]);

  const handleToggle = (col: string) => {
    const next = selected.includes(col)
      ? selected.filter((c) => c !== col)
      : [...selected, col];
    setSelected(next);
    onChange(next);
  };

  return (
    <div className="p-4">
      <label className="block font-medium mb-1">Select Columns</label>
      <div className="grid grid-cols-2 gap-2">
        {columns.map((col) => (
          <label key={col} className="flex items-center">
            <input
              type="checkbox"
              checked={selected.includes(col)}
              onChange={() => handleToggle(col)}
              className="mr-2"
            />
            {col}
          </label>
        ))}
      </div>
    </div>
  );
};

export default ColumnsSelector;