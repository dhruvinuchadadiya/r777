// Single source of truth for live match data — shared between InPlayPage and Header
// so counts stay in sync everywhere they're displayed.

export const liveMatchesData = {
  cricket: [
    {
      id: "c_live1",
      title: "India vs Australia",
      tournament: "ICC Champions Trophy",
      score: "IND 184/3 (24.2) • AUS 245/10",
      time: "In-Play 2nd Innings",
      isLive: true,
      back1: 1.62,
      lay1: 1.64,
      back2: 2.35,
      lay2: 2.38,
    },
    {
      id: "c_live2",
      title: "England vs South Africa",
      tournament: "International T20 Series",
      score: "ENG 92/1 (8.4)",
      time: "In-Play 1st Innings",
      isLive: true,
      back1: 1.88,
      lay1: 1.91,
      back2: 2.02,
      lay2: 2.06,
    },
    {
      id: "c_upcoming1",
      title: "Pakistan vs New Zealand",
      tournament: "Bilateral T20 Series",
      score: "Starts 18:00",
      time: "Upcoming",
      isLive: false,
      back1: 1.95,
      lay1: 1.98,
      back2: 1.85,
      lay2: 1.88,
    },
  ],
  soccer: [
    {
      id: "s_live1",
      title: "Real Madrid vs Barcelona",
      tournament: "La Liga",
      score: "2 - 1",
      time: "72' Live",
      isLive: true,
      back1: 1.45,
      lay1: 1.48,
      backX: 4.5,
      layX: 4.6,
      back2: 6.2,
      lay2: 6.4,
    },
    {
      id: "s_live2",
      title: "Arsenal vs Manchester City",
      tournament: "Premier League",
      score: "0 - 0",
      time: "38' Live",
      isLive: true,
      back1: 2.8,
      lay1: 2.84,
      backX: 3.1,
      layX: 3.15,
      back2: 2.5,
      lay2: 2.54,
    },
    {
      id: "s_upcoming1",
      title: "Bayern Munich vs PSG",
      tournament: "UEFA Champions League",
      score: "Kick-off 20:00",
      time: "Upcoming",
      isLive: false,
      back1: 2.1,
      lay1: 2.15,
      backX: 3.4,
      layX: 3.5,
      back2: 3.3,
      lay2: 3.4,
    },
  ],
  tennis: [
    {
      id: "t_live1",
      title: "Novak Djokovic vs Carlos Alcaraz",
      tournament: "Wimbledon Men's Final",
      score: "Set 3: (6-4, 3-6, 4-2)",
      time: "Set 3 In-Play",
      isLive: true,
      back1: 1.75,
      lay1: 1.78,
      back2: 2.15,
      lay2: 2.18,
    },
    {
      id: "t_upcoming1",
      title: "Rafael Nadal vs Roger Federer",
      tournament: "ATP Masters 1000",
      score: "Starts 16:00",
      time: "Upcoming",
      isLive: false,
      back1: 1.9,
      lay1: 1.94,
      back2: 1.9,
      lay2: 1.94,
    },
  ],
};

// Count only matches actually flagged isLive — not the full array length
export const getSportLiveCount = (sportKey) =>
  (liveMatchesData[sportKey] || []).filter((m) => m.isLive).length;

export const getTotalLiveCount = () =>
  Object.keys(liveMatchesData).reduce(
    (sum, key) => sum + getSportLiveCount(key),
    0,
  );
