import React from 'react';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import TodoItemCreator from "./TodoItemCreator";

function TodoItem({ currentTodoItem, todoListState }) {
  /**
   * useRecoilState는 atom을 읽고 쓰려고 할 때 이 Hook을 사용한다<br>
   * https://recoiljs.org/ko/docs/api-reference/core/useRecoilState <br>
   */
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const index = todoList.findIndex((todoItem) => todoItem === currentTodoItem);

  const deleteTodoItem = () => {
    const newTodoList = [...todoList];
    newTodoList.splice(index, 1);
    setTodoList(newTodoList);
  };

  const currentTodoItemUpdated = (props) => {
    const newTodoList = [...todoList];
    newTodoList.splice(index, 1, {
      ...todoList[index],
      ...props,
    });
    setTodoList(newTodoList);
  };

  const inputValueChanged = ({ target: { value }}) => {
    currentTodoItemUpdated({
      text: value,
    });
  };

  const toggleComplete = () => {
    currentTodoItemUpdated({
      isComplete: !todoList[index].isComplete,
    });
  };

  return (
    <div>
      <input {...{
        type: 'text',
        value: currentTodoItem.text,
        onChange: inputValueChanged,
      }} />
      <input {...{
        type: 'checkbox',
        checked: currentTodoItem.isComplete,
        onChange: toggleComplete,
      }} />
      <button onClick={deleteTodoItem}>Delete</button>
    </div>
  );
}

export default TodoItem;
