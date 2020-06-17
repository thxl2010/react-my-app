import React, { useEffect, useState } from 'react';
import { InputWithLabel, List } from '../components';
import { useSemiPersistentState } from '../components/Hooks/useSemiPersistentState';
import { initialStories } from '../variable';

const getAsyncStories = () =>
  new Promise(resolve =>
    setTimeout(() => resolve({ data: { stories: initialStories } }), 2000)
  );

// reference: [FetchDataChangeSetUrl: setLoading](../../Demos/index.js)
const StoryListWithCustomHook = () => {
  const [searchTerm, setSearchTerm] = useSemiPersistentState('search', 'react');
  // const [stories, setStories] = useState(initialStories);
  // ! React Asynchronous Data
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  useEffect(() => {
    setIsLoading(true);

    getAsyncStories()
      .then(result => {
        setStories(result.data.stories);
        setIsLoading(false);
      })
      .catch(() => setIsError(true));
  }, []);

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
      <h1>
        My Hacker Stories:{' '}
        <a
          href="https://zh-hans.reactjs.org/docs/hooks-custom.html"
          target="_blank"
        >
          React Custom Hooks
        </a>
      </h1>
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
      {isError && <p>Something went wrong ...</p>}
      {isLoading ? (
        <p>Loading ...</p>
      ) : (
        <List list={searchedStories} onRemoveItem={handleRemoveStory} />
      )}
    </div>
  );
};

export default StoryListWithCustomHook;
