"use client";
import { User } from "@/types/leaderboard";
import { useMemo } from "react";

export function useAvailableFilters(users: User[]) {
  return useMemo(() => {
    const coalitions = Array.from(
      new Set(
        users
          .filter((u) => u.coalition.name.trim() !== "")
          .map((u) => u.coalition.name)
      )
    ).map((coalition) => ({ value: coalition, label: coalition }));
    const campuses = Array.from(new Set(users.map((u) => u.campus))).map(
      (campus) => ({ value: campus, label: campus })
    );

    const years = Array.from(new Set(users.map((u) => u.startYear)))
      .sort()
      .map((year) => ({ value: year.toString(), label: year.toString() }));

    return { coalitions, campuses, years };
  }, [users]);
}
