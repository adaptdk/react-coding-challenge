import React from 'react';
import { RootRedirecter } from './route-utils';


const Books = () => {
  return (
    <h1>Hello from books</h1>
  )
}

const About = () => {
  return (
    <h1>Hello from about</h1>
  )
}

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