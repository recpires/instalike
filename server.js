import express from "express"; // Importa o framework Express para criar a aplicação web
import conectarAoBanco from "./src/config/dbconfig.js"; // Importa a função para conectar ao banco de dados (detalhes em dbconfig.js)

// Conecta ao banco de dados usando a string de conexão fornecida como variável de ambiente
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

const app = express(); // Cria uma instância do Express para iniciar a aplicação
app.use(express.json()); // Habilita o parser JSON para lidar com requisições com corpo em formato JSON

app.listen(3000, () => { // Inicia o servidor na porta 3000
  console.log("servidor escutando..."); // Mensagem de log indicando que o servidor está ativo
});

// Função assíncrona para buscar todos os posts do banco de dados
async function getTodosPosts() {
  const db = conexao.db("imersão-instalike"); // Seleciona o banco de dados "imersão-instalike"
  const colecao = db.collection("posts"); // Seleciona a coleção "posts" dentro do banco de dados
  return colecao.find().toArray(); // Executa a consulta para buscar todos os documentos da coleção e retorna um array com os resultados
}

// Rota GET para buscar todos os posts
app.get("/posts", async (req, res) => {
  const posts = await getTodosPosts(); // Chama a função para buscar os posts
  res.status(200).json(posts); // Envia os posts como resposta em formato JSON com status 200 (sucesso)
});

//function buscarPostPorID(id) {
//  return posts.findIndex((post) => {
//    return post.id === Number(id);
//  });
//}

//app.get("/posts/:id", (req, res) => {
//  const index = buscarPostPorID(req.params.id);
//  res.status(200).json(posts[index]);
//});

const posts = [
  {
    descricao: "Uma gato assustado",
    imagem: "https://placecats.com/millie/300/150",
    id: 1,
  },
  {
    descricao: "Gato dormindo",
    imagem: "https://placecats.com/millie/300/150",
    id: 2,
  },
  {
    descricao: "Gato tomando banho",
    imagem: "https://placecats.com/millie/300/150",
    id: 3,
  },
];
