import {createContext} from "react";
import * as Y from 'yjs';

export const DocContext = createContext<Y.Map<any> | null>(null);
