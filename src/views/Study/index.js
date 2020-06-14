import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'antd';
import style from './style.module.less';

// const List = ({ list }) =>
//   list.map(({ objectID, ...item }) => <Item key={objectID} {...item} />);

const List = ({ list, onRemoveItem }) =>
  list.map(item => (
    <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem} />
  ));

const Item = ({ item, onRemoveItem }) => {
  function handleRemoveItem() {
    onRemoveItem(item);
  }

  return (
    <div>
      <span>
        <a href={item.url}>{item.title}</a>
      </span>

      <span>{item.author}</span>
      <span>{item.num_comments}</span>
      <span>{item.points}</span>
      <Button type="primary" size="small" danger onClick={handleRemoveItem}>
        remove
      </Button>
    </div>
  );
};

// const Search = props => {
//   const { search, onSearch } = props;
const Search = ({ search, onSearch }) => (
  <>
    <label htmlFor="search">Search: </label>
    <input id="search" type="text" value={search} onChange={onSearch} />
  </>
);

/**
 * ! 优化 Search 组件，复用
 */
const InputWithLabel = ({
  id,
  value,
  type = 'text',
  isFocused,
  onInputChange,
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
      <input
        className={style.input}
        ref={inputRef}
        id={id}
        type={type}
        value={value}
        autoFocus={isFocused}
        onChange={onInputChange}
      />
    </>
  );
};

// const stories = [
const initialStories = [
  {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];
const Study = () => {
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem('search') || 'React'
  );

  /**
   * React’s useEffect Hook takes two arguments: The first argument is a function where the side-effect occurs.
   * In our case, the side-effect is when the user types the searchTerm into the browser’s local storage.
   * The optional second argument is a dependency array of variables. If one of theses variables changes,
   * the function for the side-effect is called. In our case, the function is called every time the searchTerm changes;
   * and it’s also called initially when the component renders for the first time.
   *
   * Leaving out the second argument, to be specific the dependency array,
   * would make the function for the side-effect run on every render (initial render and update renders) of the component.
   * If the dependency array of React’s useEffect is an empty array, the function for the side-effect is only called once, after the component renders for the first time.
   * The hook lets us opt into React’s component lifecycle. It can be triggered when the component is first mounted, but also one of its dependencies are updated.
   */
  useEffect(() => {
    localStorage.setItem('search', searchTerm);
    console.log('Study search useEffect : ', searchTerm);
  }, [searchTerm]);

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const searchedStories = initialStories.filter(story =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>My Hacker Stories</h1>
      <Search search={searchTerm} onSearch={handleSearch} />
      <hr />
      <List list={searchedStories} />
    </div>
  );
};

/**
 * React Custom Hooks
 *
 * We are following two conventions of React’s built-in hooks here.
 * First,the naming convention which puts the “use” prefix in front of every hook name;
 * Second, the returned values are returned as an array.
 */
const useSemiPersistentState = (key, initialState) => {
  const [value, setValue] = useState(localStorage.getItem(key) || initialState);

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};

const StudyWithCustomHook = () => {
  const [searchTerm, setSearchTerm] = useSemiPersistentState('search', 'react');
  const [stories, setStories] = useState(initialStories);

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const searchedStories = stories.filter(story =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleRemoveStory(item) {
    console.log('remove item :', item);
    const newStories = stories.filter(ele => ele.objectID !== item.objectID);

    setStories(newStories);
  }

  return (
    <div>
      <h1>My Hacker Stories</h1>
      {/* <Search search={searchTerm} onSearch={handleSearch} /> */}
      <InputWithLabel
        id="search"
        value={searchTerm}
        isFocused={true}
        onInputChange={handleSearch}
      >
        <strong>Search:</strong>
      </InputWithLabel>
      <hr />
      <List list={searchedStories} onRemoveItem={handleRemoveStory} />
    </div>
  );
};

// export default Study;
export default StudyWithCustomHook;
