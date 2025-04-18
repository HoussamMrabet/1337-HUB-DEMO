"use client";
import { useEffect, useState } from "react";
import { Filter, Trophy } from "lucide-react";
import useClans, { clans } from "@/hooks/useClans";
import useUser from "@/hooks/useUser";
import useUsers from "@/hooks/useUsers";
import { ApiErrorScreen } from "@/components/error/ApiErrorScreen";
import { FilterOptions } from "@/types/leaderboard";
import { LeaderboardLoading } from "@/components/loading/LeaderboardLoading";
import { useAvailableFilters } from "@/hooks/useAvailableFilters";
import { useLeaderboardFilters } from "@/hooks/useLeaderboardFilters";
import { usePagination } from "@/hooks/usePagination";
import { useScrollToUser } from "@/hooks/useScrollToUser";
import { SearchBar } from "@/components/SearchBar";
import { Pagination } from "@/components/Pagination";
import { LeaderboardRow } from "@/components/LeaderboardRow";
import { LeaderboardFilters } from "@/components/filters/LeaderboardFilters";

const ITEMS_PER_PAGE = 20;

export function Leaderboard() {
  const {
    data: user,
    isLoading: isLoadingUser,
    error: errorUser,
    refetch: refetchUser,
  } = useUser();
  const { data: users, isLoading, error, refetch } = useUsers();
  const {
    data,
    isLoading: isLoadingClans,
    error: errorClans,
    refetch: refetchClans,
  } = useClans();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    coalitions: [],
    campuses: [],
    years: [],
  });

  useEffect(() => {
    const campus = [
      user?.campus[0].id == 16
        ? "Khouribga"
        : user?.campus[0].id == 21
        ? "Benguerir"
        : user?.campus[0].id == 55
        ? "MED"
        : user?.campus[0].id == 75
        ? "Rabat"
        : [],
    ].flat();

    const year = [
      user?.cursus_users
        .find((cursus) => cursus.cursus_id === 21)
        ?.begin_at?.startsWith("2019")
        ? user.cursus_users.find((cursus) => cursus.cursus_id === 21)
            ?.begin_at === "2019-03"
          ? user.cursus_users
              .find((cursus) => cursus.cursus_id === 21)
              ?.begin_at.substring(0, 7)
          : "2019-10"
        : user?.cursus_users
            .find((cursus) => cursus.cursus_id === 21)
            ?.begin_at.substring(0, 4),
    ]
      .flat()
      .filter((y): y is string => y !== undefined);

    setFilters({ coalitions: [], campuses: campus, years: year });
  }, [user]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const getCoalition = (id: number) => {
    let coalition = { id: 0, name: "", img: "", color: "" };
    if (!data) return coalition;
    let i = 0;
    while (i < data.length) {
      if (data[i].user_id == id) {
        coalition.id = data[i].coalition_id;
        break;
      }
      i++;
    }
    i = 0;
    while (i < clans.length) {
      if (clans[i].id.includes(coalition.id)) {
        coalition.name = clans[i].name;
        coalition.img = clans[i].image_url;
        coalition.color = clans[i].color;
        break;
      }
      i++;
    }
    return coalition;
  };

  const transformedUsers =
    users?.map((user) => ({
      id: user.id.toString(),
      fullName: user.displayname,
      username: user.login,
      level: user.level,
      levelProgress: (user.level % 1) * 100,
      campus:
        user.campusId == "16"
          ? "Khouribga"
          : user.campusId == "21"
          ? "Benguerir"
          : user.campusId == "55"
          ? "MED"
          : "Rabat",
      coalition: getCoalition(user.id),
      country: "Morocco",
      rank: user.rank || 1,
      previousRank: user.rank ? user.rank + 1 : 2,
      avatar: user.image.link,
      achievements: [],
      startYear: user.begin_at,
      alumni: user.alumni,
    })) || [];

  const getCurrentUser = () => {
    let i = 0;
    while (i < filteredUsers.length) {
      if (filteredUsers[i].id == user?.id.toLocaleString().split(",").join(""))
        return filteredUsers[i];
      i++;
    }
    return null;
  };

  const availableFilters = useAvailableFilters(transformedUsers);
  const filteredUsers = useLeaderboardFilters(
    transformedUsers,
    search,
    filters
  );
  const { paginatedUsers, totalPages } = usePagination({
    users: filteredUsers,
    currentPage,
    itemsPerPage: ITEMS_PER_PAGE,
  });

  const currentUser = getCurrentUser();
  const scrollToUserPosition = useScrollToUser({
    currentUser,
    filteredUsers,
    itemsPerPage: ITEMS_PER_PAGE,
    setCurrentPage,
  });

  const handleFilterChange = (key: keyof FilterOptions, value: string[]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  // if (!Cookies.get("logged")) return <LoadingScreen />;
  if (isLoading || isLoadingClans || isLoadingUser)
    return <LeaderboardLoading />;
  if (error)
    return (
      <ApiErrorScreen error={new Error(error.message)} onRetry={refetch} />
    );
  if (errorClans)
    return (
      <ApiErrorScreen
        error={new Error(errorClans.message)}
        onRetry={refetchClans}
      />
    );
  if (errorUser)
    return (
      <ApiErrorScreen
        error={new Error(errorUser.message)}
        onRetry={refetchUser}
      />
    );
  if (!data?.length)
    return (
      <ApiErrorScreen
        error={new Error("No clans found")}
        onRetry={refetchClans}
      />
    );
  if (!users?.length)
    return (
      <ApiErrorScreen error={new Error("No users found")} onRetry={refetch} />
    );
  if (!user)
    return (
      <ApiErrorScreen
        error={new Error("No users found")}
        onRetry={refetchUser}
      />
    );
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <div className="max-w-6xl mx-auto mb-6 px-4 py-8 sm:py-12">
        <div className="flex justify-start items-center mb-8 sm:mb-12">
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8 z-50 text-blue-400" />
            <h1 className="text-3xl sm:text-4xl z-50 font-bold text-white">Leaderboard</h1>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 mb-6">
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <SearchBar value={search} onChange={setSearch} />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex z-50 items-center justify-center gap-2 px-4 py-2 bg-gray-700/50 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-colors"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
                {Object.values(filters).flat().length > 0 && (
                  <span className="px-1.5 py-0.5 text-xs bg-blue-500 text-white rounded-full">
                    {Object.values(filters).flat().length}
                  </span>
                )}
              </button>
            </div>

            {showFilters && (
              <LeaderboardFilters
                filters={filters}
                onChange={handleFilterChange}
                availableFilters={availableFilters}
              />
            )}

            <div className="space-y-2">
              {paginatedUsers.map((user) => (
                <LeaderboardRow key={user.id} user={user} />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>

        {currentUser && (
          <div className="fixed z-[998] bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 backdrop-blur-sm">
            <div className="max-w-6xl mx-auto px-4 py-2 sm:py-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={scrollToUserPosition}
                  className="flex items-center gap-1 sm:gap-4 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg px-1 sm:px-2 py-1"
                >
                  <span className="text-white font-medium text-xs sm:text-base">
                    Your Rank:
                  </span>
                  <span className="text-lg sm:text-2xl font-bold text-white">
                    #{currentUser.rank}
                  </span>
                </button>
                <div className="text-gray-300 text-[10px] sm:text-sm">
                  Last updated: {new Date().toLocaleTimeString()}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
