export const createMockLocalStorage = () => {
    let store = {};

    return {
        getItem: jest.fn((key) => store[key] ?? null),
        setItem: jest.fn((key, value) => {
            store[key] = value;
        }),
        removeItem: jest.fn((key) => {
            delete store[key];
        }),
        clear: jest.fn(() => {
            store = {};
        })
    }
}