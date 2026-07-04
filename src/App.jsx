import { useState } from 'react'
import './App.css'

// じゃんけんの手の定義
const HANDS = [
  { id: 'gu',    label: 'グー',   emoji: '✊' },
  { id: 'choki', label: 'チョキ', emoji: '✌️' },
  { id: 'pa',    label: 'パー',   emoji: '🖐️' },
]

// 勝敗判定: player が computer に勝つ組み合わせ
const WINS = { gu: 'choki', choki: 'pa', pa: 'gu' }

function getResult(player, computer) {
  if (player === computer) return 'draw'
  return WINS[player] === computer ? 'win' : 'lose'
}

function randomHand() {
  return HANDS[Math.floor(Math.random() * HANDS.length)]
}

// 結果に応じたメッセージ・スタイル
const RESULT_CONFIG = {
  win:  { message: '🎉 あなたの勝ち！',     className: 'result-win' },
  lose: { message: '😢 あなたの負け…',      className: 'result-lose' },
  draw: { message: '🤝 あいこ！もう一回！', className: 'result-draw' },
}

export default function App() {
  const [playerHand, setPlayerHand]     = useState(null)
  const [computerHand, setComputerHand] = useState(null)
  const [result, setResult]             = useState(null)
  const [score, setScore]               = useState({ win: 0, lose: 0, draw: 0 })
  const [animating, setAnimating]       = useState(false)

  // 手を選んだときの処理
  function handleSelect(hand) {
    if (animating) return

    setAnimating(true)
    setResult(null)
    setPlayerHand(null)
    setComputerHand(null)

    // シェイクアニメーション後に結果を表示
    setTimeout(() => {
      const cpu = randomHand()
      const res = getResult(hand.id, cpu.id)

      setPlayerHand(hand)
      setComputerHand(cpu)
      setResult(res)
      setScore(prev => ({ ...prev, [res]: prev[res] + 1 }))
      setAnimating(false)
    }, 600)
  }

  function handleReset() {
    setScore({ win: 0, lose: 0, draw: 0 })
    setPlayerHand(null)
    setComputerHand(null)
    setResult(null)
  }

  const total = score.win + score.lose + score.draw

  return (
    <div className="container">
      <h1 className="title">✊✌️🖐️ じゃんけんゲーム</h1>

      {/* スコアボード */}
      <div className="scoreboard">
        <div className="score-item win">
          <span className="score-label">勝ち</span>
          <span className="score-value">{score.win}</span>
        </div>
        <div className="score-item draw">
          <span className="score-label">あいこ</span>
          <span className="score-value">{score.draw}</span>
        </div>
        <div className="score-item lose">
          <span className="score-label">負け</span>
          <span className="score-value">{score.lose}</span>
        </div>
        {total > 0 && (
          <div className="score-item total">
            <span className="score-label">合計</span>
            <span className="score-value">{total}</span>
          </div>
        )}
      </div>

      {/* 対戦エリア */}
      <div className="battle-area">
        <div className={`hand-display player-side ${animating ? 'shake' : ''}`}>
          <div className="hand-label">あなた</div>
          <div className="hand-emoji">
            {animating ? '❓' : playerHand ? playerHand.emoji : '🤔'}
          </div>
          <div className="hand-name">
            {!animating && playerHand ? playerHand.label : ''}
          </div>
        </div>

        <div className="vs-badge">VS</div>

        <div className={`hand-display computer-side ${animating ? 'shake' : ''}`}>
          <div className="hand-label">コンピュータ</div>
          <div className="hand-emoji">
            {animating ? '❓' : computerHand ? computerHand.emoji : '🤖'}
          </div>
          <div className="hand-name">
            {!animating && computerHand ? computerHand.label : ''}
          </div>
        </div>
      </div>

      {/* 結果表示 */}
      <div className={`result-banner ${result ? RESULT_CONFIG[result].className : ''}`}>
        {result ? RESULT_CONFIG[result].message : '手を選んでください'}
      </div>

      {/* 手の選択ボタン */}
      <div className="hand-buttons">
        {HANDS.map(hand => (
          <button
            key={hand.id}
            className={`hand-btn ${animating ? 'disabled' : ''}`}
            onClick={() => handleSelect(hand)}
            disabled={animating}
          >
            <span className="btn-emoji">{hand.emoji}</span>
            <span className="btn-label">{hand.label}</span>
          </button>
        ))}
      </div>

      {/* リセットボタン */}
      {total > 0 && (
        <button className="reset-btn" onClick={handleReset}>
          スコアをリセット
        </button>
      )}
    </div>
  )
}
