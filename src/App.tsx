import { useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import Header from './components/Header';
import Footer from './components/Footer';
import DBSelector from './components/DBSelector';
import TableSelector from './components/TableSelector';
import ColumnsSelector from './components/ColumnsSelector';
import CodePreview from './components/CodePreview';

function App() {
  const [dbConfig, setDbConfig] = useState(null);
  const [tables, setTables] = useState<string[]>([]);
  const [selectedTable, setSelectedTable] = useState('');
  const [columns, setColumns] = useState<string[]>([]);
  const [selectedCols, setSelectedCols] = useState<string[]>([]);
  const [code, setCode] = useState('');

  const connect = async (cfg) => {
    setDbConfig(cfg);
    const res = await invoke<TableList>('list_tables', { p: cfg });
    setTables(res.tables);
  };

  const loadColumns = async (table) => {
    setSelectedTable(table);
    const cols = await invoke<string[]>('list_columns', { p: { db: dbConfig, table } });
    setColumns(cols);
  };

  const genCode = async () => {
    const res = await invoke<CodeResult>('generate_code', { p: { db: dbConfig, table: selectedTable, columns: selectedCols } });
    setCode(res.code);
  };

  return (
    <div>
      <Header />
      <DBSelector onConnect={connect} />
      <TableSelector tables={tables} onSelect={loadColumns} />
      <ColumnsSelector columns={columns} onChange={setSelectedCols} />
      <button onClick={genCode}>Generate Code</button>
      <CodePreview code={code} />
      <button onClick={() => {/* trigger `tauri build` or deployment */}}>Deploy</button>
      <Footer />
    </div>
  );
}
export default App;