CREATE TABLE document
(
    id   TEXT PRIMARY KEY,
    name TEXT,
    type TEXT
);

CREATE TABLE document_draft
(
    id   TEXT PRIMARY KEY references document,
    data bytea
);

CREATE TYPE document_permission_level AS ENUM ( 'view', 'comment', 'edit', 'owner' );

CREATE TABLE document_permission
(
    id          TEXT PRIMARY KEY references document,
    pg_role     TEXT,
    level       document_permission_level,
    last_viewed timestamptz
);



