import React from 'react';
import { useSemiPersistentState } from '../components/Hooks/useSemiPersistentState';
import { List, InputWithLabel } from '../components';

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

const StoryListWithReducer = () => {
  const [searchTerm, setSearchTerm] = useSemiPersistentState('search', 'React');

  // ! 2. The hook  useReducer
  // The hook  useReducer receives a reducer function and an initial state as arguments
  // and returns an array with two items.
  // The first item is the current state; the second item is the state updater function (also called dispatch function):
  const [stories, dispatchStories] = React.useReducer(storiesReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });

  React.useEffect(() => {
    // ! 3. the useReducer state updater function
    // dispatches an action for the reducer.
    // The action comes with a type and an optional payload:
    dispatchStories({ type: 'STORIES_FETCH_INIT' });

    fetch(`${API_ENDPOINT}react`)
      .then(response => response.json())
      .then(result => {
        dispatchStories({
          type: 'STORIES_FETCH_SUCCESS',
          payload: result.hits,
        });
      })
      .catch(() => dispatchStories({ type: 'STORIES_FETCH_FAILURE' }));
  }, []);

  const handleRemoveStory = item => {
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item,
    });
  };

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const searchedStories = stories.data.filter(story =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        onInputChange={handleSearch}
      >
        <strong>Search:</strong>
      </InputWithLabel>

      <hr />

      {stories.isError && <p>Something went wrong ...</p>}

      {stories.isLoading ? (
        <p>Loading ...</p>
      ) : (
        <List list={searchedStories} onRemoveItem={handleRemoveStory} />
      )}
    </div>
  );
};

export default StoryListWithReducer;
