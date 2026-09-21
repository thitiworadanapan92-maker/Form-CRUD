"use client";

import { games } from "@/app/data/gamedata";
import GameExplorer from "../components/GameExplorer";

export default function GamesPage() {
  return (
    <>
      <GameExplorer initialGames={games} />
    </>
  );
}