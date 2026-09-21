"use client";

import { useMemo, useState } from "react";
import type {
  Game,
  GameStatus,
} from "@/app/types/game";

import type { GameDraft } from "./GameForm";
import GameCard from "./GameCard";
import GameForm from "./GameForm";

type GameExplorerProps = {
  initialGames: Game[];
};

type StatusFilter =
  | "ทั้งหมด"
  | GameStatus;

export default function GameExplorer({
  initialGames,
}: GameExplorerProps) {

  // รายการเกมทั้งหมด
  const [games, setGames] =
    useState<Game[]>(initialGames);

  // เกมที่กำลังแก้ไข
  const [editingId, setEditingId] =
    useState<string | null>(null);

  // ช่องค้นหา
  const [keyword, setKeyword] =
    useState("");

  // ตัวกรองสถานะ
  const [statusFilter, setStatusFilter] =
    useState<StatusFilter>("ทั้งหมด");

  // เกมที่รอยืนยันการลบ
  const [deleteId, setDeleteId] =
    useState<string | null>(null);

  // =========================
  // เพิ่มเกม
  // =========================
  function handleCreate(
    draft: GameDraft
  ) {
    const newGame: Game = {
      id: crypto.randomUUID(),
      name: draft.name.trim(),
      platform: draft.platform,
      hours: Number(draft.hours),
      status: draft.status,
    };

    setGames((prevGames) => [
      ...prevGames,
      newGame,
    ]);
  }

  // =========================
  // แก้ไขเกม
  // =========================
  function handleUpdate(
    id: string,
    draft: GameDraft
  ) {
    setGames((prevGames) =>
      prevGames.map((game) =>
        game.id === id
          ? {
              ...game,
              name: draft.name.trim(),
              platform: draft.platform,
              hours: Number(
                draft.hours
              ),
              status: draft.status,
            }
          : game
      )
    );

    setEditingId(null);
  }

  // =========================
  // บันทึก
  // =========================
  function handleSave(
    draft: GameDraft
  ) {
    if (editingId === null) {
      handleCreate(draft);
    } else {
      handleUpdate(
        editingId,
        draft
      );
    }
  }

  // =========================
  // เปลี่ยนสถานะ
  // =========================
  function handleStatusChange(
    id: string,
    status: GameStatus
  ) {
    setGames((prevGames) =>
      prevGames.map((game) =>
        game.id === id
          ? {
              ...game,
              status,
            }
          : game
      )
    );
  }

  // =========================
  // ลบเกม
  // =========================
  function handleDelete(
    id: string
  ) {
    setGames((prevGames) =>
      prevGames.filter(
        (game) => game.id !== id
      )
    );

    if (editingId === id) {
      setEditingId(null);
    }

    setDeleteId(null);
  }

  // เกมที่กำลังแก้ไข
  const editingGame = games.find(
    (game) => game.id === editingId
  );

  // =========================
  // ค้นหา + กรองสถานะ
  // =========================
  const filteredGames = useMemo(() => {
    return games.filter((game) => {

      const matchKeyword =
        game.name
          .toLowerCase()
          .includes(
            keyword.toLowerCase()
          );

      const matchStatus =
        statusFilter === "ทั้งหมด" ||
        game.status === statusFilter;

      return (
        matchKeyword &&
        matchStatus
      );
    });
  }, [
    games,
    keyword,
    statusFilter,
  ]);

  // =========================
  // Derived State
  // ชั่วโมงรวมเกมที่ยังไม่เริ่ม
  // =========================
  const notStartedHours =
    useMemo(() => {
      return games
        .filter(
          (game) =>
            game.status ===
            "ยังไม่เริ่ม"
        )
        .reduce(
          (total, game) =>
            total + game.hours,
          0
        );
    }, [games]);

  return (
    <main className="games-page">

      <div className="games-container">

        {/* =====================
            Header
        ====================== */}
        <section className="games-hero">

          <div className="games-hero-text">

            <div className="games-badge">
              🎮 GAME BACKLOG
            </div>

            <h1 className="games-heading">
              เกมที่อยากเล่น
            </h1>

            <p className="games-description">
              บันทึกรายการเกมที่ตั้งใจจะเล่น
              พร้อมติดตามสถานะการเล่น
            </p>

          </div>

          <div className="game-summary">

            <div className="game-summary-icon">
              🎮
            </div>

            <div>

              <span className="game-summary-number">
                {games.length}
              </span>

              <span className="game-summary-text">
                เกม
              </span>

            </div>

          </div>

        </section>

        {/* =====================
            ชั่วโมงรวม
        ====================== */}
        <section className="game-hours-summary">

          <div className="game-hours-icon">
            ⏱️
          </div>

          <div>

            <span className="game-hours-label">
              ชั่วโมงรวมของเกมที่ยังไม่เริ่ม
            </span>

            <strong className="game-hours-number">
              {notStartedHours} ชั่วโมง
            </strong>

          </div>

        </section>

        {/* =====================
            Form
        ====================== */}
        <section className="game-form-section">

          <GameForm
            key={
              editingId ?? "new"
            }
            initialGame={editingGame}
            onSave={handleSave}
            onCancel={() =>
              setEditingId(null)
            }
          />

        </section>

        {/* =====================
            Search + Filter
        ====================== */}
        <section className="game-filter-section">

          <div className="search-box">

            <label htmlFor="game-search">
              ค้นหาชื่อเกม
            </label>

            <input
              id="game-search"
              type="text"
              value={keyword}
              onChange={(event) =>
                setKeyword(
                  event.target.value
                )
              }
              placeholder="พิมพ์ชื่อเกม..."
            />

          </div>

          <div className="status-filter">

            <label htmlFor="status-filter">
              กรองตามสถานะ
            </label>

            <select
              id="status-filter"
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(
                  event.target.value as StatusFilter
                )
              }
            >

              <option value="ทั้งหมด">
                ทั้งหมด
              </option>

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

        </section>

        {/* =====================
            รายการเกม
        ====================== */}
        <section className="game-list-header">

          <h2>
            รายการเกมทั้งหมด
          </h2>

          <span>
            แสดง{" "}
            {filteredGames.length} /{" "}
            {games.length} เกม
          </span>

        </section>

        {filteredGames.length === 0 ? (

          <section className="empty-state">

            <div className="empty-icon">
              🎮
            </div>

            <h2>
              ไม่พบเกม
            </h2>

            <p>
              ลองเปลี่ยนคำค้นหาหรือตัวกรองสถานะ
            </p>

          </section>

        ) : (

          <section className="game-grid">

            {filteredGames.map(
              (game) => (

                <GameCard
                  key={game.id}
                  game={game}

                  onEdit={() =>
                    setEditingId(
                      game.id
                    )
                  }

                  onDelete={() =>
                    setDeleteId(
                      game.id
                    )
                  }

                  onStatusChange={(
                    status
                  ) =>
                    handleStatusChange(
                      game.id,
                      status
                    )
                  }
                />

              )
            )}

          </section>

        )}

        {/* =====================
            ยืนยันการลบ
        ====================== */}
        {deleteId !== null && (

          <div className="delete-modal">

            <div className="delete-modal-content">

              <h2>
                ยืนยันการลบ
              </h2>

              <p>
                คุณต้องการลบเกมนี้หรือไม่?
              </p>

              <div className="delete-modal-actions">

                <button
                  type="button"
                  className="delete-confirm-button"
                  onClick={() =>
                    handleDelete(
                      deleteId
                    )
                  }
                >
                  🗑️ ยืนยันลบ
                </button>

                <button
                  type="button"
                  className="delete-cancel-button"
                  onClick={() =>
                    setDeleteId(null)
                  }
                >
                  ยกเลิก
                </button>

              </div>

            </div>

          </div>

        )}

      </div>

    </main>
  );
}