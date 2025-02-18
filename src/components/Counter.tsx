import React from 'react'; 
import { useSpring, animated } from 'react-spring';
import { Plus, Minus, RotateCcw } from 'lucide-react'; 
import { useSelector, useDispatch } from 'react-redux'; 
import { RootState } from '../store'; 
import { increment, decrement, reset } from '../store/slices/counterSlice';

export default function Counter() { 
  const { value, color } = useSelector((state: RootState) => state.counter); 
  const dispatch = useDispatch();

  // Interpolate color based on the counter value with professional colors
  const colorInterpolation = value < 0
    ? 'rgb(240, 128, 128)'  // Light coral for negative values
    : `rgb(${Math.min(value * 5 + 100, 240)}, ${Math.min(value * 2 + 100, 255)}, ${Math.min(value * 3 + 100, 180)})`; // Soft green to blue shades for positive values

  const props = useSpring({
    backgroundColor: colorInterpolation,
    config: {
      tension: 120,
      friction: 14,
      clamp: true,
      duration: 300,
    },
  });

  return ( 
    <animated.div 
      style={props} 
      className="flex-1 p-8 rounded-lg shadow-lg w-full flex flex-col justify-between"
    >
      <div className="text-center mb-8">
        <span className="text-6xl font-bold text-gray-800">{value}</span>
      </div>
      <div className="flex justify-center gap-6">
        <button
          onClick={() => dispatch(decrement())}
          className="p-4 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-transform"
        >
          <Minus size={28} />
        </button>
        <button
          onClick={() => dispatch(reset())}
          className="p-4 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-transform"
        >
          <RotateCcw size={28} />
        </button>
        <button
          onClick={() => dispatch(increment())}
          className="p-4 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-transform"
        >
          <Plus size={28} />
        </button>
      </div>
    </animated.div>
  );
}
