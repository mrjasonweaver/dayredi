/**
 * Test creating a worker script
 * This test will ensure that the createWorkerScript function correctly creates a worker script from a function string.
 */
import { describe, it, expect, vi } from 'vitest';
import createWorkerScript from '../workers/createWorkerScript';

describe('createWorkerScript', () => {
    it('should create a worker script from a function string', () => {
        global.URL.createObjectURL = vi.fn();
        const functionString = 'function test() { console.log("test"); }';
        const workerScript = createWorkerScript(functionString);

        console.debug(workerScript);

        // Create spy for URL.createObjectURL
        expect(global.URL.createObjectURL).toHaveBeenCalled();
    });
});
