import { Client } from '../../../environments/client';

export interface Link {
  name: string;
  tooltip: string;
  icon: string;
  color: string;
  highlight: string;
  url: string;
}

export const publicLinks: Link[] = [
  {
    name: 'home',
    tooltip: 'Home',
    icon: 'home',
    color: 'primary',
    highlight: 'mat-accent',
    url: Client.home(),
  },
  {
    name: 'signup',
    tooltip: 'Register a new account',
    icon: 'person_add',
    color: 'primary',
    highlight: 'mat-accent',
    url: Client.signup(),
  },
  {
    name: 'login',
    tooltip: 'Sign in',
    icon: 'login',
    color: 'primary',
    highlight: 'mat-accent',
    url: Client.login(),
  },
];

export const authenticatedLinks: Link[] = [
  {
    name: 'home',
    tooltip: 'Home',
    icon: 'home',
    color: 'primary',
    highlight: 'mat-accent',
    url: Client.home(),
  },
  {
    name: 'reports',
    tooltip: 'Reports',
    icon: 'newspaper',
    color: 'primary',
    highlight: 'mat-accent',
    url: Client.getReports(),
  },
  {
    name: 'projects',
    tooltip: 'Projects',
    icon: 'folder open',
    color: 'primary',
    highlight: 'mat-accent',
    url: Client.getProjects(),
  },
  {
    name: 'logout',
    tooltip: 'Log out',
    icon: 'logout',
    color: 'primary',
    highlight: 'primary',
    url: Client.home(),
  },
];

export const adminLinks: any = [
  {
    name: 'turbines',
    tooltip: 'Turbines',
    icon: 'settings',
    color: 'primary',
    highlight: 'mat-accent',
    url: Client.getTurbines(),
  },
  {
    name: 'types',
    tooltip: 'Types',
    icon: 'construction',
    color: 'primary',
    highlight: 'mat-accent',
    url: Client.getTypes(),
  },
  {
    name: 'warnings',
    tooltip: 'warnings',
    icon: 'warning',
    color: 'primary',
    highlight: 'mat-accent',
    url: Client.getWarnings(),
  },
  // {
  //   name: 'Upload videos',
  //   tooltip: 'Video upload',
  //   icon: 'upload_file',
  //   color: 'warn',
  //   highlight: 'mat-accent',
  //   url: FRONTEND.uploadVideos(),
  // },
  // {
  //   name: 'Manage videos',
  //   tooltip:
  //     'Edit the name, description and video data of existing videos or delete them altogether',
  //   icon: 'play_circle',
  //   color: 'warn',
  //   highlight: 'mat-accent',
  //   url: FRONTEND.manageVideos(),
  // },
  // {
  //   name: 'Manage articles',
  //   tooltip:
  //     'Create new articles or edit the name, and content of existing ones.',
  //   icon: 'description',
  //   color: 'warn',
  //   highlight: 'mat-accent',
  //   url: FRONTEND.manageArticles(),
  // },
  // {
  //   name: 'Manage profile images',
  //   tooltip: 'Upload, or delete new profile images',
  //   icon: 'photo_camera',
  //   color: 'warn',
  //   highlight: 'mat-accent',
  //   url: FRONTEND.manageProfileImages(),
  // },
];
