import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./database.db');

// Configuração do SQLite
db.serialize(() => {
    db.run(`
         -- Tabela de Sessões
            CREATE TABLE IF NOT EXISTS sessao (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                criada_em DATETIME DEFAULT CURRENT_TIMESTAMP
            );
    `);
    db.run(`
        -- Tabela de Perguntas
            CREATE TABLE IF NOT EXISTS pergunta (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                sessao_id INTEGER NOT NULL,
                texto TEXT NOT NULL,
                FOREIGN KEY (sessao_id) REFERENCES sessao(id) ON DELETE CASCADE
            );
        `)
    db.run(`
        -- Tabela de Respostas
            CREATE TABLE IF NOT EXISTS resposta (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                texto TEXT NOT NULL
            );
        `)  
     db.run(`
        -- Tabela Associativa para Respostas e Perguntas
            CREATE TABLE IF NOT EXISTS pergunta_resposta (
                pergunta_id INTEGER NOT NULL,
                resposta_id INTEGER NOT NULL,
                PRIMARY KEY (pergunta_id, resposta_id),
                FOREIGN KEY (pergunta_id) REFERENCES pergunta(id) ON DELETE CASCADE,
                FOREIGN KEY (resposta_id) REFERENCES resposta(id) ON DELETE CASCADE
            );
        `)     
  });


  export default db;

