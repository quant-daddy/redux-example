import React from 'react';
import FilterLink from './FilterLink';

const Footer = () => (
  <div>
    <FilterLink filter="all" >All</FilterLink> &nbsp;
    <FilterLink filter="completed" >Completed</FilterLink> &nbsp;
    <FilterLink filter="pending" >Pending</FilterLink>
  </div>
);

export default Footer;
