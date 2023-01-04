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

const todoListState = atom({
  key: 'todoListState',
  default: [],
});

function TodoItemList() {
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
