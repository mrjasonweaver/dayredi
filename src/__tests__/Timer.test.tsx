import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Timer from '../components/Timer';

describe('renders Timer component', () => {
  it('should render Timer component with props', () => {
    // Render the Timer component with props.
    render(
      <Timer
        currentList={'list1'}
        setLists={() => {
        }}
        task={{
          id: 'task1',
          name: 'Task 1',
          completed: false,
          displayTime: '00:00:00',
          timer: 10,
          timerStart: 0,
          timestamp: Date.now(),
        }}
        isRunning={false}
        setIsRunning={() => {
        }}
      />,
    );

    // Debug the screen.
    screen.debug();
  });
});
