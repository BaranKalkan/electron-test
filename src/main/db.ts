import Database from 'better-sqlite3';
import { app } from 'electron';
import { join } from 'path';

const dbPath = join(app.getPath('userData'), 'database.sqlite');
console.log("Database path: ", dbPath);
const db = new Database(dbPath);

db.pragma('journal_mode = WAL');

export const dbOperations = {
  getAllUsers: () => {
    const stmt = db.prepare('SELECT * FROM users');
    return stmt.all();
  },

  addUser: (name: string, email: string) => {
    const stmt = db.prepare('INSERT INTO users (name, email) VALUES (?, ?)');
    return stmt.run(name, email);
  }
};