import React from 'react';
import {
  RecoilRoot,
} from 'recoil';
import CharacterCounter from "./stage1/CharacterCounter";
import TodoList from "./stage2/TodoList";

export default function App() {
  return (<>
    {/* Recoil을 사용하기 위해서는 부모에 RecoilRoot 태그가 필요하다. */}
    <RecoilRoot>
      <TodoList />
      <CharacterCounter />
    </RecoilRoot>
  </>);
}
