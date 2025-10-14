const forncedor_router = require('./router/fornecedor_router');
const cliente_router = require('./router/cliente_router');
const conta_router = require('./router/conta_router');
const express = require('express');
const app = express();

app.use(express.json());
app.use('/api', forncedor_router);
app.use('/api', cliente_router);
app.use('/api', conta_router);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
