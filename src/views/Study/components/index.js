import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'antd';
import styles from '../style.module.less';

// export const List = ({ list }) =>
//   list.map(({ objectID, ...item }) => <Item key={objectID} {...item} />);

export const List = ({ list, onRemoveItem }) =>
  list.map(item => (
    <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem} />
  ));

export const Item = ({ item, onRemoveItem }) => {
  function handleRemoveItem() {
    onRemoveItem(item);
  }

  return (
    <div className={styles.storyItem}>
      <span>
        <a href={item.url}>{item.title}</a>
      </span>

      <span>by {item.author}.</span>
      <span>comments: {item.num_comments}</span>
      <span>points: {item.points}</span>
      <span>at: {item.created_at}</span>
      {/* ! inline handlers */}
      <Button
        type="primary"
        size="small"
        danger
        /* onClick={handleRemoveItem} */
        /* onClick={onRemoveItem.bind(null, item)} */
        onClick={() => onRemoveItem(item)}
      >
        remove
      </Button>
    </div>
  );
};

// export const Search = props => {
//   const { search, onSearch } = props;
export const Search = ({ search, onSearch, onKeyDown }) => (
  <>
    <label htmlFor="search">Search: </label>
    <input
      id="search"
      type="text"
      value={search}
      onChange={onSearch}
      onKeyDown={onKeyDown}
    />
  </>
);

/**
 * ! 优化 Search 组件，复用
 */
export const InputWithLabel = ({
  id,
  value,
  type = 'text',
  isFocused,
  onInputChange,
  onKeyDown,
  children,
}) => {
  // A
  const inputRef = useRef();

  // C
  useEffect(() => {
    if (isFocused && inputRef.current) {
      // D
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <>
      <label htmlFor={id}>{children}</label>
      &nbsp;
      {/* B */}
      {/* eslint-disable */}
      <input
        className={styles.input}
        ref={inputRef}
        type={type}
        value={value}
        autoFocus="autofocus"
        onChange={onInputChange}
        onKeyDown={onKeyDown}
      />
      {/* eslint-enable */}
    </>
  );
};
