"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";

export default function AuthChecker() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const checkAuth = async () => {
      const code = searchParams?.get("code");

      if (code) {
        localStorage.clear();
        Object.keys(Cookies.get()).forEach((cookieName) => {
          Cookies.remove(cookieName);
        });

        Cookies.set("tokenAccess", code);
        Cookies.set("flag", "01010100 01110010 01100111 00100000 01101110 00100000 01110000 01101000 01100110 01101000 01111010 01101000 01111001 01101110 01100111 01110010 01110001 00100000 01100111 01110110 01100111 01111001 01110010 00100000 01101100 01100010 01101000 00100000 01110000 01101110 01100001 00100000 01110001 01110010 01100110 01100011 01101110 01110110 01100101 00100000 01100010 01100001 00100000 01100111 01110101 01110010 00100000 01110110 01100001 01100111 01110010 01100101 01101110 01100001 01100111 00101110 00100000 01001111 01110010 01110000 01101110 01101000 01100110 01110010 00100000 01101100 01100010 01101000 00100000 01101010 01100010 01100101 01100111 01110101 00100000 01110110 01100111 00101110");
        router.push("/redirecting");
      } else {
        const tokenAccess = Cookies.get("tokenAccess");

        if (tokenAccess) {
          router.push("/redirecting");
        } else {
          router.push("/auth");
        }
      }
    };

    checkAuth();
  }, [router, searchParams]);

  return null;
}
