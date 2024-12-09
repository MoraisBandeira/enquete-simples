import express, { query } from 'express';
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

app.get('/', async (req, res) => {
    const query = `
        select * from sessao
    `
    const all = await db.run(query,[],err=>{
        if(err){
            console.log('Error na query')
        }
    })
    console.log(all)
    //res.render('index',{sessoes})
  });
app.post('/admin/add/sessao',async (req,res)=>{
    const query = `
        insert into sessao ()
    `
    const sessao = await db.run(query,[],error=>{
        if(err){
            console.log('Error na query')
        }
    })
})  

// Inicia o servidor
server.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));