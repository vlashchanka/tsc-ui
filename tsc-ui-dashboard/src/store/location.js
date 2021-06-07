import { writable } from 'svelte/store';

export function createLocationStore() {
    const { subscribe, update } = writable({
        hash: "",
    });
    window.addEventListener('popstate', () => {
        update(_ => ({
            hash: location.hash,
        }));
    });
    return {
        subscribe,
    };
}

