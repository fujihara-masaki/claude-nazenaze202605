export type Label = 'fact' | 'assumption' | 'tbc';

export interface LabeledText {
  text: string;
  label: Label;
}

export interface WhyCause {
  procedure: LabeledText;
  role: LabeledText;
  education: LabeledText;
  workload: LabeledText;
  rule: LabeledText;
  system: LabeledText;
  organization: LabeledText;
}

export interface WhyNode {
  id: string;
  why: LabeledText;
  causes: WhyCause;
}

export interface FiveW1H {
  when: LabeledText;
  where: LabeledText;
  who: LabeledText;
  what: LabeledText;
  how: LabeledText;
  impact: LabeledText;
}

export interface Countermeasures {
  provisional: LabeledText;
  permanent: LabeledText;
  recurrence: LabeledText;
}

export interface AnalysisData {
  theme: string;
  overview: LabeledText;
  fiveW1H: FiveW1H;
  whyNodes: WhyNode[];
  countermeasures: Countermeasures;
}

export const CAUSE_LABELS: Record<keyof WhyCause, string> = {
  procedure: '手順',
  role: '役割分担',
  education: '教育・スキル',
  workload: '業務負荷',
  rule: 'ルール・標準',
  system: 'システム・ツール',
  organization: '組織・コミュニケーション',
};

export const LABEL_DISPLAY: Record<Label, { text: string; color: string }> = {
  fact: { text: '事実', color: '#2563eb' },
  assumption: { text: '推測', color: '#d97706' },
  tbc: { text: '要確認', color: '#dc2626' },
};
