import { describe, it } from "vitest";
import { render, screen } from '@testing-library/react';
import Timer from '../components/Timer';

describe('renders Timer component', () => {
    it('should render Timer component with props', () => {
        // Render the Timer component with props.
        render(
            <Timer
                timerStartValue={1}
            />
        );

        // Debug the screen.
        screen.debug();
    });

});