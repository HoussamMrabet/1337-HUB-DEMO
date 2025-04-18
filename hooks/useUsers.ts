"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SignJWT } from "jose";
import Cookies from "js-cookie";

export interface User {
  id: number;
  rank?: number;
  login: string;
  url: string;
  displayname: string;
  image: { link: string };
  location: string;
  kind: string;
  level: number;
  campusId: string;
  begin_at: string;
  alumni: boolean;
}

const fetchUsers = async (signal: AbortSignal | undefined) => {
  let allUsers: User[] = [];

  try {

    const code = Cookies.get("tokenAccess");

    const secret = new TextEncoder().encode(
      process.env.NEXT_PUBLIC_JWT_SECRET
    );

    const token = await new SignJWT({ code })
      .setProtectedHeader({ alg: "HS256" })
      .sign(secret);

    const usersResponse = await axios.get(`/api/users`, {
      signal,
      headers: {
        "authSession": token,
        "Content-Type": "application/json",
      },
    });

    const usersData: any[] = usersResponse.data;
    for (const userData of usersData) {
      const user: User = {
        id: userData.user.id,
        login: userData.user.login,
        url: userData.user.url,
        displayname: userData.user.displayname,
        image: userData.user.image,
        location: userData.user.location,
        kind: userData.user.kind,
        level: userData.level.toFixed(2),
        campusId: userData.campusId,
        begin_at:
          userData.begin_at.substring(0, 5) == "2019-"
            ? userData.begin_at.substring(0, 7) == "2019-03"
              ? "2019-03"
              : "2019-10"
            : userData.begin_at.substring(0, 7),
        alumni: userData.user["alumni?"] || false,
      };
      if (
        !user.login.startsWith("3b3") &&
        !user.displayname.startsWith("3b3") &&
        user.kind === "student" &&
        !user.login.toLowerCase().includes("test") &&
        !user.displayname.toLowerCase().includes("test") &&
        ![
          "2024-11",
          "2023-05",
          "2023-02",
          "2022-07",
          "2022-04",
          "2021-10",
          "2020-12",
          "2020-10",
        ].includes(user.begin_at)
      ) {
        allUsers.push(user);
      }
    }
    const prepareUsers = allUsers.map((user) => ({
      ...user,
      begin_at: user.begin_at.startsWith("2019")
        ? user.begin_at
        : user.begin_at.substring(0, 4),
    }));
    const sortedUsers = prepareUsers.sort((a, b) => b.level - a.level);
    const usersWithRank = sortedUsers.map((user, index) => ({
      ...user,
      rank: index + 1,
    }));
    return usersWithRank;
  } catch (error: any) {
    throw new Error(`Error fetching users: ${error.message}`);
  }
};

const useUsers = () => {
  return useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: ({ signal }) => fetchUsers(signal),
  });
};
export default useUsers;
