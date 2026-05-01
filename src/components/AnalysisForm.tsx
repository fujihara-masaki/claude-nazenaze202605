import { AnalysisData } from '../types/analysis';
import { ThemeSection } from './ThemeSection';
import { FiveW1HSection } from './FiveW1HSection';
import { WhyTree } from './WhyTree';
import { CountermeasureSection } from './CountermeasureSection';
import { CheckList } from './CheckList';

interface Props {
  data: AnalysisData;
  onChange: (data: AnalysisData) => void;
  onLoadSample: () => void;
  onReset: () => void;
}

export function AnalysisForm({ data, onChange, onLoadSample, onReset }: Props) {
  return (
    <div className="analysis-form">
      <div className="form-toolbar">
        <button type="button" className="btn btn-secondary" onClick={onLoadSample}>
          サンプルデータを読み込む
        </button>
        <button type="button" className="btn btn-danger" onClick={onReset}>
          リセット
        </button>
      </div>

      <ThemeSection data={data} onChange={onChange} />

      <FiveW1HSection
        data={data.fiveW1H}
        onChange={(fiveW1H) => onChange({ ...data, fiveW1H })}
      />

      <WhyTree
        nodes={data.whyNodes}
        onChange={(whyNodes) => onChange({ ...data, whyNodes })}
      />

      <CountermeasureSection
        data={data.countermeasures}
        onChange={(countermeasures) => onChange({ ...data, countermeasures })}
      />

      <CheckList />
    </div>
  );
}
