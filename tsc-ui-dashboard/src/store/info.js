import { writable } from 'svelte/store';

export function createInfoStore() {
    const { subscribe, update } = writable({
        project: 'Project',
        user: 'User',
    });
    return {
        subscribe,
        update: ({ project, user}) => {
            update(_ => ({
                project: project,
                user: user,
            }));
        },
    };
}

