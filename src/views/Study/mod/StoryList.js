import React, { useEffect, useState } from 'react';
import { List, Search } from '../components';
import { initialStories } from '../variable';

const StoryList = () => {
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem('search') || 'React'
  );

  /**
   * ! useEffect
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
    console.log('StoryList search useEffect : ', searchTerm);
  }, [searchTerm]);

  const handleInputChange = event => {
    setSearchTerm(event.target.value);
  };

  const searchedStories = initialStories.filter(story =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>
        My Hacker Stories : React Hooks =&gt;
        <a href="https://zh-hans.reactjs.org/docs/hooks-state.html">useState</a>
        &nbsp;
        <a
          href="https://zh-hans.reactjs.org/docs/hooks-effect.html"
          target="_blank"
        >
          useEffect
        </a>
      </h1>
      <Search search={searchTerm} onSearch={handleInputChange} />
      <hr />
      <List list={searchedStories} />
    </div>
  );
};

export default StoryList;
