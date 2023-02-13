import {Server} from '@hocuspocus/server'
import {SQLite} from "@hocuspocus/extension-sqlite";

// const app = express()
//
// app.get('/', (request, response) => {
//     response.send('Hello World!')
// })
//
// app.listen(process.env.PORT || 5001)

const PORT = process.env.PORT

const server = Server.configure({
    async onConnect(data) {
        console.log('New connection', data)
    },
    port: PORT ? parseInt(PORT) : 5002,
    extensions: [
        new SQLite({
            database: 'db.sqlite',
        }),
        // new Redis({
        //     // [required] Hostname of your Redis instance
        //     host: '127.0.0.1',
        //
        //     // [required] Port of your Redis instance
        //     port: 6379,
        // }),
        // new Database({
        //     // Return a Promise to retrieve data …
        //     fetch: async ({documentName}) => {
        //         return new Promise((resolve, reject) => {
        //             this.db?.get(`
        //                 SELECT data
        //                 FROM "documents"
        //                 WHERE name = $name
        //                 ORDER BY rowid DESC
        //             `, {
        //                 $name: documentName,
        //             }, (error, row) => {
        //                 if (error) {
        //                     reject(error)
        //                 }
        //
        //                 resolve(row?.data)
        //             })
        //         })
        //     },
        //     // … and a Promise to store data:
        //     store: async ({documentName, state}) => {
        //         this.db?.run(`
        //             INSERT INTO "documents" ("name", "data")
        //             VALUES ($name, $data) ON CONFLICT(name) DO
        //             UPDATE SET data = $data
        //         `, {
        //             $name: documentName,
        //             $data: state,
        //         })
        //     },
        // }),
    ],
})

server.listen()