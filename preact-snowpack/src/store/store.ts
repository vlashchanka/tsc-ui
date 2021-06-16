import { createStoreon, StoreonModule } from 'storeon'
import {useStoreon} from "storeon/preact";

export interface Diagnostics {
    readonly fileName: string
    readonly code: string
    readonly error: string
}

export const enum Navigation {
    Diagnostics,
    Status,
}

export interface State {
    readonly project: string
    readonly locationHash: string;
    readonly navigation: Navigation;
    readonly uniqueCodes: number,
    readonly uniqueFiles: number,
    readonly messages: Diagnostics[],
}

// Events declaration: map of event names to type of event data
export interface Events {
    'update': Partial<State>;
    'load': undefined;
}

// TODO: fix
const apiEndpoint = "http://localhost:3000";

const globalModule: StoreonModule<State, Events> = store => {
    store.on('@init', (): State => {
        return {
            project: 'Project',
            navigation: getNavigation(window.location.hash),
            locationHash: '',
            uniqueCodes: 0,
            uniqueFiles: 0,
            messages: [],
        }
    });
    store.on('update', (state, statePatch) => {
        return {
            ...state,
            ...statePatch,
        }
    });
    store.on('load', () => {
        window.addEventListener('popstate', () => {
            store.dispatch('update', {
                navigation: getNavigation(window.location.hash)
            });
        });
        setInterval(() => {
            fetch(`${apiEndpoint}/messages`).then(res => res.json()).then((res) => {
                store.dispatch('update', { uniqueFiles: res.filesAffected.length, uniqueCodes: res.errorCodes.length, messages: res.diagnostics })
            })
        }, 500);
    });
};

function getNavigation(locationHash: string): Navigation {
    switch (locationHash) {
        case "#diagnostics":
            return Navigation.Diagnostics;
        default:
        case "":
        case "#":
            return Navigation.Status
    }
}

export const store = createStoreon<State, Events>([globalModule]);

export function useStore (...keys: (keyof State)[]): useStoreon.StoreData<State, Events> {
    return useStoreon<State, Events>(...keys);
}
