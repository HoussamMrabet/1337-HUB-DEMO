"use client";
import { User } from "@/types/leaderboard";
import { RankBadge } from "./ranks/RankBadge";
import { Shield, GraduationCap, Trophy, Crown } from "lucide-react";
import { useEffect, useState } from "react";

interface LeaderboardRowProps {
  user: User;
}

export function LeaderboardRow({ user }: LeaderboardRowProps) {
  const [clanStyle, setClanStyle] = useState("w-4 h-4");
  const bios = "w-4 h-4 bg-[#02cdd1] rounded-xl";
  const freax = "w-4 h-4 bg-[#f5bc39] rounded-xl";
  const pandora = "w-4 h-4 bg-[#b61282] rounded-xl";
  const commodor = "w-4 h-4 bg-[#235a16] rounded-xl";

  const isOwner = user.id === '165642';

  const getRowStyles = () => {
    let baseStyles =
      "group flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-lg transition-all border relative overflow-hidden ";

    if (isOwner) {
      return baseStyles + "bg-gradient-to-r from-indigo-500/20 via-purple-500/10 to-pink-500/20 border-indigo-400/30 hover:border-indigo-300/50 animate-gradient";
    } else if (user.rank === 1) {
      baseStyles +=
        "bg-gradient-to-r from-yellow-500/10 to-transparent border-yellow-500/30 hover:border-yellow-400/50";
    } else if (user.rank === 2) {
      baseStyles +=
        "bg-gradient-to-r from-gray-400/10 to-transparent border-gray-400/30 hover:border-gray-300/50";
    } else if (user.rank === 3) {
      baseStyles +=
        "bg-gradient-to-r from-amber-700/10 to-transparent border-amber-700/30 hover:border-amber-600/50";
    } else {
      baseStyles +=
        "hover:bg-white/5 border-gray-700/50 hover:border-blue-500/30";
    }

    return baseStyles;
  };

  useEffect(() => {
    const getClanStyles = () => {
      if ([75, 78, 282, 506].includes(user.coalition.id)) return freax;
      else if ([73, 79, 277, 504].includes(user.coalition.id)) return bios;
      else if ([76, 80, 281, 505].includes(user.coalition.id)) return commodor;
      else if ([74, 77, 279, 507].includes(user.coalition.id)) return pandora;
      else return "w-4 h-4";
    };
    setClanStyle(getClanStyles());
  }, [user]);

  return (
    <div id={user.username} className={getRowStyles()}>
      {/* Owner background effect */}
      {isOwner && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,transparent,black)]" />
          <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-indigo-500/10 via-purple-500/5 to-transparent" />
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl" />
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-xl" />
        </div>
      )}
      
      {/* Alumni background effect */}
      {user.alumni && !isOwner && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-amber-500/5 via-amber-500/3 to-transparent" />
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl" />
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-amber-500/3 rounded-full blur-xl" />
        </div>
      )}

      <div className="flex items-center gap-4 w-full sm:w-auto">
        <RankBadge rank={user.rank} />

        <div className="relative">
          <img
            src={user.avatar}
            alt={user.fullName}
            className={`w-12 h-12 rounded-full border-2 object-cover ${
              isOwner
                ? "border-indigo-500/50 ring-2 ring-purple-500/20 ring-offset-2 ring-offset-black/50"
                : user.alumni
                ? "border-amber-500/50"
                : user.rank <= 3
                ? "border-blue-500/50"
                : "border-gray-700"
            }`}
          />
          {isOwner && (
            <Crown className="absolute -top-2 -right-2 w-5 h-5 text-indigo-400 animate-pulse" />
          )}
        </div>

        <div className="flex-1 sm:hidden">
          <div className="font-medium text-white">Level {user.level}</div>
          <div className="w-24 bg-gray-700 rounded-full h-1.5 mt-1">
            <div
              className={`rounded-full h-1.5 transition-all duration-500 ${
                isOwner
                  ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                  : user.alumni
                  ? "bg-gradient-to-r from-amber-400 to-amber-600"
                  : user.rank <= 3
                  ? "bg-gradient-to-r from-blue-500 to-purple-500"
                  : "bg-blue-500"
              }`}
              style={{ width: `${user.levelProgress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <a
          href={`https://profile.intra.42.fr/users/${user.username}`}
          target="_blank"
          className="font-medium text-white group-hover:text-blue-400 truncate flex items-center gap-2"
        >
          {user.fullName}
          <span className="text-sm text-gray-400">{user.username}</span>
          {isOwner && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full text-indigo-400 text-xs border border-indigo-500/20">
              Owner
            </span>
          )}
          {user.alumni && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-amber-500/10 to-amber-600/10 rounded-full text-amber-400 text-xs border border-amber-500/20">
              <GraduationCap className="w-3 h-3" />
              Alumni
            </span>
          )}
        </a>

        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-1">
            {user.coalition.id ? (
              <img
                src={user.coalition.img}
                alt={user.coalition.name}
                className={clanStyle}
              />
            ) : (
              <Shield className={clanStyle} />
            )}
            {user.coalition.name}
          </div>
          <span className="inline">•</span>
          <span className="truncate">{user.campus}</span>
        </div>
      </div>

      <div className="hidden sm:flex items-center gap-6 ml-auto">
        <div>
          <div className="font-medium text-white">Level {user.level}</div>
          <div className="w-32 bg-gray-700 rounded-full h-1.5 mt-1">
            <div
              className={`rounded-full h-1.5 transition-all duration-500 ${
                isOwner
                  ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                  : user.alumni
                  ? "bg-gradient-to-r from-amber-400 to-amber-600"
                  : user.rank <= 3
                  ? "bg-gradient-to-r from-blue-500 to-purple-500"
                  : "bg-blue-500"
              }`}
              style={{ width: `${user.levelProgress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}