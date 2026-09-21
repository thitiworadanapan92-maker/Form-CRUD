import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { games } from "@/app/data/gamedata";

type GameDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

// ค้นหาเกมจาก id
function getGame(id: string) {
  return games.find((game) => game.id === id);
}

// กำหนดชื่อแท็บตามชื่อเกม
export async function generateMetadata({
  params,
}: GameDetailPageProps): Promise<Metadata> {
  const { id } = await params;

  const game = getGame(id);

  if (!game) {
    return {
      title: "ไม่พบเกม",
    };
  }

  return {
    title: game.name,
    description: `รายละเอียดเกม ${game.name}`,
  };
}

// หน้ารายละเอียดเกม
export default async function GameDetailPage({
  params,
}: GameDetailPageProps) {
  const { id } = await params;

  const game = getGame(id);

  // ถ้าไม่พบเกม ให้แสดงหน้า 404
  if (!game) {
    notFound();
  }

  return (
    <main className="game-detail-page">
      <div className="game-detail-container">

        {/* ส่วนหัว */}
        <div className="game-detail-header">
          <div className="game-detail-icon">
            🎮
          </div>

          <div>
            <p className="game-detail-label">
              GAME DETAILS
            </p>

            <h1 className="game-detail-title">
              {game.name}
            </h1>
          </div>
        </div>

        {/* รายละเอียดเกม */}
        <section className="game-detail-card">
          <div className="game-detail-item">
            <span className="game-detail-item-icon">
              🕹️
            </span>

            <div>
              <span className="game-detail-item-label">
                แพลตฟอร์ม
              </span>

              <strong>
                {game.platform}
              </strong>
            </div>
          </div>

          <div className="game-detail-item">
            <span className="game-detail-item-icon">
              ⏱️
            </span>

            <div>
              <span className="game-detail-item-label">
                จำนวนชั่วโมงที่คาดว่าจะเล่น
              </span>

              <strong>
                {game.hours} ชั่วโมง
              </strong>
            </div>
          </div>

          <div className="game-detail-item">
            <span className="game-detail-item-icon">
              📌
            </span>

            <div>
              <span className="game-detail-item-label">
                สถานะ
              </span>

              <strong>
                {game.status}
              </strong>
            </div>
          </div>
        </section>

        {/* ID เกม */}
        <div className="game-detail-id">
          Game ID: {game.id}
        </div>

      </div>
    </main>
  );
}