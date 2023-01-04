import React, { useState } from 'react';
import {
  useSetRecoilState,
} from 'recoil';

let todoItemSeq = 0;

function TodoItemCreator({ todoListState }) {
  const clear = '';
  const [inputValue, setInputValue] = useState('');
  /**
   * useSetRecoilState는 atom을 쓰기만 할 때 이 Hook를 사용한다<br>
   * https://recoiljs.org/ko/docs/api-reference/core/useSetRecoilState <br>
   * @type {SetterOrUpdater<unknown>}
   */
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
