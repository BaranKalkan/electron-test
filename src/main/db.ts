import Database from 'better-sqlite3';
import { app } from 'electron';
import { join } from 'path';

const dbPath = join(app.getPath('userData'), 'database.sqlite');
console.log("Database path: ", dbPath);
const db = new Database(dbPath);

db.pragma('journal_mode = WAL');

// Veritabanı şemasını oluştur
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
  )
`);

// Örnek verileri ekle
const insertUser = db.prepare('INSERT OR IGNORE INTO users (name, email) VALUES (?, ?)');
try {
  insertUser.run('Ahmet Yılmaz', 'ahmet@example.com');
  insertUser.run('Ayşe Demir', 'ayse@example.com');
  insertUser.run('Mehmet Kaya', 'mehmet@example.com');
  console.log('Örnek veriler başarıyla eklendi');
} catch (error) {
  console.log('Örnek veri eklenirken hata:', error);
}

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