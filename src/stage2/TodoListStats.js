
import React from 'react';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import TodoItemCreator from "./TodoItemCreator";

function TodoListStats({ todoListStatsState }) {
  const {
    totalNum,
    totalCompleteNum,
    totalUncompleteNum,
    percenterComplete,
  } = useRecoilValue(todoListStatsState);

  return (<>
    <ul>
      <li>totalNum { totalNum }</li>
      <li>totalCompleteNum { totalCompleteNum }</li>
      <li>totalUncompleteNum { totalUncompleteNum }</li>
      <li>percenterComplete { percenterComplete }</li>
    </ul>
  </>);
}

export default TodoListStats;
