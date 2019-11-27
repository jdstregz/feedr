import React from 'react';
import {
  Dashboard,
  Settings,
  Money,
  BeachAccess,
  SportsBaseball,
  SportsBasketball,
  SportsHockey,
  SportsFootball,
  Sports,
} from '@material-ui/icons';
import Leagues from '../Leagues/Leagues';
import NBA from '../Leagues/NBA/NBA';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChessBoard, faCrown, faDice } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart';
import BlackJack from '../Casino/BlackJack/BlackJack';
import BlackJackSimulator from '../Casino/BlackJack/BlackJackSimulator';

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
    casino: {
      text: 'Casino',
      link: '/casino',
      icon: <Money />,
      description: 'Casino Games',
      subroutes: {
        blackjack: {
          text: 'BlackJack',
          link: '/blackjack',
          icon: <FontAwesomeIcon icon={faCrown} />,
          render: () => <BlackJack />,
          description: 'BlackJack Simulator',
        },
        roulette: {
          text: 'Roulette',
          link: '/roulette',
          icon: <FontAwesomeIcon icon={faChessBoard} />,
          description: 'Roulette Simulator',
        },
        craps: {
          text: 'Craps',
          link: '/craps',
          icon: <FontAwesomeIcon icon={faDice} />,
          description: 'Craps Simulator',
        },
        mlb: {
          text: 'Poker',
          link: '/poker',
          icon: <FontAwesomeIcon icon={faHeart} />,
          description: 'Major League Baseball',
        },
      },
    },
    profile: {
      text: 'Settings',
      link: '/settings',
      icon: <Settings />,
      description: 'Profile settings',
    },
    blackJackSimulator: {
      link: '/blackjack-simulator',
      text: "BlackJackSim",
      render: () => <BlackJackSimulator/>,
      hide: true
    }
  };
};
export default Routes;
