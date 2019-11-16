import React from 'react';
import {
  Dashboard,
  Alarm,
  Link,
  Settings,
  Router,
  DataUsageSharp,
  BeachAccess,
} from '@material-ui/icons';

const Routes = () => {
  return {
    dashboard: {
      text: 'Dashboard',
      link: '/dashboard',
      icon: <Dashboard />,
      description: 'Dashboard for quick profile view and feeds',
    },
    mainRoute: {
      text: 'Route',
      link: '/main-route',
      icon: <Router />,
      description: 'Main route',
      index: 1,
      subroutes: {
        sub1: {
          text: 'Subroute 1',
          link: '/sub-1',
          icon: <DataUsageSharp />,
          description: 'This is subroute 1',
        },
        sub2: {
          text: 'sub-2',
          link: '/sub-2',
          icon: <Link />,
          description: 'This is subroute 2',
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
