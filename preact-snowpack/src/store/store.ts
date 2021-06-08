import { createStoreon, StoreonModule } from 'storeon'
import {useStoreon} from "storeon/preact";

export interface Diagnostics {
    readonly fileName: string
    readonly code: string
    readonly error: string
}

export interface State {
    readonly project: string
    readonly locationHash: string;
    readonly uniqueCodes: number,
    readonly uniqueFiles: number,
    readonly messages: Diagnostics[],
}

// Events declaration: map of event names to type of event data
export interface Events {
    'update': Partial<State>;
    'load': undefined;
}

const globalModule: StoreonModule<State, Events> = store => {
    store.on('@init', () => ({
        project: '',
        locationHash: '',
        uniqueCodes: 0,
        uniqueFiles: 0,
        messages: [],
    }))
    store.on('update', (state, statePatch) => {
        return {
            ...state,
            ...statePatch,
        }
    });
    store.on('load', () => {
        setInterval(() => {
            fetch('http://localhost:3000/messages').then(res => res.json()).then((res) => {
                store.dispatch('update', { uniqueFiles: res.filesAffected.length, uniqueCodes: res.errorCodes.length, messages: res.diagnostics })
            })
        }, 500);
    });
}

export const store = createStoreon<State, Events>([globalModule]);

export function useStore (...keys: (keyof State)[]): useStoreon.StoreData<State, Events> {
    return useStoreon<State, Events>(...keys);
}
