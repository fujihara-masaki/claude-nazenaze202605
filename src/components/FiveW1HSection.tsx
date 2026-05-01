import { FiveW1H, LabeledText, Label } from '../types/analysis';
import { LabelBadge } from './LabelBadge';

interface Props {
  data: FiveW1H;
  onChange: (data: FiveW1H) => void;
}

const FIELDS: { key: keyof FiveW1H; label: string; placeholder: string }[] = [
  { key: 'when', label: 'When（いつ）', placeholder: '発生日時・期間' },
  { key: 'where', label: 'Where（どこで）', placeholder: '発生場所・システム・部署' },
  { key: 'who', label: 'Who（誰が）', placeholder: '関係者・担当者（個人名ではなく役割で記載推奨）' },
  { key: 'what', label: 'What（何を）', placeholder: '何が起きたか・何をしたか' },
  { key: 'how', label: 'How（どのように）', placeholder: '発生経緯・操作手順' },
  { key: 'impact', label: 'Impact（影響）', placeholder: '被害範囲・影響ユーザー数・損失など' },
];

export function FiveW1HSection({ data, onChange }: Props) {
  function updateField(key: keyof FiveW1H, field: Partial<LabeledText>) {
    onChange({ ...data, [key]: { ...data[key], ...field } });
  }

  return (
    <section className="form-section">
      <h2 className="section-title">5W1H（事実の整理）</h2>
      {FIELDS.map(({ key, label, placeholder }) => (
        <div className="field" key={key}>
          <label className="field-label">{label}</label>
          <div className="field-row">
            <input
              type="text"
              className="input"
              placeholder={placeholder}
              value={data[key].text}
              onChange={(e) => updateField(key, { text: e.target.value })}
            />
            <LabelBadge
              value={data[key].label}
              onChange={(label: Label) => updateField(key, { label })}
            />
          </div>
        </div>
      ))}
    </section>
  );
}
