import { AnalysisData } from '../types/analysis';

export const sampleData: AnalysisData = {
  theme: '本番環境への誤ったデータ削除オペレーション',
  overview: {
    text: '2024年3月15日 14:32、オペレーターがメンテナンス作業中に本番DBの顧客テーブルから約500件のレコードを誤削除した。バックアップから復旧するまで2時間のサービス停止が発生した。',
    label: 'fact',
  },
  fiveW1H: {
    when: { text: '2024年3月15日（金）14:32 〜 16:45', label: 'fact' },
    where: { text: '本番環境データベース（customers テーブル）', label: 'fact' },
    who: { text: 'インフラ担当オペレーター A さん（経験2年）', label: 'fact' },
    what: {
      text: '顧客テーブルの一部レコード約500件を誤って削除した',
      label: 'fact',
    },
    how: {
      text: 'WHERE句なしの DELETE 文を実行するつもりが、ステージング環境と本番環境を取り違えた状態で実行した',
      label: 'fact',
    },
    impact: {
      text: '顧客向けサービス停止 2時間・影響ユーザー数 約1,200名・売上損失 推定50万円',
      label: 'fact',
    },
  },
  whyNodes: [
    {
      id: 'why-1',
      why: {
        text: 'オペレーターが本番とステージングを取り違えて操作した',
        label: 'fact',
      },
      causes: {
        procedure: {
          text: '作業前の環境確認手順が手順書に明記されていなかった',
          label: 'fact',
        },
        role: { text: '当日は確認者なしのシングルオペレーションだった', label: 'fact' },
        education: {
          text: '入社時のDB操作研修でダブルチェックの重要性を教えていなかった可能性あり',
          label: 'assumption',
        },
        workload: {
          text: '年度末で障害対応が重なりオペレーターの作業量が通常の1.5倍だった',
          label: 'fact',
        },
        rule: {
          text: '本番DBへの直接接続に際しての承認フローが定義されていなかった',
          label: 'fact',
        },
        system: {
          text: 'ステージングと本番の接続先URLが類似しており視認性が低かった',
          label: 'fact',
        },
        organization: {
          text: 'チームリーダーがその日は外出中で相談できる体制になかった',
          label: 'tbc',
        },
      },
    },
    {
      id: 'why-2',
      why: {
        text: '環境確認なしに作業を開始できる状態だった',
        label: 'fact',
      },
      causes: {
        procedure: {
          text: '環境を明示的に確認するステップが作業フローに存在しなかった',
          label: 'fact',
        },
        role: { text: '', label: 'fact' },
        education: { text: '', label: 'fact' },
        workload: { text: '', label: 'fact' },
        rule: {
          text: '本番操作前のセルフチェックリストが存在しなかった',
          label: 'fact',
        },
        system: {
          text: '本番DBにはプロンプトや接続文字列に環境名が表示されていなかった',
          label: 'fact',
        },
        organization: { text: '', label: 'fact' },
      },
    },
    {
      id: 'why-3',
      why: {
        text: '本番DB操作の手順書が整備されていなかった',
        label: 'fact',
      },
      causes: {
        procedure: {
          text: '手順書の定期レビュー・更新のプロセスが存在しなかった',
          label: 'fact',
        },
        role: {
          text: '手順書作成・維持の担当者・オーナーが不明確だった',
          label: 'assumption',
        },
        education: { text: '', label: 'fact' },
        workload: {
          text: '手順書整備は後回しにされがちな優先度の低い作業だった',
          label: 'assumption',
        },
        rule: {
          text: '手順書がないまま作業を許可する慣習があった',
          label: 'tbc',
        },
        system: { text: '', label: 'fact' },
        organization: {
          text: '属人化が進んでおり口頭伝承で対応していた',
          label: 'assumption',
        },
      },
    },
  ],
  countermeasures: {
    provisional: {
      text: 'バックアップからのデータ復旧完了。影響ユーザーへ謝罪メール送信。今後の本番DB操作は2名以上での作業を即時ルール化。',
      label: 'fact',
    },
    permanent: {
      text: '①本番DB操作手順書の整備と定期レビュー体制の構築。②本番DB接続時の環境明示（プロンプトカラー変更・バナー表示）。③本番操作前チェックリストの導入とツール化。④承認フロー（変更管理プロセス）の整備。',
      label: 'fact',
    },
    recurrence: {
      text: '①DB操作研修にダブルチェック・環境確認を必須項目として追加。②四半期ごとの手順書レビュー会議の定例化。③インシデント発生時の振り返り（ポストモーテム）文化の定着。',
      label: 'fact',
    },
  },
};
