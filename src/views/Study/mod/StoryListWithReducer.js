import { Button } from 'antd';
import React, { useCallback, useEffect, useState, useReducer } from 'react';
import { InputWithLabel, List } from '../components';
import { useSemiPersistentState } from '../components/Hooks/useSemiPersistentState';
import styles from '../style.module.less';

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

// ! 1. a reducer function outside of the components:
// A reducer function always receives state and action .
// Based on these two arguments, a reducer always returns a new state:
const storiesReducer = (state, action) => {
  switch (action.type) {
    case 'STORIES_FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'STORIES_FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'STORIES_FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case 'REMOVE_STORY':
      return {
        ...state,
        data: state.data.filter(
          story => action.payload.objectID !== story.objectID
        ),
      };
    default:
      throw new Error();
  }
};

// ! reference: [FetchDataWithMyApiHookOfReducer](src\views\Demos\index.js:1774)
const StoryListWithReducer = () => {
  const [searchTerm, setSearchTerm] = useSemiPersistentState('search', 'React');
  const [url, setUrl] = useState(`${API_ENDPOINT}${searchTerm}`);

  // ! 2. The hook  useReducer
  // The hook  useReducer receives a reducer function and an initial state as arguments
  // and returns an array with two items.
  // The first item is the current state; the second item is the state updater function (also called dispatch function):
  const [stories, dispatchStories] = useReducer(storiesReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });

  // useEffect(() => {
  //   if (searchTerm === '') return;

  //   // ! 3. the useReducer state updater function
  //   // dispatches an action for the reducer.
  //   // The action comes with a type and an optional payload:
  //   dispatchStories({ type: 'STORIES_FETCH_INIT' });

  //   fetch(`${API_ENDPOINT}${searchTerm}`)
  //     .then(response => response.json())
  //     .then(result => {
  //       dispatchStories({
  //         type: 'STORIES_FETCH_SUCCESS',
  //         payload: result.hits,
  //       });
  //     })
  //     .catch(() => dispatchStories({ type: 'STORIES_FETCH_FAILURE' }));
  //   // }, []);
  // }, [searchTerm]);

  // ! useCallback
  const handleFetchStories = useCallback(() => {
    if (!searchTerm) return;

    dispatchStories({ type: 'STORIES_FETCH_INIT' });

    // fetch(`${API_ENDPOINT}${searchTerm}`)
    fetch(url)
      .then(response => response.json())
      .then(result => {
        dispatchStories({
          type: 'STORIES_FETCH_SUCCESS',
          payload: result.hits,
        });
      })
      .catch(() => dispatchStories({ type: 'STORIES_FETCH_FAILURE' }));
    // }, [searchTerm]);
  }, [searchTerm, url]);

  useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);

  const handleRemoveStory = useCallback(item => {
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item,
    });
  }, []);

  const handleInputChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleInputKeyDown = event => {
    if (event.keyCode === 13) {
      handleSearchSubmit();
    }
  };

  const handleSearchSubmit = () => {
    setUrl(`${API_ENDPOINT}${searchTerm}`);
  };

  // const searchedStories = stories.data.filter(story =>
  //   story.title.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  return (
    <div>
      <h1>
        My Hacker Stories:
        <a
          href="https://zh-hans.reactjs.org/docs/hooks-reference.html#usereducer"
          target="_blank"
        >
          useReducer
        </a>
      </h1>

      <InputWithLabel
        id="search"
        value={searchTerm}
        isFocused
        onInputChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
      >
        <strong>Search:</strong>
      </InputWithLabel>

      <Button
        type="primary"
        size="small"
        className={styles.btnSearch}
        disabled={!searchTerm}
        onClick={handleSearchSubmit}
      >
        查询
      </Button>

      <hr />

      {stories.isError && <p>Something went wrong ...</p>}

      {stories.isLoading ? (
        <p>Loading ...</p>
      ) : (
        <>
          {/* <List list={searchedStories} onRemoveItem={handleRemoveStory} /> */}
          <h2>Data Re-Fetching in React : </h2>
          <List list={stories.data} onRemoveItem={handleRemoveStory} />
        </>
      )}
    </div>
  );
};

export default StoryListWithReducer;
