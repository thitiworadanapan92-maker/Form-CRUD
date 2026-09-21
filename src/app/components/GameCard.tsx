import Link from "next/link";
import type {
  Game,
  GameStatus,
} from "@/app/types/game";

type GameCardProps = {
  game: Game;
  onEdit: () => void;
  onDelete: () => void;
  onStatusChange: (status: GameStatus) => void;
};

export default function GameCard({
  game,
  onEdit,
  onDelete,
  onStatusChange,
}: GameCardProps) {
  const statusClass =
    game.status === "ยังไม่เริ่ม"
      ? "status-not-started"
      : game.status === "กำลังเล่น"
      ? "status-playing"
      : "status-completed";

  return (
    <article className="game-card">

      <div className="game-card-top">
        <div className="game-icon">
          🎮
        </div>

        <span
          className={`game-status ${statusClass}`}
        >
          ● {game.status}
        </span>
      </div>

      <div className="game-card-content">

        <h2 className="game-title">
          {game.name}
        </h2>

        <div className="game-info">
          <span>🕹️</span>
          <span>
            แพลตฟอร์ม: {game.platform}
          </span>
        </div>

        <div className="game-info">
          <span>⏱️</span>
          <span>
            ประมาณ {game.hours} ชั่วโมง
          </span>
        </div>

      </div>

      {/* เปลี่ยนสถานะโดยตรง */}
      <div className="game-status-change">

        <label
          htmlFor={`status-${game.id}`}
        >
          เปลี่ยนสถานะ
        </label>

        <select
          id={`status-${game.id}`}
          value={game.status}
          onChange={(event) =>
            onStatusChange(
              event.target.value as GameStatus
            )
          }
        >
          <option value="ยังไม่เริ่ม">
            ยังไม่เริ่ม
          </option>

          <option value="กำลังเล่น">
            กำลังเล่น
          </option>

          <option value="เล่นจบแล้ว">
            เล่นจบแล้ว
          </option>
        </select>

      </div>

      {/* ดูรายละเอียด */}
      <div className="game-detail-link">

        <Link href={`/games/${game.id}`}>
          ดูรายละเอียด →
        </Link>

      </div>

      {/* ปุ่ม */}
      <div className="game-card-footer">

        <button
          type="button"
          className="edit-button"
          onClick={onEdit}
        >
          ✏️ แก้ไข
        </button>

        <button
          type="button"
          className="delete-button"
          onClick={onDelete}
        >
          🗑️ ลบ
        </button>

      </div>

    </article>
  );
}