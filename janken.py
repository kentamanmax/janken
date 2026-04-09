import random

HANDS = ["グー", "チョキ", "パー"]

def get_result(player, computer):
    if player == computer:
        return "あいこ"
    wins = {("グー", "チョキ"), ("チョキ", "パー"), ("パー", "グー")}
    return "勝ち" if (player, computer) in wins else "負け"

def main():
    print("じゃんけんゲーム開始！（終了するには 'q' を入力）\n")
    wins = losses = draws = 0

    while True:
        print("0: グー  1: チョキ  2: パー")
        choice = input("選んでください: ").strip()

        if choice == "q":
            break
        if choice not in ("0", "1", "2"):
            print("0, 1, 2 のいずれかを入力してください\n")
            continue

        player = HANDS[int(choice)]
        computer = random.choice(HANDS)
        result = get_result(player, computer)

        if result == "勝ち":
            wins += 1
        elif result == "負け":
            losses += 1
        else:
            draws += 1

        if result == "あいこ":
            print(f"あなた: {player}  コンピュータ: {computer}  → あいこ！もう一回！")
        else:
            print(f"あなた: {player}  コンピュータ: {computer}  → {result}")
        print(f"スコア: {wins}勝 {losses}敗 {draws}引き分け\n")

    print(f"\n最終結果: {wins}勝 {losses}敗 {draws}引き分け")

if __name__ == "__main__":
    main()
