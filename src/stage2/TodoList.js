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

/**
 * atom은 Recoil의 상태를 표현한다<br>
 * https://recoiljs.org/ko/docs/api-reference/core/atom <br>
 * @type {RecoilState<*[]>}
 */
const todoListState = atom({
  key: 'todoListState',
  default: [],
});

function TodoItemList() {
  /**
   * useRecoilValue는 atom을 읽기만 할 때 이 Hook를 사용한다<br>
   * https://recoiljs.org/ko/docs/api-reference/core/useRecoilValue <br>
   */
  const todoList = useRecoilValue(todoListState);

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
      <TodoItemCreator {...{todoListState}} />
      <TodoItemList />
    </div>
  );
}

export default TodoList;
