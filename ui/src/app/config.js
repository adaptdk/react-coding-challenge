import React from 'react';

import { RootRedirecter } from './route-utils';
import About from './about-comp';
import Books from './books-comp';


export const routes = [
  { 
    path: '/',
    exact: true,
    component: () => (<RootRedirecter to="/books" />),
  },
  { 
    path: '/books',
    exact: true,
    component: Books,
  },
  { 
    path: '/about',
    exact: true,
    component: About,
  },
];