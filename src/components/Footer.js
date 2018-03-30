import React from 'react';
import FilterLink from './FilterLink';

const Footer = () => (
  <div>
    <FilterLink filter="SHOW_ALL" >All</FilterLink> &nbsp;
    <FilterLink filter="SHOW_COMPLETED" >Completed</FilterLink> &nbsp;
    <FilterLink filter="SHOW_PENDING" >Pending</FilterLink>
  </div>
);

export default Footer;
