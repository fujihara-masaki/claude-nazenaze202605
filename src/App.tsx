import { AnalysisData } from './types/analysis';
import { useLocalStorage } from './hooks/useLocalStorage';
import { AnalysisForm } from './components/AnalysisForm';
import { PreviewPanel } from './components/PreviewPanel';
import { sampleData } from './utils/sampleData';

const STORAGE_KEY = 'nazenaze-analysis-v1';

function makeInitialData(): AnalysisData {
  const empty = (label: 'fact' | 'assumption' | 'tbc' = 'fact') => ({ text: '', label });
  return {
    theme: '',
    overview: empty(),
    fiveW1H: {
      when: empty(),
      where: empty(),
      who: empty(),
      what: empty(),
      how: empty(),
      impact: empty(),
    },
    whyNodes: [],
    countermeasures: {
      provisional: empty(),
      permanent: empty(),
      recurrence: empty(),
    },
  };
}

export default function App() {
  const [data, setData] = useLocalStorage<AnalysisData>(STORAGE_KEY, makeInitialData());

  function handleReset() {
    if (window.confirm('入力内容をすべてリセットしますか？')) {
      setData(makeInitialData());
    }
  }

  function handleLoadSample() {
    if (window.confirm('現在の入力内容をサンプルデータで上書きしますか？')) {
      setData(sampleData);
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">なぜなぜ分析ツール</h1>
        <p className="app-subtitle">
          品質管理・障害分析・業務改善のための事実整理型なぜなぜ分析
        </p>
      </header>

      <main className="app-main">
        <div className="left-panel">
          <AnalysisForm
            data={data}
            onChange={setData}
            onLoadSample={handleLoadSample}
            onReset={handleReset}
          />
        </div>
        <div className="right-panel">
          <PreviewPanel data={data} />
        </div>
      </main>
    </div>
  );
}
