import React, { useState, useEffect } from 'react';
import { Dashboard } from './components/Dashboard';
import { Entry } from './components/Entry';
import { DayEntry } from './model/DayEntry';
import { loadEntries, saveEntries } from './utils/storage';
import { colors } from './theme';
import { FiBarChart2, FiEdit3 } from 'react-icons/fi';

function App() {
  const [tab, setTab] = useState<'dashboard' | 'entry'>('dashboard');
  const [entries, setEntries] = useState<DayEntry[]>([]);

  useEffect(() => {
    setEntries(loadEntries());
  }, []);

  function handleSave(entry: DayEntry) {
    const updated = [...entries.filter(e => !(e.date === entry.date)), entry].sort((a, b) => b.date.localeCompare(a.date));
    setEntries(updated);
    saveEntries(updated);
    setTab('dashboard');
  }

  return (
    <div style={{ minHeight: '100vh', background: colors.background, color: colors.text }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <nav style={{ display: 'flex', justifyContent: 'center', gap: 24, padding: 24 }}>
          <button
            onClick={() => setTab('dashboard')}
            style={{
              background: 'none',
              border: 'none',
              color: tab === 'dashboard' ? colors.accent : colors.text,
              fontWeight: tab === 'dashboard' ? 700 : 500,
              fontSize: 20,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              cursor: 'pointer',
              borderBottom: tab === 'dashboard' ? `2.5px solid ${colors.accent}` : '2.5px solid transparent',
              paddingBottom: 4,
            }}
          >
            <FiBarChart2 size={22} /> Dashboard
          </button>
          <button
            onClick={() => setTab('entry')}
            style={{
              background: 'none',
              border: 'none',
              color: tab === 'entry' ? colors.accent : colors.text,
              fontWeight: tab === 'entry' ? 700 : 500,
              fontSize: 20,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              cursor: 'pointer',
              borderBottom: tab === 'entry' ? `2.5px solid ${colors.accent}` : '2.5px solid transparent',
              paddingBottom: 4,
            }}
          >
            <FiEdit3 size={22} /> Entry
          </button>
        </nav>
        <main>
          {tab === 'dashboard' && <Dashboard entries={entries} />}
          {tab === 'entry' && <Entry onSave={handleSave} />}
        </main>
      </div>
    </div>
  );
}

export default App;
