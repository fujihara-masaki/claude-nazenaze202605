import { Label, LABEL_DISPLAY } from '../types/analysis';

interface Props {
  value: Label;
  onChange: (label: Label) => void;
}

export function LabelBadge({ value, onChange }: Props) {
  const labels: Label[] = ['fact', 'assumption', 'tbc'];
  return (
    <div className="label-badge-group">
      {labels.map((l) => {
        const { text, color } = LABEL_DISPLAY[l];
        const active = value === l;
        return (
          <button
            key={l}
            type="button"
            onClick={() => onChange(l)}
            className={`label-badge ${active ? 'active' : ''}`}
            style={active ? { backgroundColor: color, color: '#fff', borderColor: color } : { borderColor: color, color: color }}
          >
            {text}
          </button>
        );
      })}
    </div>
  );
}
