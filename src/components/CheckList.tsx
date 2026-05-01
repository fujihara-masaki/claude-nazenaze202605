import { useState } from 'react';

const CHECKLIST_ITEMS = [
  '原因の記述に「〇〇さんが悪い」「担当者のミス」など個人名・個人責任の表現がないか',
  '「不注意」「確認不足」など個人の内面・態度に帰属させていないか',
  '手順・ルール・ツールなど仕組み側の問題として捉えているか',
  '業務負荷・時間的プレッシャーなど環境要因を検討したか',
  '教育・スキル伝達の仕組みの問題として分析しているか',
  '複数人が同じ状況に置かれたら同じミスが起きうるか確認したか',
  '組織・コミュニケーション構造の問題として捉えているか',
  '対策が「個人への注意喚起」だけで終わっていないか',
];

export function CheckList() {
  const [checked, setChecked] = useState<boolean[]>(new Array(CHECKLIST_ITEMS.length).fill(false));
  const [open, setOpen] = useState(false);

  function toggle(i: number) {
    setChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  }

  const doneCount = checked.filter(Boolean).length;

  return (
    <section className="form-section checklist-section">
      <button
        type="button"
        className="checklist-toggle"
        onClick={() => setOpen(!open)}
      >
        <span className="checklist-title">
          個人責任に寄せすぎていないか チェックリスト
        </span>
        <span className={`checklist-score ${doneCount === CHECKLIST_ITEMS.length ? 'all-done' : ''}`}>
          {doneCount}/{CHECKLIST_ITEMS.length} 確認済み
        </span>
        <span>{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <ul className="checklist-items">
          {CHECKLIST_ITEMS.map((item, i) => (
            <li
              key={i}
              className={`checklist-item ${checked[i] ? 'checked' : ''}`}
              onClick={() => toggle(i)}
            >
              <span className="check-icon">{checked[i] ? '✓' : '○'}</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
