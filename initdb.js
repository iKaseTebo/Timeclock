import Database from 'better-sqlite3';

const db = new Database('timeClock.db');

const dummyEntries = [
    {
        "id": 1,
        "check_in": "2025-03-01T09:51:00",
        "check_out": "2025-03-01T14:43:00",
        "note": "Worked on project session 1 of day 1",
        "created_at": "2025-03-01T14:47:00"
    },
    {
        "id": 2,
        "check_in": "2025-03-01T08:22:00",
        "check_out": "2025-03-01T13:24:00",
        "note": "Worked on project session 2 of day 1",
        "created_at": "2025-03-01T13:34:00"
    },
    {
        "id": 3,
        "check_in": "2025-03-02T07:51:00",
        "check_out": "2025-03-02T10:46:00",
        "note": "Worked on project session 1 of day 2",
        "created_at": "2025-03-02T11:00:00"
    },
    {
        "id": 4,
        "check_in": "2025-03-02T09:27:00",
        "check_out": "2025-03-02T13:53:00",
        "note": "Worked on project session 2 of day 2",
        "created_at": "2025-03-02T14:01:00"
    },
    {
        "id": 5,
        "check_in": "2025-03-02T09:21:00",
        "check_out": "2025-03-02T14:20:00",
        "note": "Worked on project session 3 of day 2",
        "created_at": "2025-03-02T14:34:00"
    },
    {
        "id": 6,
        "check_in": "2025-03-03T08:18:00",
        "check_out": "2025-03-03T14:08:00",
        "note": "Worked on project session 1 of day 3",
        "created_at": "2025-03-03T14:22:00"
    },
    {
        "id": 7,
        "check_in": "2025-03-03T07:50:00",
        "check_out": "2025-03-03T11:34:00",
        "note": "Worked on project session 2 of day 3",
        "created_at": "2025-03-03T11:48:00"
    },
    {
        "id": 8,
        "check_in": "2025-03-03T07:41:00",
        "check_out": "2025-03-03T13:20:00",
        "note": "Worked on project session 3 of day 3",
        "created_at": "2025-03-03T13:29:00"
    },
    {
        "id": 9,
        "check_in": "2025-03-04T08:54:00",
        "check_out": "2025-03-04T12:42:00",
        "note": "Worked on project session 1 of day 4",
        "created_at": "2025-03-04T12:49:00"
    },
    {
        "id": 10,
        "check_in": "2025-03-04T08:28:00",
        "check_out": "2025-03-04T11:04:00",
        "note": "Worked on project session 2 of day 4",
        "created_at": "2025-03-04T11:12:00"
    },
    {
        "id": 11,
        "check_in": "2025-03-05T09:40:00",
        "check_out": "2025-03-05T15:29:00",
        "note": "Worked on project session 1 of day 5",
        "created_at": "2025-03-05T15:38:00"
    },
    {
        "id": 12,
        "check_in": "2025-03-05T07:11:00",
        "check_out": "2025-03-05T11:53:00",
        "note": "Worked on project session 2 of day 5",
        "created_at": "2025-03-05T12:02:00"
    },
    {
        "id": 13,
        "check_in": "2025-03-06T07:47:00",
        "check_out": "2025-03-06T10:53:00",
        "note": "Worked on project session 1 of day 6",
        "created_at": "2025-03-06T10:58:00"
    },
    {
        "id": 14,
        "check_in": "2025-03-06T08:13:00",
        "check_out": "2025-03-06T11:09:00",
        "note": "Worked on project session 2 of day 6",
        "created_at": "2025-03-06T11:13:00"
    },
    {
        "id": 15,
        "check_in": "2025-03-07T08:07:00",
        "check_out": "2025-03-07T12:29:00",
        "note": "Worked on project session 1 of day 7",
        "created_at": "2025-03-07T12:36:00"
    },
    {
        "id": 16,
        "check_in": "2025-03-08T08:51:00",
        "check_out": "2025-03-08T15:04:00",
        "note": "Worked on project session 1 of day 8",
        "created_at": "2025-03-08T15:16:00"
    },
    {
        "id": 17,
        "check_in": "2025-03-09T07:41:00",
        "check_out": "2025-03-09T12:21:00",
        "note": "Worked on project session 1 of day 9",
        "created_at": "2025-03-09T12:35:00"
    },
    {
        "id": 18,
        "check_in": "2025-03-10T07:03:00",
        "check_out": "2025-03-10T14:01:00",
        "note": "Worked on project session 1 of day 10",
        "created_at": "2025-03-10T14:11:00"
    },
    {
        "id": 19,
        "check_in": "2025-03-11T09:59:00",
        "check_out": "2025-03-11T14:59:00",
        "note": "Worked on project session 1 of day 11",
        "created_at": "2025-03-11T15:02:00"
    },
    {
        "id": 20,
        "check_in": "2025-03-12T09:18:00",
        "check_out": "2025-03-12T15:35:00",
        "note": "Worked on project session 1 of day 12",
        "created_at": "2025-03-12T15:43:00"
    },
    {
        "id": 21,
        "check_in": "2025-03-13T07:11:00",
        "check_out": "2025-03-13T10:13:00",
        "note": "Worked on project session 1 of day 13",
        "created_at": "2025-03-13T10:27:00"
    },
    {
        "id": 22,
        "check_in": "2025-03-14T08:20:00",
        "check_out": "2025-03-14T11:47:00",
        "note": "Worked on project session 1 of day 14",
        "created_at": "2025-03-14T11:57:00"
    },
    {
        "id": 23,
        "check_in": "2025-03-15T07:00:00",
        "check_out": "2025-03-15T10:05:00",
        "note": "Worked on project session 1 of day 15",
        "created_at": "2025-03-15T10:09:00"
    },
    {
        "id": 24,
        "check_in": "2025-03-16T09:04:00",
        "check_out": "2025-03-16T12:44:00",
        "note": "Worked on project session 1 of day 16",
        "created_at": "2025-03-16T12:53:00"
    },
    {
        "id": 25,
        "check_in": "2025-03-17T07:37:00",
        "check_out": "2025-03-17T12:48:00",
        "note": "Worked on project session 1 of day 17",
        "created_at": "2025-03-17T12:55:00"
    },
    {
        "id": 26,
        "check_in": "2025-03-18T07:24:00",
        "check_out": "2025-03-18T13:07:00",
        "note": "Worked on project session 1 of day 18",
        "created_at": "2025-03-18T13:13:00"
    },
    {
        "id": 27,
        "check_in": "2025-03-19T08:19:00",
        "check_out": "2025-03-19T14:58:00",
        "note": "Worked on project session 1 of day 19",
        "created_at": "2025-03-19T15:06:00"
    },
    {
        "id": 28,
        "check_in": "2025-03-20T08:11:00",
        "check_out": "2025-03-20T12:52:00",
        "note": "Worked on project session 1 of day 20",
        "created_at": "2025-03-20T12:53:00"
    },
    {
        "id": 29,
        "check_in": "2025-03-21T07:53:00",
        "check_out": "2025-03-21T14:52:00",
        "note": "Worked on project session 1 of day 21",
        "created_at": "2025-03-21T14:59:00"
    },
    {
        "id": 30,
        "check_in": "2025-03-22T07:01:00",
        "check_out": "2025-03-22T13:41:00",
        "note": "Worked on project session 1 of day 22",
        "created_at": "2025-03-22T13:45:00"
    }
];

    db.exec(`
        CREATE TABLE IF NOT EXISTS entries (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            check_in DATETIME NOT NULL,
            check_out DATETIME,
            note TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    function initData() {
        const stmt = db.prepare(`
            INSERT INTO entries VALUES (
            null,
            @check_in,
            @check_out,
            @note,
            @created_at
            )
        `);

        for (const entry of dummyEntries) {
            stmt.run(entry);
        }

    }

    initData();