import * as Y from 'yjs';
import {useSyncExternalStore} from "react";

export function useYMapKeys(map: Y.Map<any>): IterableIterator<string> {
    const keys = useSyncExternalStore(function (listener) {
        const onChange = (evt: Y.YMapEvent<any>) => {
            listener()
        }
        map.observe(onChange)
        return () => map.unobserve(onChange)
    }, function () {
        return map.keys()
    })
    return keys
}

export function useYMapValue(map: Y.Map<any>, key: string): [any, ((value: any) => void)] {
    const state = useSyncExternalStore(function (listener) {
        const onChange = (evt: Y.YMapEvent<any>) => {
            if (evt.keysChanged.has(key)) {
                listener()
            }
        }
        map.observe(onChange)
        return () => map.unobserve(onChange)
    }, function () {
        return map.get(key)
    })
    const setState = (value: any) => {
        map.set(key, value)
    }
    return [state, setState]
}

export function useYArray<T>(array: Y.Array<T>): T[] {
    const state = useSyncExternalStore(function (listener) {
        const onChange = (evt: Y.YArrayEvent<T>) => {
            listener()
        }
        array.observe(onChange)
        return () => array.unobserve(onChange)
    }, function () {
        return array.toArray()
    })
    return state
}
