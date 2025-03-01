import { use as defaultUse } from "nomail/util/use";

export type IModule = (use: typeof defaultUse) => void;
