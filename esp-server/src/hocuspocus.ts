import {Server} from "@hocuspocus/server";
import {SQLite} from "@hocuspocus/extension-sqlite";

export const hocuspocusServer = Server.configure({
    async onConnect(data) {
        console.log('New connection', data)
    },
    async onLoadDocument(data) {
        const doc = data.document.getMap()
        console.log('Load', data.documentName, doc.toJSON())
    },
    async onChange(data) {
        const doc = data.document.getMap()
        console.log('Change', data.documentName, doc.toJSON())
    },
    extensions: [
        new SQLite({
            database: 'db.sqlite',
        }),
    ],
})

