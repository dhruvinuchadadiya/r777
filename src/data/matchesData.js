// Single shared source for all sport matches, used by both BettingTables and InPlayPage.
// isLive flags which matches are currently in-play vs upcoming.

export const matchesData = {
  cricket: [
    {
      id: "c1",
      date: "05 Aug 13:30",
      league: "The Hundred",
      team1: "Birmingham Phoenix",
      team2: "Manchester Originals",
      hasBM: true,
      isLive: false,
      score: null,
      liveStatus: null,
      odds: { team1: [450, 0], draw: [625, 0], team2: [550, 0] },
    },
    {
      id: "c2",
      date: "24 Jul 06:00",
      league: "County Championship",
      team1: "Glamorgan",
      team2: "Yorkshire",
      isLive: false,
      score: null,
      liveStatus: null,
      odds: { team1: [2.84, 2.98], team2: [1.51, 1.54] },
    },
    {
      id: "c_live1",
      date: "Today",
      league: "ICC Champions Trophy",
      team1: "India",
      team2: "Australia",
      isLive: true,
      score: "IND 184/3 (24.2) • AUS 245/10",
      liveStatus: "In-Play 2nd Innings",
      odds: { team1: [1.62, 1.64], team2: [2.35, 2.38] },
    },
    {
      id: "c_live2",
      date: "Today",
      league: "International T20 Series",
      team1: "England",
      team2: "South Africa",
      isLive: true,
      score: "ENG 92/1 (8.4)",
      liveStatus: "In-Play 1st Innings",
      odds: { team1: [1.88, 1.91], team2: [2.02, 2.06] },
    },
  ],
  soccer: [
    {
      id: "s1",
      date: "24 Jul 13:00",
      league: "Denmark Superliga",
      team1: "Viborg",
      team2: "OB",
      isLive: false,
      score: null,
      liveStatus: null,
      odds: { team1: [1.96, 1.98], draw: [3.95, 4], team2: [4, 4.2] },
    },
    {
      id: "s_live1",
      date: "Today",
      league: "La Liga",
      team1: "Real Madrid",
      team2: "Barcelona",
      isLive: true,
      score: "2 - 1",
      liveStatus: "72' Live",
      odds: { team1: [1.45, 1.48], draw: [4.5, 4.6], team2: [6.2, 6.4] },
    },
    {
      id: "s_live2",
      date: "Today",
      league: "Premier League",
      team1: "Arsenal",
      team2: "Manchester City",
      isLive: true,
      score: "0 - 0",
      liveStatus: "38' Live",
      odds: { team1: [2.8, 2.84], draw: [3.1, 3.15], team2: [2.5, 2.54] },
    },
  ],
  tennis: [
    {
      id: "t1",
      date: "24 Jul 05:00",
      league: "WTA",
      team1: "La Tararudee",
      team2: "Snigur",
      hasTV: true,
      hasBM: true,
      isLive: false,
      score: null,
      liveStatus: null,
      odds: { team1: [2.96, 2.98], team2: [1.5, 1.51] },
    },
    {
      id: "t_live1",
      date: "Today",
      league: "Wimbledon Men's Final",
      team1: "Novak Djokovic",
      team2: "Carlos Alcaraz",
      hasTV: true,
      isLive: true,
      score: "Set 3: (6-4, 3-6, 4-2)",
      liveStatus: "Set 3 In-Play",
      odds: { team1: [1.75, 1.78], team2: [2.15, 2.18] },
    },
  ],
};

export const getSportLiveCount = (sportKey) =>
  (matchesData[sportKey] || []).filter((m) => m.isLive).length;

export const getTotalLiveCount = () =>
  Object.keys(matchesData).reduce(
    (sum, key) => sum + getSportLiveCount(key),
    0,
  );
