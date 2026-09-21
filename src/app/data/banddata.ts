import type { Band } from "../types/band";

export const bands: Band[] = [
  {
    id: 1,
    name: "NEFFEX",
    genre: "Electronic / Rock",
    description:
      "วงดนตรีที่มีเพลงแนว Electronic Rock และมีเพลงที่ให้พลังและแรงบันดาลใจ",
    image: "/images/bands/neffex.jpg",
    members: [
      {
        name: "Bryce Savage",
        role: "Vocal / Producer",
        image: "/images/bands/mamber/bryce-savage.jpg",
      },
    ],
  },
  {
    id: 2,
    name: "Imagine Dragons",
    genre: "Pop Rock",
    description:
      "วงดนตรีอเมริกันที่มีเพลงแนว Pop Rock และ Alternative Rock",
    image: "/images/bands/imagine dragons.jpg",
    members: [
      { name: "Dan Reynolds", role: "Vocal", image: "/images/bands/mamber/dan-reynolds.jpg" },
      { name: "Wayne Sermon", role: "Guitar", image: "/images/bands/mamber/wayne-sermon.jpg" },
      { name: "Ben McKee", role: "Bass", image: "/images/bands/mamber/ben-mckee.jpg" },
      { name: "Daniel Platzman", role: "Drums", image: "/images/bands/mamber/daniel-platzman.jpg" },
    ],
  },
  {
    id: 3,
    name: "The Score",
    genre: "Alternative Rock",
    description:
      "วงดนตรีที่มีเพลงแนว Alternative Rock และเพลงที่สร้างแรงบันดาลใจ",
    image: "/images/bands/the score.jpg",
    members: [
      { name: "Eddie Anthony", role: "Vocal / Guitar", image: "/images/bands/mamber/eddie-anthony.jpg" },
      { name: "Edan Dover", role: "Keyboard / Producer", image: "/images/bands/mamber/edan-dover.jpg" },
    ],
  },
];
