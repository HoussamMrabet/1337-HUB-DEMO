import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("Access-Control-Allow-Origin", "https://1337-hub.com");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: "Invalid request." });
  }

  try {
    const tokenResponse = await axios.post(
      "https://api.intra.42.fr/oauth/token",
      {
        grant_type: "authorization_code",
        client_id: process.env.NEXT_PUBLIC_AUTH_USERNAME,
        client_secret: process.env.NEXT_PUBLIC_AUTH_PASSWORD,
        code: code,
        redirect_uri: "https://www.1337-hub.com/",
      }
    );

    const accessToken = tokenResponse.data.access_token;

    const usersResponse = await axios.get("https://api.intra.42.fr/v2/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_ENPOINT}/logs?login=${usersResponse.data.login}`,
      {
        headers: {
          "x-fetch-dev": process.env.NEXT_PUBLIC_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );
    res.status(200).json(usersResponse.data);
  } catch (error: any) {
    res
      .status(error.response?.status || 500)
      .json({ error: "Failed to fetch user data" });
  }
}
