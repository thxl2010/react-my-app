import { useReducer, useRef, useCallback, useEffect } from 'react';

const fixRatio = ratio => Math.max(0, Math.min(1, ratio));

// ! 1. a reducer function outside of the components:
// A reducer function always receives state and action .
// Based on these two arguments, a reducer always returns a new state:
const reducer = (state, action) => {
  const { horizon } = state;
  switch (action.type) {
    case 'setRatio':
      if (!state.reset || action.ratio !== state.ratio) {
        return {
          ...state,
          ratio: fixRatio(action.ratio),
          reset: true,
        };
      }
      return state;
    case 'start':
      return {
        ...state,
        lastPos: horizon ? action.x : -action.y,
        slideRange: horizon ? action.slideWidth : action.slideHeight,
        sliding: true,
        reset: false,
      };
    case 'move': {
      if (!state.sliding) {
        return state;
      }
      const pos = horizon ? action.x : -action.y;
      const delta = pos - state.lastPos;
      return {
        ...state,
        lastPos: pos,
        ratio: fixRatio(state.ratio + delta / state.slideRange),
        reset: false,
      };
    }
    case 'end': {
      if (!state.sliding) {
        return state;
      }
      const pos = horizon ? action.x : -action.y;
      const delta = pos - state.lastPos;
      return {
        ...state,
        lastPos: pos,
        ratio: fixRatio(state.ratio + delta / state.slideRange),
        sliding: false,
        reset: false,
      };
    }
    case 'to':
      return {
        ...state,
        ratio: fixRatio(
          horizon
            ? action.x / action.slideWidth
            : (action.slideHeight - action.y) / action.slideHeight
        ),
        sliding: false,
        reset: false,
      };
    default:
      return state;
  }
};

const useSlider = props => {
  const { horizon, initRatio = 0 } = props;

  // ! 2. The hook  useReducer
  // The hook  useReducer receives a reducer function and an initial state as arguments
  // and returns an array with two items.
  // The first item is the current state; the second item is the state updater function (also called dispatch function):
  const [state, dispatch] = useReducer(reducer, {
    horizon,
    ratio: initRatio,
    reset: true,
  });

  const containerRef = useRef(null);
  const hotAreaRef = useRef(null);
  const thumbRef = useRef(null);

  const handleHotAreaMouseDown = useCallback(ev => {
    const hotArea = hotAreaRef.current;
    dispatch({
      type: 'to',
      x: ev.nativeEvent.offsetX,
      y: ev.nativeEvent.offsetY,
      slideWidth: hotArea.clientWidth,
      slideHeight: hotArea.clientHeight,
    });
  }, []);

  const handleThumbMouseDown = useCallback(ev => {
    const hotArea = hotAreaRef.current;
    dispatch({
      type: 'start',
      x: ev.pageX,
      y: ev.pageY,
      slideWidth: hotArea.clientWidth,
      slideHeight: hotArea.clientHeight,
    });
  }, []);

  useEffect(() => {
    const onSliding = ev => {
      // ! 3. the useReducer state updater function
      // dispatches an action for the reducer.
      // The action comes with a type and an optional option:
      dispatch({
        type: 'move',
        x: ev.pageX,
        y: ev.pageY,
      });
    };
    const onSlideEnd = ev => {
      dispatch({
        type: 'end',
        x: ev.pageX,
        y: ev.pageY,
      });
    };

    const slider = containerRef.current;
    slider.addEventListener('mousemove', onSliding);
    slider.addEventListener('mouseup', onSlideEnd);

    // ! 如果你的 effect 返回一个函数，React 将会在执行清除操作时调用它：
    // ! [需要清除的 effect](https://zh-hans.reactjs.org/docs/hooks-effect.html#%E9%9C%80%E8%A6%81%E6%B8%85%E9%99%A4%E7%9A%84-effect)
    return () => {
      slider.removeEventListener('mousemove', onSliding);
      slider.removeEventListener('mouseup', onSlideEnd);
    };
  }, []);

  const setRatio = useCallback(
    ratio =>
      dispatch({
        type: 'setRatio',
        ratio,
      }),
    []
  );

  return [
    {
      ref: containerRef,
    },
    {
      ref: hotAreaRef,
      onMouseDown: handleHotAreaMouseDown,
    },
    {
      ref: thumbRef,
      onMouseDown: handleThumbMouseDown,
    },
    {
      ratio: state.ratio,
      reset: state.reset,
      sliding: state.sliding,
      setRatio,
    },
  ];
};

export default useSlider;
