import express from 'express';
import { createServer } from 'http';
import db from './database.js';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const app = express();
const server = createServer(app);
// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.post('/admin/add/sessao',async (req,res)=>{
    const { title } = req.body
    const query = `
        insert into sessao (title) values (?)
    `
    const sessao = await db.run(query,[title],error=>{
        if(error){
            console.log('Error na query')
        }
    })
    if(sessao){
        return res.json({sessao:title});
    }

    return res.json({error:'algo aconteceu'})
    
}) 

app.put('/admin/edit/sessao/:id',async(req,res)=>{
    const { title } = req.body
    const { id } = req.params
    const query = `
        UPDATE sessao SET title = ? WHERE id = ?
    `
    const sessao = await db.run(query,[title,id],error=>{
        if(error){
            console.log('Error na query')
        }
    })
    if(sessao){
        return res.json({sessao:title});
    }

    return res.json({error:'algo aconteceu'})
})

app.post('/admin/add/perguntas',async (req,res)=>{
    const { texto,sessao_id } = req.body
    const query = `
        insert into pergunta (texto,sessao_id) values (?,?)
    `
    const pergunta = await db.run(query,[texto,sessao_id],error=>{
        if(error){
            console.log('Error na query')
        }
    })
    if(pergunta){
        console.log(pergunta)
        // return res.json({pergunta:pergunta.texto});
    }

    return res.json({error:'algo aconteceu'})
})

app.put('/admin/edit/perguntas',async(req,res)=>{
    const { texto } = req.body
    const { id } = req.params
    const query = `
        UPDATE pergunta SET texto = ? WHERE id = ?
    `
    const pergunta = await db.run(query,[texto,id],error=>{
        if(error){
            console.log('Error na query')
        }
    })
    if(pergunta){
        return res.json({pergunta:texto});
    }

    return res.json({error:'algo aconteceu'})
})

app.get('/admin/get/sessao',async(req,res)=>{
    const query = `
    SELECT
         sessao.title AS title
     FROM
         sessao
 `
 await db.all(query,[],(error,result)=>{
     if(error){
         return console.log('Error na query')
     }
      return result
 })
})

app.get('/', async (req, res) => {
    const query = `
       SELECT
            sessao.title AS title,
            sessao.id AS id,
            GROUP_CONCAT(pergunta.texto || '|' || pergunta.id) AS perguntas_raw
        FROM
            sessao
        LEFT JOIN
            pergunta
        ON
            sessao.id = pergunta.sessao_id
        GROUP BY
            sessao.id
    `
    await db.all(query,[],(error,result)=>{
        if(error){
            return console.log('Error na query')
        }

    const sessoes = result.map(row => ({
        title: row.title,
        id: row.id,
        perguntas: row.perguntas_raw
            ? row.perguntas_raw.split(',').map(item => {
                const [texto, id] = item.split('|');
                return { texto: texto, id: Number(id) };
            })
            : []
        }));
        
        // console.log(result)

        res.render('index',{sessoes})
    })
    
  });

app.get('/admin',async (req,res)=>{
    
    res.render('admin')

})  
 

// Inicia o servidor
server.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));