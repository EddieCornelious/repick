function History() {
  const past = [];
  let present;
  const future = [];
  const arrayProto = Array.prototype;
  const push = arrayProto.push.bind(past);
  const unshift = arrayProto.unshift.bind(future);
  const spliceCount = 1;

  function undoOrRedo(doRedo) {
    const array = doRedo ? future : past;
    const add = doRedo ? push : unshift;

    if (array.length > 0) {
      const spliceIndex = doRedo ? 0 : array.length - 1;
      const oldPresent = present;
      const newPresent = array.splice(spliceIndex, spliceCount);

      present = newPresent[0];
      add(oldPresent);
    }
  }
  function undo() {
    undoOrRedo(false);
  }

  function redo() {
    undoOrRedo(true);
  }

  function setActiveHistory(newPresent) {
    present = newPresent;
  }

  function getActiveHistory() {
    return present;
  }

  function addHistory(newHistory) {
    past.push(newHistory);
  }

  function clearRedoStack() {
    future.length = 0;
  }

  return {
    undo,
    redo,
    setActiveHistory,
    getActiveHistory,
    addHistory,
    clearRedoStack
  };
}
export default function undoRedo(reducer) {
  const history = new History();

  return function(state, action) {
    if (state === undefined) {
      let initialState = reducer(state, action);

      history.setActiveHistory(initialState);
    } else if (action.type === 'UNDO') {
      history.undo();
    } else if (action.type === 'REDO') {
      history.redo();
    } else {
      history.addHistory(history.getActiveHistory());
      let newState = reducer(state, action);

      history.setActiveHistory(newState);
      history.clearRedoStack();
    }
    return history.getActiveHistory();
  };
}
