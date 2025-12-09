const fornecedor_router = require('./router/fornecedor_router');
const cliente_router = require('./router/cliente_router');
const conta_router = require('./router/conta_router');
const usuario_router = require('./router/usuario_router');
const venda_router = require('./router/venda_router');
const produto_router = require('./router/produto_router');


const express = require('express');
const swaggerUi = require('swagger-ui-express');
const specs = require('./swagger');

const app = express();

app.use(express.json());

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/fornecedores', fornecedor_router);
app.use('/clientes', cliente_router);
app.use('/contas', conta_router);
app.use('/usuarios', usuario_router);
app.use('/vendas', venda_router);
app.use('/produtos', produto_router);

app.get('/', (req, res) => {
    res.send('Hello World! API documentation available at http://localhost:3000/api-docs');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});