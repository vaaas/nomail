import { use as defaultUse } from "/util/use";

export type IModule = (use: typeof defaultUse) => void;
