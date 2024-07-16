import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import SingleTask from '../components/SingleTask';

describe('SingleTask', () => {
    it('renders the App component', () => {
        // Tender the SingleTask component with props.
        render(
            <SingleTask
                key={1}
                lists={[]}
                setLists={() => {}}
                currentList={'list1'}
                task={{
                    id: 'task1',
                    name: 'My fist task.',
                    completed: false,
                    displayTime: '00:00:00',
                    timestamp: new Date().getTime(),
                    timerStart: 0,
                    timer: 0,
                }}
            />,
        );

        screen.debug();
    });
});
