import React, { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import http from '../../services/http';
import tokenService from '../../services/token.service';
import { addHistory } from '../history/historySlice';
import { addCommand } from './commandSlice';

export function Command() {
  const dispatch = useAppDispatch();
  const [input, setInput] = useState('');
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  function handleInputKeydown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      getPlayer('19');
      dispatch(addCommand(input));
      dispatch(addHistory(input));
      setInput('');
    }
  }
  async function handleNewCommand(args: string) {
    if (args === 'attack') {
      dispatch(addCommand(input));
    }
  }

  const getPlayer = async (id: string) => {
    try {
      const token = tokenService.getLocalRefreshToken();
      console.log(token);
      const { data } = await http.get(`player/19`);
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <input
        spellCheck="false"
        type="text"
        autoFocus
        ref={inputRef}
        className=""
        value={input}
        onChange={(e) => setInput(e.currentTarget.value.toLowerCase())}
        onKeyDown={handleInputKeydown}
        size={input.length}
      />
    </div>
  );
}
