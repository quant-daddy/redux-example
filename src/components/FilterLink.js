import React from 'react';
// const ReactRedux = require('react-redux');
// const { connect } = ReactRedux;
import { NavLink } from 'react-router-dom';
// import { setVisibilityFilter } from 'actions';
//
// const Link = ({active, onClick, children}) => {
//   if (active) return <span>{children}</span>;
//   return (
//     <a
//       href="#"
//       onClick={e => {
//         e.preventDefault();
//         onClick(e);}
//       }
//     >{children}
//     </a>);
// };

const FilterLink = ({filter, children}) => {
  return (
    <NavLink
      exact
      to={ filter === 'all' ? '/' : `/${filter}` }
      activeStyle={{
        textDecoration: 'none',
        color: 'black'
      }}
      >{children}</NavLink>
  )
}


// const mapStateToFilterLinkProps = (state, ownProps) => {
//   return {
//     active: state.visibilityFilter === ownProps.filter,
//   };
// };
//
// const mapDispatchToFilterLinkProps = (dispatch, ownProps) => {
//   return {
//     onClick: () => dispatch(setVisibilityFilter(ownProps.filter)),
//   };
// };
//
// const FilterLink = connect(
//   mapStateToFilterLinkProps,
//   mapDispatchToFilterLinkProps
// )(Link);
//
export default FilterLink;
