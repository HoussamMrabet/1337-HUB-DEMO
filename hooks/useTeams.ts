"use client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { SignJWT } from "jose";

export const projectsList = [
  {
    id: 1314,
    name: "Libft",
    slug: "42cursus-libft",
  },
  {
    id: 1316,
    name: "ft_printf",
    slug: "42cursus-ft_printf",
  },
  {
    id: 1327,
    name: "get_next_line",
    slug: "42cursus-get_next_line",
  },
  {
    id: 1994,
    name: "Born2beroot",
    slug: "born2beroot",
  },
  {
    id: 2005,
    name: "minitalk",
    slug: "minitalk",
  },
  {
    id: 2004,
    name: "pipex",
    slug: "pipex",
  },
  {
    id: 2009,
    name: "so_long",
    slug: "so_long",
  },
  {
    id: 1476,
    name: "fract-ol",
    slug: "42cursus-fract-ol",
  },
  {
    id: 2008,
    name: "FdF",
    slug: "42cursus-fdf",
  },
  {
    id: 1471,
    name: "push_swap",
    slug: "42cursus-push_swap",
  },
  {
    id: 1334,
    name: "Philosophers",
    slug: "42cursus-philosophers",
  },
  {
    id: 1331,
    name: "minishell",
    slug: "42cursus-minishell",
  },
  {
    id: 2007,
    name: "NetPractice",
    slug: "netpractice",
  },
  {
    id: 1315,
    name: "miniRT",
    slug: "minirt",
  },
  {
    id: 1326,
    name: "cub3d",
    slug: "cub3d",
  },
  {
    id: 1338,
    name: "CPP Module 00",
    slug: "cpp-module-00",
  },
  {
    id: 1339,
    name: "CPP Module 01",
    slug: "cpp-module-01",
  },
  {
    id: 1340,
    name: "CPP Module 02",
    slug: "cpp-module-02",
  },
  {
    id: 1341,
    name: "CPP Module 03",
    slug: "cpp-module-03",
  },
  {
    id: 1342,
    name: "CPP Module 04",
    slug: "cpp-module-04",
  },
  {
    id: 1343,
    name: "CPP Module 05",
    slug: "cpp-module-05",
  },
  {
    id: 1344,
    name: "CPP Module 06",
    slug: "cpp-module-06",
  },
  {
    id: 1345,
    name: "CPP Module 07",
    slug: "cpp-module-07",
  },
  {
    id: 1346,
    name: "CPP Module 08",
    slug: "cpp-module-08",
  },
  {
    id: 2309,
    name: "CPP Module 09",
    slug: "cpp-module-09",
  },
  {
    id: 1983,
    name: "Inception",
    slug: "inception",
  },
  {
    id: 1336,
    name: "ft_irc",
    slug: "ft_irc",
  },
  {
    id: 1332,
    name: "webserv",
    slug: "webserv",
  },
  {
    id: 1337,
    name: "ft_transcendence",
    slug: "ft_transcendence",
  },
  {
    id: 2268,
    name: "Python - 0 - Starting",
    slug: "python-0-starting",
  },
  {
    id: 2269,
    name: "Python - 1 - Array",
    slug: "python-1-array",
  },
  {
    id: 2270,
    name: "Python - 2 - DataTable",
    slug: "python-2-datatable",
  },
  {
    id: 2271,
    name: "Python - 3 - OOP",
    slug: "python-3-oop",
  },
  {
    id: 2272,
    name: "Python - 4 - Dod",
    slug: "python-4-dod",
  },
  {
    id: 2320,
    name: "Java Module 00",
    slug: "java-module-00",
  },
  {
    id: 2321,
    name: "Java Module 01",
    slug: "java-module-01",
  },
  {
    id: 2322,
    name: "Java Module 02",
    slug: "java-module-02",
  },
  {
    id: 2329,
    name: "Java Module 03",
    slug: "java-module-03",
  },
  {
    id: 2330,
    name: "Java Module 04",
    slug: "java-module-04",
  },
  {
    id: 2331,
    name: "Java Module 05",
    slug: "java-module-05",
  },
  {
    id: 2332,
    name: "Java Module 06",
    slug: "java-module-06",
  },
  {
    id: 2333,
    name: "Java Module 07",
    slug: "java-module-07",
  },
  {
    id: 2334,
    name: "Java Module 08",
    slug: "java-module-08",
  },
  {
    id: 2335,
    name: "Java Module 09",
    slug: "java-module-09",
  },
  {
    id: 1638,
    name: "Internship I",
    slug: "internship-i",
  },
  {
    id: 1644,
    name: "Internship II",
    slug: "internship-ii",
  },
  {
    id: 1662,
    name: "Startup Internship",
    slug: "42cursus-startup-internship",
  },
];

export interface TeamUser {
  id: number;
  login: string;
  url: string;
  leader: boolean;
}

export interface Team {
  id: number;
  campusId: string;
  created_at: string;
  name: string;
  url: string;
  project_id: number;
  status: string;
  users: TeamUser[];
}

const fetchTeams = async (signal: AbortSignal | undefined) => {
  let allTeams: Team[] = [];

  try {
    const code = Cookies.get("tokenAccess");

    const secret = new TextEncoder().encode(
      process.env.NEXT_PUBLIC_JWT_SECRET
    );

    const token = await new SignJWT({ code })
      .setProtectedHeader({ alg: "HS256" })
      .sign(secret);

    const teamsResponse = await axios.get(`/api/teams`, {
      signal,
      headers: {
        "authSession": token,
        "Content-Type": "application/json",
      },
    });

    const teamsData: any[] = teamsResponse.data;

    for (const teamData of teamsData) {
      const users: TeamUser[] = teamData.users.map((userData: any) => ({
        id: userData.id,
        login: userData.login,
        url: userData.url,
        leader: userData.leader,
      }));

      const team: Team = {
        id: teamData.id,
        campusId: teamData.campusId,
        created_at: teamData.created_at,
        name: teamData.name,
        url: teamData.url,
        project_id: teamData.project_id,
        status: teamData.status,
        users: users,
      };

      allTeams.push(team);
    }
    return allTeams;
  } catch (error: any) {
    throw new Error(`Error fetching teams: ${error.message}`);
  }
};

const useTeams = () => {
  return useQuery<Team[], Error>({
    queryKey: ["teams"],
    queryFn: ({ signal }) => fetchTeams(signal),
  });
};

export default useTeams;
