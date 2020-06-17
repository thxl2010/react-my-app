import React from 'react';
import StoryList from './mod/StoryList';
import StoryListWithCustomHook from './mod/StoryListWithCustomHook';
import StoryListWithReducer from './mod/StoryListWithReducer';

const Study = () => {
  return (
    <div>
      <StoryList />
      <StoryListWithCustomHook />
      <StoryListWithReducer />
    </div>
  );
};

export default Study;
