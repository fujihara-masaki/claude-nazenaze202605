import { Countermeasures, Label } from '../types/analysis';
import { LabelBadge } from './LabelBadge';

interface Props {
  data: Countermeasures;
  onChange: (data: Countermeasures) => void;
}

const FIELDS: { key: keyof Countermeasures; label: string; placeholder: string }[] = [
  {
    key: 'provisional',
    label: '暫定対策',
    placeholder: '発生直後の応急措置・被害拡大防止策',
  },
  {
    key: 'permanent',
    label: '恒久対策',
    placeholder: '根本原因を解消するための恒久的な改善策',
  },
  {
    key: 'recurrence',
    label: '再発防止策',
    placeholder: '同種の問題が繰り返されないための仕組み・ルール・教育など',
  },
];

export function CountermeasureSection({ data, onChange }: Props) {
  return (
    <section className="form-section">
      <h2 className="section-title">対策</h2>
      {FIELDS.map(({ key, label, placeholder }) => (
        <div className="field" key={key}>
          <label className="field-label">{label}</label>
          <div className="field-row">
            <textarea
              className="textarea"
              rows={3}
              placeholder={placeholder}
              value={data[key].text}
              onChange={(e) => onChange({ ...data, [key]: { ...data[key], text: e.target.value } })}
            />
            <LabelBadge
              value={data[key].label}
              onChange={(lbl: Label) => onChange({ ...data, [key]: { ...data[key], label: lbl } })}
            />
          </div>
        </div>
      ))}
    </section>
  );
}
