import { WhyNode as WhyNodeType, WhyCause, CAUSE_LABELS, Label } from '../types/analysis';
import { LabelBadge } from './LabelBadge';
import { useState } from 'react';

interface Props {
  node: WhyNodeType;
  index: number;
  onChange: (node: WhyNodeType) => void;
  onRemove: () => void;
}

export function WhyNode({ node, index, onChange, onRemove }: Props) {
  const [expanded, setExpanded] = useState(true);

  function updateWhy(text: string) {
    onChange({ ...node, why: { ...node.why, text } });
  }

  function updateWhyLabel(label: Label) {
    onChange({ ...node, why: { ...node.why, label } });
  }

  function updateCause(key: keyof WhyCause, text: string) {
    onChange({ ...node, causes: { ...node.causes, [key]: { ...node.causes[key], text } } });
  }

  function updateCauseLabel(key: keyof WhyCause, label: Label) {
    onChange({ ...node, causes: { ...node.causes, [key]: { ...node.causes[key], label } } });
  }

  const indentStyle = { marginLeft: `${index * 16}px` };

  return (
    <div className="why-node" style={indentStyle}>
      <div className="why-node-header">
        <div className="why-node-title-row">
          <span className="why-number">Why {index + 1}</span>
          <button
            type="button"
            className="toggle-btn"
            onClick={() => setExpanded(!expanded)}
            title={expanded ? '折りたたむ' : '展開する'}
          >
            {expanded ? '▲' : '▼'}
          </button>
        </div>
        <div className="field-row why-main-input">
          <input
            type="text"
            className="input"
            placeholder={`なぜ${index + 1}：なぜそうなったか？`}
            value={node.why.text}
            onChange={(e) => updateWhy(e.target.value)}
          />
          <LabelBadge value={node.why.label} onChange={updateWhyLabel} />
          <button type="button" className="remove-btn" onClick={onRemove} title="このWhyを削除">
            ✕
          </button>
        </div>
      </div>

      {expanded && (
        <div className="why-causes">
          <p className="causes-heading">原因候補（観点別）</p>
          {(Object.keys(CAUSE_LABELS) as (keyof WhyCause)[]).map((key) => (
            <div className="cause-field" key={key}>
              <label className="cause-label">{CAUSE_LABELS[key]}</label>
              <div className="field-row">
                <input
                  type="text"
                  className="input input-sm"
                  placeholder="気づいた点をメモ（空欄でもOK）"
                  value={node.causes[key].text}
                  onChange={(e) => updateCause(key, e.target.value)}
                />
                <LabelBadge
                  value={node.causes[key].label}
                  onChange={(label: Label) => updateCauseLabel(key, label)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
