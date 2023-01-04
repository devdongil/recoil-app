import React, { useState } from 'react';
import {
  useSetRecoilState,
} from 'recoil';

let todoItemSeq = 0;

function TodoItemCreator({ todoListState }) {
  const clear = '';
  const [inputValue, setInputValue] = useState('');
  const setTodoList = useSetRecoilState(todoListState);
  const inputValueChanged = ({ target: { value }}) => {
    setInputValue(value);
  };
  const addTodoItem = () => {
    todoItemSeq += 1;
    setTodoList((oldTodoList) => [
      ...oldTodoList,
      {
        id: todoItemSeq,
        text: inputValue,
        isComplete: false,
      }
    ]);
    setInputValue(clear);
  };

  return (
    <div>
      <input {...{
        type: 'text',
        value: inputValue,
        onChange: inputValueChanged,
      }} />
      <button onClick={addTodoItem}>Add</button>
    </div>
  );
}

export default TodoItemCreator;
