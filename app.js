import express from 'express';
import { createServer } from 'http';
import db from './database.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const app = express();
const server = createServer(app);
// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    let sessoes = [
        {
            id:54,
            title:'sessão - 1',
            perguntas:[
                {
                    id:25,
                    title:'oq é a vida?'
                },{
                     id:26,
                    title:'oq é um plateumito?'
                },{
                    id:27,
                    title:'oq é um quinidario?' 
                }
            ]
        },
        {
            id:55,
            title:'sessão - 2',
            perguntas:[
                {
                    id:78,
                    title:'oq o sentido da vida'
                },{
                     id:79,
                    title:'qual a resposta para tudo'
                },{
                    id:76,
                    title:'quem é John Galte' 
                }
            ]
        },
        {
            id:56,
            title:'sessão - 3',
            perguntas:[
                {
                    id:99,
                    title:'Será que estamos sozinhos?'
                },{
                     id:26,
                    title:'vc fez o L?'
                },{
                    id:27,
                    title:'vc fez Arminha?' 
                }
            ]
        },
    ]
    res.render('index',{sessoes})
  });

// Inicia o servidor
server.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));