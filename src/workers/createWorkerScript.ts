
/**
 * Create a worker script from a function string
 * @param functionString
 */
const createWorkerScript = (functionString: string) => {
    functionString = functionString.substring(functionString.indexOf("{") + 1, functionString.lastIndexOf("}"));
    const blob = new Blob([functionString], { type: "application/javascript" });
    return URL.createObjectURL(blob);

};

export default createWorkerScript;