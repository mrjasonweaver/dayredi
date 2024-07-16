
/**
 * Create a worker script from a function string
 * @param functionString
 */
const createWorkerScript = (functionString: string) => {
    functionString = functionString.substring(functionString.indexOf("{") + 1, functionString.lastIndexOf("}"));
    const blob = new Blob([functionString], { type: "application/javascript" });

    // Create an object URL for the blob.
    const noOp = () => {};
    if (typeof window.URL.createObjectURL === 'undefined') { 
        Object.defineProperty(window.URL, 'createObjectURL', { value: noOp });
    }

    const url = window.URL.createObjectURL(blob);
    return url;

};

export default createWorkerScript;