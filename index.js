const express = require('express');
const app = express();
const port = 3000;
const bodyparser = require('body-parser');
const Bcrypt = require('bcrypt');
const connection = require('./database/conection');
const cadastroUser = require('./database/cadastro_usuario');
const usuario = require('./database/cadastro_usuario');

//Configurando body-parser
app.use(bodyparser.urlencoded({ extend: false }));
app.use(bodyparser.json());

//Configurando o EJS
app.set('view engine', 'ejs');

//Configurando arquivos estaticos
app.use(express.static('public'));

//configuração da conexão com o banco de dados
connection
  .authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados feita com sucesso!');
  })
  .catch((error) => {
    console.log(error);
  });

//Rota principal
app.get('/', (req, res) => {
  res.render('index');
});

//Rota home
app.get('/home', (req, res) => {
  res.send('<h1>Please, please, please</h1>');
});

//Rota main
app.get('/main', (req, res) => {
  res.render('page/main');
});

//Rota login
app.get('/login', (req, res) => {
  res.render('login');
});

//Rota cadastro/criar conta
app.get('/cadastro', (req, res) => {
  res.render('cadastro');
});

//Rota de cadastro 2
app.post('/cadastro-user', (req, res) => {
  var email = req.body.email;
  var senha = req.body.senha;

  var salt = Bcrypt.genSaltSync(10);
  var hash = Bcrypt.hashSync(senha, salt);

  cadastroUser
    .create({
      email: email,
      senha: hash,
      senha_2: req.body.senha_2,
    })
    .then(function () {
      res.redirect('/login');
    })
    .catch(function (erro) {
      res.send('Houve erro no cadastro, tente novamente' + erro);
    });
});

//Rota logar com sucesso
app.post('/logado', (req, res) => {
  var email = req.body.email;
  var senha = req.body.senha;

  cadastroUser.findOne({ where: { email: email } }).then((usuario) => {
    if (usuario != undefined) {
      var correct = Bcrypt.compareSync(senha, usuario.senha);
      if (correct) {
        res.send('tá dentro');
        //res.redirect('/main');
      } else {
        res.redirect('/main');
      }
    } else {
      res.redirect('/cadastro');
    }
  });
});

//Rota para alguma outra coisa
app.get('/automacao', (req, res) => {
  res.render('page/automacao');
});

app.get('/supervisorio', (req, res) => {
  res.render('page/supervisorio');
});

app.get('/retrofit', (req, res) => {
  res.render('page/retrofit');
});

app.get('/otimizacao', (req, res) => {
  res.render('page/otimizacao');
});

app.get('/casos', (req, res) => {
  res.render('page/casos');
});

app.get('/quemSomos', (req, res) => {
  res.render('page/quemSomos');
});

app.get('/contato', (req, res) => {
  res.render('page/contato');
});

//Rota para o video
app.get('/vd_teste', (req, res) => {
  res.render('page/vd_teste');
});

//Iniciando o servidor
app.listen(port, () => {
  console.log('Servidor Online!');
});
