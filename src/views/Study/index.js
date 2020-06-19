import React from 'react';
import StoryList from './mod/StoryList';
import StoryListWithCustomHook from './mod/StoryListWithCustomHook';
import StoryListWithReducer from './mod/StoryListWithReducer';

const Study = () => {
  console.log('B:App');
  return (
    <div>
      {/*  <StoryList />
      <StoryListWithCustomHook /> */}
      <StoryListWithReducer />
    </div>
  );
};

export default Study;
