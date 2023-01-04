import React from 'react';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import TodoItemCreator from "./TodoItemCreator";
import TodoItem from "./TodoItem";
import TodoListFilter from "./TodoListFilter";

/**
 * atom은 Recoil의 상태를 표현한다<br>
 * https://recoiljs.org/ko/docs/api-reference/core/atom <br>
 * @type {RecoilState<*[]>}
 */
const todoListState = atom({
  key: 'todoListState',
  default: [],
});

const todoListFilterState = atom({
  key: 'todoListFilterState',
  default: 'Show All', // Show All, Show Completed, Show Uncompleted
});

/**
 * selector는 Recoil에서 함수나 파생된 상태를 나타낸다.<br>
 * https://recoiljs.org/ko/docs/api-reference/core/selector <br>
 * @type {RecoilValueReadOnly<unknown>}
 */
const filteredTodoListState = selector({
  key: 'filteredTodoListState',
  get: ({ get }) => {
    const filter = get(todoListFilterState);
    const list = get(todoListState);

    switch(filter) {
      case "Show Completed":
        return list.filter((todoItem) => todoItem.isComplete);
      case "Show Uncompleted":
        return list.filter((todoItem) => !todoItem.isComplete);
      default:
        return list;
    }

  },
});

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
      <TodoListFilter {...{ todoListFilterState }} />
      <TodoItemCreator {...{ todoListState }} />
      <TodoItemList />
    </div>
  );
}

export default TodoList;
