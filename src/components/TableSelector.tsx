import React from 'react';

interface TableSelectorProps {
  tables: string[];
  onSelect: (table: string) => void;
}

const TableSelector: React.FC<TableSelectorProps> = ({ tables, onSelect }) => (
  <div className="p-4">
    <label className="block font-medium mb-1">Select Table/View</label>
    <select
      onChange={(e) => onSelect(e.target.value)}
      className="w-full border p-1"
    >
      <option value="">-- choose --</option>
      {tables.map((t) => (
        <option key={t} value={t}>
          {t}
        </option>
      ))}
    </select>
  </div>
);

export default TableSelector;