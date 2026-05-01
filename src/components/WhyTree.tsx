import { WhyNode as WhyNodeType, WhyCause, Label } from '../types/analysis';
import { WhyNode } from './WhyNode';

interface Props {
  nodes: WhyNodeType[];
  onChange: (nodes: WhyNodeType[]) => void;
}

function makeEmptyNode(id: string): WhyNodeType {
  const emptyLT = (label: Label = 'fact') => ({ text: '', label });
  const emptyCauses = (): WhyCause => ({
    procedure: emptyLT(),
    role: emptyLT(),
    education: emptyLT(),
    workload: emptyLT(),
    rule: emptyLT(),
    system: emptyLT(),
    organization: emptyLT(),
  });
  return { id, why: emptyLT(), causes: emptyCauses() };
}

export function WhyTree({ nodes, onChange }: Props) {
  function addNode() {
    if (nodes.length >= 5) return;
    onChange([...nodes, makeEmptyNode(`why-${Date.now()}`)]);
  }

  function updateNode(index: number, node: WhyNodeType) {
    const next = [...nodes];
    next[index] = node;
    onChange(next);
  }

  function removeNode(index: number) {
    onChange(nodes.filter((_, i) => i !== index));
  }

  return (
    <section className="form-section">
      <h2 className="section-title">なぜなぜ分析（最大5階層）</h2>
      <p className="section-note">
        「なぜ？」を繰り返して根本原因に近づけます。各Whyに対して観点別の原因候補をメモしてください。
      </p>

      {nodes.length === 0 && (
        <p className="empty-hint">「Whyを追加」ボタンで分析を開始してください。</p>
      )}

      {nodes.map((node, i) => (
        <WhyNode
          key={node.id}
          node={node}
          index={i}
          onChange={(n) => updateNode(i, n)}
          onRemove={() => removeNode(i)}
        />
      ))}

      {nodes.length < 5 && (
        <button type="button" className="btn btn-secondary add-why-btn" onClick={addNode}>
          + Why を追加 ({nodes.length}/5)
        </button>
      )}
      {nodes.length >= 5 && (
        <p className="max-hint">最大5階層に達しました。</p>
      )}
    </section>
  );
}
