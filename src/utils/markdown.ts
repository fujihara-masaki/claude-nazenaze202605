import { AnalysisData, Label, LabeledText, WhyCause, CAUSE_LABELS } from '../types/analysis';

const labelText: Record<Label, string> = {
  fact: '【事実】',
  assumption: '【推測】',
  tbc: '【要確認】',
};

function lt(item: LabeledText): string {
  if (!item.text.trim()) return '';
  return `${labelText[item.label]} ${item.text}`;
}

function causeSection(causes: WhyCause): string {
  const lines: string[] = [];
  (Object.keys(CAUSE_LABELS) as (keyof WhyCause)[]).forEach((key) => {
    const item = causes[key];
    if (item.text.trim()) {
      lines.push(`  - **${CAUSE_LABELS[key]}**: ${labelText[item.label]} ${item.text}`);
    }
  });
  return lines.join('\n');
}

export function generateMarkdown(data: AnalysisData): string {
  const lines: string[] = [];

  lines.push(`# なぜなぜ分析レポート`);
  lines.push('');
  lines.push(`**分析テーマ**: ${data.theme || '（未入力）'}`);
  lines.push('');

  lines.push('## 事象概要');
  lines.push(lt(data.overview) || '（未入力）');
  lines.push('');

  lines.push('## 5W1H');
  lines.push('');

  const w1h = data.fiveW1H;
  const w1hRows = [
    ['When（いつ）', w1h.when],
    ['Where（どこで）', w1h.where],
    ['Who（誰が）', w1h.who],
    ['What（何を）', w1h.what],
    ['How（どのように）', w1h.how],
    ['Impact（影響）', w1h.impact],
  ] as const;

  lines.push('| 項目 | 内容 |');
  lines.push('|------|------|');
  w1hRows.forEach(([label, item]) => {
    const val = item.text.trim() ? `${labelText[item.label]} ${item.text}` : '（未入力）';
    lines.push(`| ${label} | ${val} |`);
  });
  lines.push('');

  lines.push('## なぜなぜ分析');
  lines.push('');
  data.whyNodes.forEach((node, i) => {
    lines.push(`### Why ${i + 1}: ${lt(node.why) || '（未入力）'}`);
    lines.push('');
    const causes = causeSection(node.causes);
    if (causes) {
      lines.push('**原因候補（観点別）**');
      lines.push('');
      lines.push(causes);
      lines.push('');
    }
  });

  lines.push('## 対策');
  lines.push('');
  lines.push('### 暫定対策');
  lines.push(lt(data.countermeasures.provisional) || '（未入力）');
  lines.push('');
  lines.push('### 恒久対策');
  lines.push(lt(data.countermeasures.permanent) || '（未入力）');
  lines.push('');
  lines.push('### 再発防止策');
  lines.push(lt(data.countermeasures.recurrence) || '（未入力）');
  lines.push('');

  lines.push('---');
  lines.push(`*出力日時: ${new Date().toLocaleString('ja-JP')}*`);

  return lines.join('\n');
}
