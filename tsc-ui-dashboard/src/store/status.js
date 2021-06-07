import { writable } from 'svelte/store';

export function createStatusStore() {
    const { subscribe, update } = writable({
        messages: [],
        files: 0,
        codes: 0,
    });
    const store =  {
        subscribe,
        update: ({ errors, files, codes, messages }) => {
            update(_ => ({ errors, files, codes, messages}));
        },
        getStatus: () => {
            fetch('/messages').then(res => res.json()).then((res) => {
                update(_ => ({ files: res.filesAffected.length, codes: res.errorCodes.length, messages: res.diagnostics }));
            })
        }
    };
    return store;
}

