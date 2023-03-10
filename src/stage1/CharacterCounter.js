import React from 'react';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

const input = {
  state: atom({
    key: 'textState', // unique ID (with respect to other atoms/selectors)
    default: '', // default value (aka initial value)
  }),
  length: selector({
    key: 'charCountState', // unique ID (with respect to other atoms/selectors)
    get: ({get}) => {
      const text = get(input.state);

      return text.length;
    },
  }),
};

function TextInput() {
  const [text, setText] = useRecoilState(input.state);

  const onChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div>
      <input type="text" value={text} onChange={onChange} />
      <br />
      Echo: {text}
    </div>
  );
}

function CharacterCount() {
  const count = useRecoilValue(input.length);

  return <>Character Count: {count}</>;
}

function CharacterCounter() {
  return (
    <div>
      <TextInput />
      <br/>
      <CharacterCount />
    </div>
  );
}

export default CharacterCounter;
