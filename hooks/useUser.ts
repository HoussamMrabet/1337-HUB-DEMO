"use client";
import axios from "axios";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import { useQuery } from "@tanstack/react-query";

export interface Profile {
  id: number;
  email: string;
  login: string;
  first_name: string;
  last_name: string;
  usual_full_name: string;
  usual_first_name: string;
  url: string;
  phone: string;
  displayname: string;
  wallets: number;
  kind: string;
  image: {
    link: string;
    versions: {
      large: string;
      medium: string;
      small: string;
      micro: string;
    };
  };
  staff: boolean;
  correction_point: number;
  pool_month: string;
  pool_year: string;
  location: string;
  wallet: number;
  anonymize_date: string;
  data_erasure_date: string;
  created_at: string;
  updated_at: string;
  alumni: boolean;
  active: boolean;
  cursus_users: {
    id: number;
    begin_at: string;
    end_at: string;
    grade: string;
    level: number;
    skills: {
      id: number;
      name: string;
      level: number;
    }[];
    cursus_id: number;
    has_coalition: boolean;
    created_at: string;
    updated_at: string;
    user: {
      id: number;
      email: string;
      login: string;
      first_name: string;
      last_name: string;
      usual_full_name: string;
      usual_first_name: string;
      url: string;
      phone: string;
      displayname: string;
      kind: string;
      image: {
        link: string;
        versions: {
          large: string;
          medium: string;
          small: string;
          micro: string;
        };
      };
      staff: boolean;
      correction_point: number;
      pool_month: string;
      pool_year: string;
      location: string;
      wallet: number;
      anonymize_date: string;
      data_erasure_date: string;
      created_at: string;
      updated_at: string;
      alumni: boolean;
      active: boolean;
    };
    cursus: {
      id: number;
      created_at: string;
      name: string;
      slug: string;
      kind: string;
    };
  }[];
  projects_users: {
    id: number;
    occurrence: number;
    final_mark: number;
    status: string;
    validated?: true;
    current_team_id: number;
    project: {
      id: number;
      name: string;
      slug: string;
      parent_id: number;
    };
    cursus_ids: number[];
    marked_at: string;
    marked: true;
    retriable_at: string;
    created_at: string;
    updated_at: string;
  }[];
  campus: {
    id: number;
    name: string;
    time_zone: string;
    language: {
      id: number;
      name: string;
      identifier: string;
      created_at: string;
      updated_at: string;
    };
    users_count: number;
    vogsphere_id: number;
    country: string;
    address: string;
    zip: string;
    city: string;
    website: string;
    facebook: string;
    twitter: string;
    active: boolean;
    public: boolean;
    email_extension: string;
    default_hidden_phone: boolean;
  }[];
}

const fetchUser = async (signal: AbortSignal | undefined) => {
  const cachedUser = localStorage.getItem("userProfile");
  if (cachedUser)
  {
    if (process.env.NEXT_PUBLIC_ENCRYPTION_KEY) {
      return JSON.parse(
        CryptoJS.AES.decrypt(
          cachedUser,
          process.env.NEXT_PUBLIC_ENCRYPTION_KEY
        ).toString(CryptoJS.enc.Utf8)
      );
    } else {
      throw new Error("Encryption key is not defined");
    }
  }
  const code = Cookies.get("tokenAccess");
  if (!code) {
    throw new Error("Authorization required, logout and authentificate again");
  }

  try {
    const usersResponse = await axios.get(`/api/user?code=${code}`, { signal });
    if (process.env.NEXT_PUBLIC_ENCRYPTION_KEY) {
      localStorage.setItem(
        "userProfile",
        CryptoJS.AES.encrypt(
          JSON.stringify(usersResponse.data),
          process.env.NEXT_PUBLIC_ENCRYPTION_KEY
        ).toString()
      );
    } else {
      throw new Error("Encryption key is not defined");
    }
    return usersResponse.data;
  } catch (error: any) {
    if (axios.isCancel(error)) {
      return Promise.reject(new Error("Request was canceled"));
    }
    throw new Error(`Error fetching user profile: ${error.message}`);
  }
};

const useUser = () => {
  return useQuery<Profile, Error>({
    queryKey: ["profile"],
    queryFn: ({ signal }) => fetchUser(signal),
  });
};

export default useUser;
