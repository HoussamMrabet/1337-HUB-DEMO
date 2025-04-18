"use client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { SignJWT } from "jose";

export interface Clan {
  id: number;
  name: string;
  slug: string;
  image_url: string;
  color: string;
  score: number;
  user_id: number;
}

export interface Data {
  id: number;
  coalition_id: number;
  user_id: number;
  score: number;
  rank: number;
  created_at: string;
  updated_at: string;
}

export const clans = [
  {
    id: [75, 78, 282, 506],
    name: "Freax",
    slug: "42cursus-khouribga-philantropists",
    image_url:
      "https://cdn.intra.42.fr/coalition/image/75/Freax_Artboard_4.svg",
    cover_url: "https://cdn.intra.42.fr/coalition/cover/75/Freax_BG.jpg",
    color: "#f5bc39",
    score: 863478,
    user_id: 145509,
  },
  {
    id: [76, 80, 281, 505],
    name: "Commodore",
    slug: "42cursus-khouribga-idealists",
    image_url:
      "https://cdn.intra.42.fr/coalition/image/76/Commodore_Artboard_3.svg",
    cover_url: "https://cdn.intra.42.fr/coalition/cover/76/Commodore_BG.jpg",
    color: "#235a16",
    score: 805678,
    user_id: 74205,
  },
  {
    id: [74, 77, 279, 507],
    name: "Pandora",
    slug: "42cursus-khouribga-insomniacs",
    image_url: "https://cdn.intra.42.fr/coalition/image/74/Pandora-01.svg",
    cover_url: "https://cdn.intra.42.fr/coalition/cover/74/Pandora_BG.jpg",
    color: "#b61282",
    score: 719284,
    user_id: 105051,
  },
  {
    id: [73, 79, 277, 504],
    name: "Bios",
    slug: "42cursus-khouribga-observers",
    image_url: "https://cdn.intra.42.fr/coalition/image/73/Bios-02.svg",
    cover_url: "https://cdn.intra.42.fr/coalition/cover/73/BiosBG.jpg",
    color: "#02cdd1",
    score: 715593,
    user_id: 157636,
  },
];

const fetchClans = async (signal: AbortSignal | undefined) => {
  let allClans: Data[] = [];
  try {
    const code = Cookies.get("tokenAccess");

    const secret = new TextEncoder().encode(
      process.env.NEXT_PUBLIC_JWT_SECRET
    );

    const token = await new SignJWT({ code })
      .setProtectedHeader({ alg: "HS256" })
      .sign(secret);

    const clansResponse = await axios.get("/api/clans", {
      signal,
      headers: {
        "authSession": token,
        "Content-Type": "application/json",
      },
    });

    let k = 0;
    while (k < clansResponse.data.length) {
      allClans.push(clansResponse.data[k]);
      k++;
    }
    return allClans;
  } catch (error: any) {
    throw new Error(`Error fetching clans: ${error.message}`);
  }
};

const useClans = () => {
  return useQuery<Data[], Error>({
    queryKey: ["clans"],
    queryFn: ({ signal }) => fetchClans(signal),
  });
};

export default useClans;
