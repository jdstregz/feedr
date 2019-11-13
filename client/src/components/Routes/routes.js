const Routes = () => {
  return {
    dashboard: {
      text: 'Dashboard',
      link: '/dashboard',
      icon: null,
      description: 'Dashboard for quick profile view and feed subscription',
      index: 0,
    },
    leagues: {
      text: 'Leagues',
      link: '/leagues',
      icon: null,
      description: 'Available sports leagues',
      index: 1,
      subroutes: {
        nba: {
          index: 0,
          text: 'NBA',
          link: '/nba',
          icon: null,
          description: 'National Basketball Association',
        },
        nhl: {
          index: 1,
          text: 'NHL',
          link: '/nhl',
          icon: null,
          description: 'National Hockey League',
        },
        nfl: {
          index: 2,
          text: 'NFL',
          link: '/nfl',
          icon: null,
          description: 'National Football League',
        },
        mlb: {
          index: 3,
          text: 'MLB',
          icon: null,
          description: 'Major League Baseball',
        },
      },
    },
    analytics: {
      text: 'Analytics',
      link: '/analytics',
      icon: null,
      description: 'Sports data/odds analytics',
      index: 2,
    },
    betting: {
      text: 'Betting History',
      link: '/betting',
      icon: null,
      description: 'Betting win/loss history',
      index: 3,
    },
    profile: {
      text: 'Settings',
      link: '/settings',
      icon: null,
      description: 'Profile settings',
      index: 4,
    },
  };
};
export default Routes;
