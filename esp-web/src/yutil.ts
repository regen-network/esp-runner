import * as Y from 'yjs';
import {useState, useSyncExternalStore} from "react";

export function useYMapKeys(map: Y.Map<any>): IterableIterator<string> {
    const [state, setState] = useState(map.keys())
    map.observe((evt: Y.YMapEvent<any>) => {
        if (evt.changes.added.size > 0 || evt.changes.deleted.size > 0) {
            setState(map.keys())
        }
    })
    return state
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
    // const [state, setState] = useState(array.toArray())
    // array.observe((evt: Y.YArrayEvent<any>) => {
    //     if (evt.changes.added.size > 0 || evt.changes.deleted.size > 0) {
    //         setState(array.toArray())
    //     }
    // })
    // return state
    let values = array.toArray()
    return useSyncExternalStore(function (listener) {
        const onChange = (evt: Y.YArrayEvent<T>) => {
            if (evt.changes.added.size > 0 || evt.changes.deleted.size > 0) {
                values = array.toArray()
                listener()
            }
        }
        array.observe(onChange)
        return () => array.unobserve(onChange)
    }, function () {
        return values
    })
}

export function useYJSON(y: Y.AbstractType<any>): any {
    let json = y.toJSON()
    return useSyncExternalStore(function (listener) {
        const onChange = () => {
            json = y.toJSON()
            listener()
        }
        y.observeDeep(onChange)
        return () => y.unobserveDeep(onChange)
    }, function () {
        return json
    })
}
