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

function TodoList() {
  const todoList = useRecoilValue(todoListState);

  return (
    <div>
      <TodoItemCreator todoListState={todoListState} />
      {
        todoList.map((todoItem) => (
          <TodoItem key={todoItem.id} currentTodoItem={todoItem} todoListState={todoListState}></TodoItem>

        ))

      }
    </div>
  );
}

export default TodoList;
