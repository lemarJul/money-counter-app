export const updateNestedState = <T extends Record<string | number, any>, V>(
    state: T,
    path: Array<string | number>,
    value: V
): T => {
    const [upperKeys, lastKey] = [path.slice(0, -1), path.slice(-1)[0]];
    const lastState: Record<string | number, V> = upperKeys.reduce((state, key) => state[key], state);
    lastState[lastKey as keyof typeof lastState] = value;

    return JSON.parse(JSON.stringify(state));
};