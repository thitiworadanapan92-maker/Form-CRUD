import type { Game } from "@/app/types/game";

export const games: Game[] = [
  {
    id: "1",
    name: "Elden Ring",
    platform: "PC",
    hours: 80,
    status: "ยังไม่เริ่ม",
  },
  {
    id: "2",
    name: "Minecraft",
    platform: "PC",
    hours: 40,
    status: "กำลังเล่น",
  },
  {
    id: "3",
    name: "The Legend of Zelda: Tears of the Kingdom",
    platform: "Nintendo Switch",
    hours: 60,
    status: "เล่นจบแล้ว",
  },
  {
    id: "4",
    name: "God of War Ragnarök",
    platform: "PS5",
    hours: 30,
    status: "ยังไม่เริ่ม",
  },
  {
    id: "5",
    name: "Hogwarts Legacy",
    platform: "PS5",
    hours: 35,
    status: "กำลังเล่น",
  },
];