export const heroBanners = [
  {
    id: 1,
    desktop: "/images/hero/main-banner0.webp",
    mobile: "/images/hero/main-banner-mobile0.webp",
    title: "OWN THE GAME.",
    subtitle: "WIN WITHOUT LIMITS.",
    sports: ["Cricket", "Football", "Tennis", "Basketball", "MMA"],
  },
  {
    id: 2,
    desktop: "/images/hero/main-banner1.webp",
    mobile: "/images/hero/main-banner-mobile1.webp",
    title: "LIVE BETTING",
    subtitle: "REAL-TIME ACTION",
    sports: ["Cricket", "Football", "Tennis", "Basketball", "MMA"],
  },
  {
    id: 3,
    desktop: "/images/hero/main-banner2.webp",
    mobile: "/images/hero/main-banner-mobile2.webp",
    title: "BIG WINS",
    subtitle: "AWAIT YOU",
    sports: ["Cricket", "Football", "Tennis", "Basketball", "MMA"],
  },
];

export const promoCards = [
  {
    id: 1,
    title: "HIT THE SIX",
    subtitle: "BOWL THEM OUT\nCHASE THE SCORE",
    category: "Cricket",
    icon: "cricket",
  },
  {
    id: 2,
    title: "SPIN TO WIN!",
    subtitle: "JACKPOT FEVER!\nHIT THE SLOTS!",
    category: "Slot",
    icon: "slot",
  },
  {
    id: 3,
    title: "SMASH THE ACE",
    subtitle: "RALLY TO WIN!\nGAME SET MATCH!",
    category: "Tennis",
    icon: "tennis",
  },
];

export const topGames = [
  {
    id: 1,
    image: "/images/topgames/topgame1.webp",
    name: "Aviator",
  },
  {
    id: 2,
    image: "/images/topgames/topgame2.webp",
    name: "Crazy Time",
  },
  {
    id: 3,
    image: "/images/topgames/topgame3.webp",
    name: "Teen Patti",
  },
  {
    id: 4,
    image: "/images/topgames/topgame4.webp",
    name: "Andar Bahar",
  },
  {
    id: 5,
    image: "/images/topgames/topgame5.webp",
    name: "Dragon Tiger",
  },
  {
    id: 6,
    image: "/images/topgames/topgame6.webp",
    name: "Roulette",
  },
  {
    id: 7,
    image: "/images/topgames/topgame7.webp",
    name: "Baccarat",
  },
  {
    id: 8,
    image: "/images/topgames/topgame8.webp",
    name: "Blackjack",
  },
  {
    id: 9,
    image: "/images/topgames/topgame9.webp",
    name: "Poker",
  },
];

export const cricketMatches = [
  {
    id: 1,
    date: "05 Aug 13:30",
    league: "The Hundred",
    team1: "Birmingham Phoenix",
    team2: "Manchester Originals",
    hasBM: true,
    odds: {
      team1: [450, 0],
      draw: [625, 0],
      team2: [550, 0],
    },
  },
  {
    id: 2,
    date: "24 Jul 06:00",
    league: "County Championship",
    team1: "Glamorgan",
    team2: "Yorkshire",
    odds: {
      team1: [2.84, 2.98],
      team2: [1.51, 1.54],
    },
  },
  {
    id: 3,
    date: "24 Jul 06:00",
    league: "County Championship",
    team1: "Hampshire",
    team2: "Middlesex",
    odds: {
      team1: [1.5, 1.64],
      team2: [2.56, 3],
    },
  },
  {
    id: 4,
    date: "24 Jul 06:00",
    league: "County Championship",
    team1: "Kent",
    team2: "Northamptonshire",
    odds: {
      team1: [1.92, 1.93],
      team2: [2.06, 2.08],
    },
  },
  {
    id: 5,
    date: "24 Jul 06:00",
    league: "County Championship",
    team1: "Surrey",
    team2: "Leicestershire",
    odds: {
      team1: [2.3, 2.36],
      team2: [1.74, 1.76],
    },
  },
  {
    id: 6,
    date: "24 Jul 06:00",
    league: "County Championship",
    team1: "Worcestershire",
    team2: "Derbyshire",
    odds: {
      team1: [1.6, 1.74],
      team2: [2.36, 2.68],
    },
  },
];

export const soccerMatches = [
  {
    id: 1,
    date: "24 Jul 13:00",
    league: "Denmark Superliga",
    team1: "Viborg",
    team2: "OB",
    odds: {
      team1: [1.96, 1.98],
      draw: [3.95, 4],
      team2: [4, 4.2],
    },
  },
];

export const tennisMatches = [
  {
    id: 1,
    date: "24 Jul 05:00",
    league: "WTA",
    player1: "La Tararudee",
    player2: "Snigur",
    hasTV: true,
    hasBM: true,
    odds: {
      player1: [2.96, 2.98],
      player2: [1.5, 1.51],
    },
  },
  {
    id: 2,
    date: "24 Jul 06:30",
    league: "ATP",
    player1: "Hanfmann",
    player2: "Halys",
    hasTV: true,
    hasBM: true,
    odds: {
      player1: [1.66, 1.68],
      player2: [2.46, 2.5],
    },
  },
  {
    id: 3,
    date: "24 Jul 06:30",
    league: "WTA",
    player1: "M Bouzkova",
    player2: "T Valentova",
    hasTV: true,
    hasBM: true,
    odds: {
      player1: [1.58, 1.6],
      player2: [2.66, 2.7],
    },
  },
  {
    id: 4,
    date: "24 Jul 06:30",
    league: "WTA",
    player1: "M Sherif",
    player2: "P Badosa",
    hasTV: true,
    hasBM: true,
    odds: {
      player1: [2.46, 2.5],
      player2: [1.67, 1.69],
    },
  },
  {
    id: 5,
    date: "24 Jul 07:00",
    league: "ATP",
    player1: "Ti Torres",
    player2: "Hug Gaston",
    hasTV: true,
    hasBM: true,
    odds: {
      player1: [3.15, 3.25],
      player2: [1.44, 1.46],
    },
  },
  {
    id: 6,
    date: "24 Jul 11:00",
    league: "WTA",
    player1: "Tama Korpatsch",
    player2: "A Kalinina",
    hasTV: true,
    hasBM: true,
    odds: {
      player1: [4.1, 4.3],
      player2: [1.3, 1.32],
    },
  },
];

export const gameProviders = [
  {
    id: 1,
    name: "Evolution",
    logo: "/images/providers/evolution.png",
  },
  {
    id: 2,
    name: "Ezugi",
    logo: "/images/providers/ezugi.png",
  },
  {
    id: 3,
    name: "Pragmatic Live",
    logo: "/images/providers/pragmatic-live.png",
  },
  {
    id: 4,
    name: "Betgames",
    logo: "/images/providers/betgames.png",
  },
  {
    id: 5,
    name: "Super Spade Games",
    logo: "/images/providers/ssg.png",
  },
  {
    id: 6,
    name: "Betsoft",
    logo: "/images/providers/betsoft.png",
  },
  {
    id: 7,
    name: "Spribe",
    logo: "/images/providers/spribe.png",
  },
  {
    id: 8,
    name: "Evoplay",
    logo: "/images/providers/Evoplay.png",
  },
];
