import { useState } from 'react';
import { AnalysisData, LABEL_DISPLAY, WhyCause, CAUSE_LABELS } from '../types/analysis';
import { generateMarkdown } from '../utils/markdown';

interface Props {
  data: AnalysisData;
}

export function PreviewPanel({ data }: Props) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const md = generateMarkdown(data);
    await navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const { fiveW1H: w } = data;

  return (
    <div className="preview-panel">
      <div className="preview-header">
        <h2 className="preview-title">分析結果プレビュー</h2>
        <button type="button" className="btn btn-primary" onClick={handleCopy}>
          {copied ? '✓ コピー済み' : 'Markdown コピー'}
        </button>
      </div>

      <div className="preview-body">
        <div className="preview-section">
          <h3 className="preview-h3">分析テーマ</h3>
          <p className="preview-text">{data.theme || <span className="empty">（未入力）</span>}</p>
        </div>

        <div className="preview-section">
          <h3 className="preview-h3">事象概要</h3>
          <p className="preview-text">
            {data.overview.text ? (
              <>
                <LabelTag label={data.overview.label} />
                {data.overview.text}
              </>
            ) : (
              <span className="empty">（未入力）</span>
            )}
          </p>
        </div>

        <div className="preview-section">
          <h3 className="preview-h3">5W1H</h3>
          <table className="preview-table">
            <tbody>
              {[
                ['When', w.when],
                ['Where', w.where],
                ['Who', w.who],
                ['What', w.what],
                ['How', w.how],
                ['Impact', w.impact],
              ].map(([key, item]) => {
                if (typeof item === 'string') return null;
                return (
                  <tr key={String(key)}>
                    <th>{String(key)}</th>
                    <td>
                      {item.text ? (
                        <>
                          <LabelTag label={item.label} />
                          {item.text}
                        </>
                      ) : (
                        <span className="empty">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="preview-section">
          <h3 className="preview-h3">なぜなぜ分析</h3>
          {data.whyNodes.length === 0 && <p className="empty">（未入力）</p>}
          {data.whyNodes.map((node, i) => (
            <div key={node.id} className="preview-why-node" style={{ marginLeft: `${i * 12}px` }}>
              <div className="preview-why-title">
                <span className="why-badge">Why {i + 1}</span>
                {node.why.text ? (
                  <>
                    <LabelTag label={node.why.label} />
                    <span>{node.why.text}</span>
                  </>
                ) : (
                  <span className="empty">（未入力）</span>
                )}
              </div>
              {(Object.keys(CAUSE_LABELS) as (keyof WhyCause)[]).some(
                (k) => node.causes[k].text.trim()
              ) && (
                <div className="preview-causes">
                  {(Object.keys(CAUSE_LABELS) as (keyof WhyCause)[]).map((key) => {
                    const c = node.causes[key];
                    if (!c.text.trim()) return null;
                    return (
                      <div key={key} className="preview-cause-item">
                        <span className="cause-key">{CAUSE_LABELS[key]}</span>
                        <LabelTag label={c.label} />
                        <span>{c.text}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="preview-section">
          <h3 className="preview-h3">対策</h3>
          {[
            ['暫定対策', data.countermeasures.provisional],
            ['恒久対策', data.countermeasures.permanent],
            ['再発防止策', data.countermeasures.recurrence],
          ].map(([label, item]) => {
            if (typeof item === 'string') return null;
            return (
              <div key={String(label)} className="preview-countermeasure">
                <span className="measure-label">{String(label)}</span>
                {item.text ? (
                  <>
                    <LabelTag label={item.label} />
                    <span>{item.text}</span>
                  </>
                ) : (
                  <span className="empty">（未入力）</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function LabelTag({ label }: { label: string }) {
  const key = label as keyof typeof LABEL_DISPLAY;
  const info = LABEL_DISPLAY[key];
  if (!info) return null;
  return (
    <span
      className="label-tag"
      style={{ backgroundColor: info.color }}
    >
      {info.text}
    </span>
  );
}
