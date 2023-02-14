import * as dotenv from 'dotenv'
import express from 'express'
import expressWebsockets from 'express-ws'
import {authRouter} from "./auth";
import session from 'express-session';
import passport from 'passport';
import path from "path";
import {hocuspocusServer} from "./hocuspocus";

dotenv.config()

var SQLiteStore = require('connect-sqlite3')(session);

const { app } = expressWebsockets(express())

app.ws('/doc/:id', (websocket, request) => {
    const context = {}
    hocuspocusServer.handleConnection(websocket, request, request.params.id, context)
})

app.use('/', authRouter)

const port =process.env.PORT || 5001
app.listen(port, () => console.log('Listening on port', port))