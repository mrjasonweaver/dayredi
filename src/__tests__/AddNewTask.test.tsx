import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import AddNewTask from '../components/AddNewTask';

describe('AddNewTask', () => {
  it('should render AddNewTask component with props', () => {
    // Render the AddNewTask component with props.
    render(
      <AddNewTask
        setLists={() => { }}
        currentList={'list1'}
        title={'Add New Task'}
      />,
    );

    // Debug the screen.
    screen.debug();
  });
});
