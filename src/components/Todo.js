import React from 'react';
import styles from './styles.css';

const Todo = ({ completed, text, onClick }) => {
  console.log(styles);
  return (
    <li onClick={() => onClick()}
    style={{textDecoration: completed ? 'line-through' : 'none'}}
    className={styles.greenify}>
      {text}
    </li>
  );
};

export default Todo;
