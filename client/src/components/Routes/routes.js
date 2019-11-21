import React from 'react';
import {
  Dashboard,
  Alarm,
  Link,
  Settings,
  Router,
  DataUsageSharp,
  BeachAccess,
  SportsBaseball,
  SportsBasketball,
  SportsHockey,
  SportsFootball,
  Sports,
} from '@material-ui/icons';
import Leagues from '../Leagues/Leagues';
import NBA from '../Leagues/NBA/NBA';

const Routes = () => {
  return {
    dashboard: {
      text: 'Dashboard',
      link: '/dashboard',
      icon: <Dashboard />,
      description: 'Dashboard for quick profile view and feeds',
    },
    mainRoute: {
      text: 'Leagues',
      link: '/leagues',
      icon: <Sports />,
      description: 'Main route',
      render: () => <Leagues />,
      subroutes: {
        nba: {
          text: 'NBA',
          link: '/nba',
          icon: <SportsBasketball />,
          render: () => <NBA />,
          description: 'National Basketball Association',
        },
        nhl: {
          text: 'NHL',
          link: '/nhl',
          icon: <SportsHockey />,
          description: 'National Hockey League',
        },
        nfl: {
          text: 'NFL',
          link: '/nfl',
          icon: <SportsFootball />,
          description: 'National Football League',
        },
        mlb: {
          text: 'MLB',
          link: '/mlb',
          icon: <SportsBaseball />,
          description: 'Major League Baseball',
        },
      },
    },
    analytics: {
      text: 'Analytics',
      link: '/analytics',
      icon: <BeachAccess />,
      description: 'An example analytics route',
    },
    idk: {
      text: 'I dunno',
      link: '/i-d-k',
      icon: <Alarm />,
      description: 'Something',
    },
    profile: {
      text: 'Settings',
      link: '/settings',
      icon: <Settings />,
      description: 'Profile settings',
    },
  };
};
export default Routes;
