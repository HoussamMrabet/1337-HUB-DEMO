import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { jwtVerify } from "jose";

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

  try {
    const authSession = req.headers["authsession"];

    if (!authSession || Array.isArray(authSession)) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const secret = new TextEncoder().encode(
      process.env.NEXT_PUBLIC_JWT_SECRET
    );

    await jwtVerify(authSession, secret);
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized request" });
  }

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_ENPOINT}/users`,
      {
        headers: {
          "x-fetch-dev": process.env.NEXT_PUBLIC_API_KEY ?? "",
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error: any) {
    console.error("Error fetching users:", error.message);
    res
      .status(error.response?.status || 500)
      .json({ error: "Failed to fetch users data" });
  }
}
