import React, { useState } from 'react';

export interface DBConfig {
  db_type: string;
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}

interface DBSelectorProps {
  onConnect: (config: DBConfig) => void;
}

const DBSelector: React.FC<DBSelectorProps> = ({ onConnect }) => {
  const [config, setConfig] = useState<DBConfig>({
    db_type: 'mysql',
    host: '',
    port: 5432,
    user: '',
    password: '',
    database: '',
  });

  const dbOptions = ['mysql', 'sqlserver', 'postgres', 'db2', 'snowflake', 'mongo', 'oracle'];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setConfig((prev) => ({
      ...prev,
      [name]: name === 'port' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConnect(config);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow">
      <div className="mb-2">
        <label className="block font-medium">Database Type</label>
        <select
          name="db_type"
          value={config.db_type}
          onChange={handleChange}
          className="w-full border p-1"
        >
          {dbOptions.map((db) => (
            <option key={db} value={db}>
              {db}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-2">
        <div>
          <label className="block font-medium">Host</label>
          <input
            name="host"
            value={config.host}
            onChange={handleChange}
            className="w-full border p-1"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Port</label>
          <input
            name="port"
            type="number"
            value={config.port}
            onChange={handleChange}
            className="w-full border p-1"
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-2">
        <div>
          <label className="block font-medium">User</label>
          <input
            name="user"
            value={config.user}
            onChange={handleChange}
            className="w-full border p-1"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Password</label>
          <input
            name="password"
            type="password"
            value={config.password}
            onChange={handleChange}
            className="w-full border p-1"
            required
          />
        </div>
      </div>
      <div className="mb-2">
        <label className="block font-medium">Database</label>
        <input
          name="database"
          value={config.database}
          onChange={handleChange}
          className="w-full border p-1"
          required
        />
      </div>
      <button className="px-4 py-2 bg-blue-500 text-white rounded" type="submit">
        Connect
      </button>
    </form>
  );
};

export default DBSelector;