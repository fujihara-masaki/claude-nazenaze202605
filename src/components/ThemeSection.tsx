import { AnalysisData } from '../types/analysis';
import { LabelBadge } from './LabelBadge';

interface Props {
  data: AnalysisData;
  onChange: (data: AnalysisData) => void;
}

export function ThemeSection({ data, onChange }: Props) {
  return (
    <section className="form-section">
      <h2 className="section-title">分析テーマ・事象概要</h2>

      <div className="field">
        <label className="field-label">分析テーマ名</label>
        <input
          type="text"
          className="input"
          placeholder="例：本番環境への誤操作による障害"
          value={data.theme}
          onChange={(e) => onChange({ ...data, theme: e.target.value })}
        />
      </div>

      <div className="field">
        <label className="field-label">事象概要</label>
        <div className="field-row">
          <textarea
            className="textarea"
            rows={3}
            placeholder="何が起きたかを具体的に記述してください"
            value={data.overview.text}
            onChange={(e) =>
              onChange({ ...data, overview: { ...data.overview, text: e.target.value } })
            }
          />
          <LabelBadge
            value={data.overview.label}
            onChange={(label) => onChange({ ...data, overview: { ...data.overview, label } })}
          />
        </div>
      </div>
    </section>
  );
}
