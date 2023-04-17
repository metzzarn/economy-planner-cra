import { saveStateToFile } from 'utils/stateUtils';
import React from 'react';
import { useStore } from 'react-redux';

export const StateManagement = () => {
  const store = useStore();
  const inputFile = React.useRef<HTMLInputElement>(null);

  const onLoadStateFromFile = () => {
    if (inputFile.current?.files) {
      const file = inputFile.current.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          const state = JSON.parse(e.target.result.toString());
          store.dispatch({ type: 'LOAD_STATE', payload: state });
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <form onSubmit={() => saveStateToFile(store.getState())}>
        <div>
          <button type={'submit'}>Save state to file</button>
        </div>
      </form>

      <input type={'file'} ref={inputFile} />
      <button onClick={onLoadStateFromFile}>Load state from file</button>
    </div>
  );
};
