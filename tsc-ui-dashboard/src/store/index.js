import {createLocationStore} from "./location";
import {createStatusStore} from "./status";
import {createInfoStore} from "./info";

export const location = createLocationStore();
export const status = createStatusStore();
export const info = createInfoStore();
