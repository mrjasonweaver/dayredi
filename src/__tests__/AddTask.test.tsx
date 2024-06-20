import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import AddTask from '../components/AddTask';

describe('AddTask', () => {
    it('should render AddTask component with props', () => {
        // Render the AddTask component with props.
        render(<AddTask
            setLists={() => { }}
            currentList={'list1'}
        />);
        
        // Debug the screen.
        screen.debug();
    });
});