import React from 'react';
import {
  atom,
  selector,
  useRecoilValue,
} from 'recoil';
import TodoListStats from "./TodoListStats";
import TodoListFilter from "./TodoListFilter";
import TodoItemCreator from "./TodoItemCreator";
import TodoItem from "./TodoItem";

const recoilState = {
  /**
   * atom은 Recoil의 상태를 표현한다<br>
   * https://recoiljs.org/ko/docs/api-reference/core/atom <br>
   * @type {RecoilState<*[]>}
   */
  todoListState: atom({
    key: 'todoListState',
    default: [],
  }),
  todoListFilterState: atom({
    key: 'todoListFilterState',
    default: 'Show All', // Show All, Show Completed, Show Uncompleted
  }),
  /**
   * selector는 Recoil에서 함수나 파생된 상태를 나타낸다.<br>
   * https://recoiljs.org/ko/docs/api-reference/core/selector <br>
   * @type {RecoilValueReadOnly<unknown>}
   */
  filteredTodoListState: selector({
    key: 'filteredTodoListState',
    get: ({ get }) => {
      const filter = get(recoilState.todoListFilterState);
      const list = get(recoilState.todoListState);

      switch(filter) {
        case "Show Completed":
          return list.filter((todoItem) => todoItem.isComplete);
        case "Show Uncompleted":
          return list.filter((todoItem) => !todoItem.isComplete);
        default:
          return list;
      }
    },
  }),
  todoListStatsState: selector({
    key: 'todoListStatsState',
    get: ({ get }) => {
      const todoList = get(recoilState.todoListState);
      const totalNum = todoList.length;
      const totalCompleteNum = todoList.filter((todoItem) => todoItem.isComplete).length;
      const totalUncompleteNum = totalNum - totalCompleteNum;
      const percenterComplete = totalNum === 0 ? 0 : Math.round(totalCompleteNum / totalNum * 100);

      return {
        totalNum,
        totalCompleteNum,
        totalUncompleteNum,
        percenterComplete,
      };
    },
  }),
};

const {
  filteredTodoListState,
  todoListStatsState,
  todoListFilterState,
  todoListState,
} = recoilState;

function TodoItemList() {
  /**
   * useRecoilValue는 atom을 읽기만 할 때 이 Hook를 사용한다<br>
   * https://recoiljs.org/ko/docs/api-reference/core/useRecoilValue <br>
   */
  const todoList = useRecoilValue(filteredTodoListState); // todoListState

  return (<>{
    todoList.map((todoItem) =>
      <TodoItem {...{
        key: todoItem.id,
        currentTodoItem: todoItem,
        todoListState,
      }} />
    )
  }</>)
}

function TodoList() {
  return (
    <div>
      <TodoListStats {...{ todoListStatsState }} />
      <TodoListFilter {...{ todoListFilterState }} />
      <TodoItemCreator {...{ todoListState }} />
      <TodoItemList />
    </div>
  );
}

export default TodoList;
