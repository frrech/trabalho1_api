const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Trabalho1 API',
            version: '1.0.0',
            description: 'API documentation'
        },
        servers: [{ url: 'http://localhost:3000' }],
        components: {
            schemas: {
                Categoria: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer' },
                        nome: { type: 'string' },
                        descricao: { type: 'string' }
                    },
                    required: ['nome']
                },
                Fornecedor: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer' },
                        nome: { type: 'string' },
                        contato: { type: 'string' }
                    },
                    required: ['nome']
                },
                Cliente: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer' },
                        nome: { type: 'string' },
                        email: { type: 'string' },
                        matricula: { type: 'string' }
                    },
                    required: ['nome','email','matricula']
                },
                Usuario: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer' },
                        nome: { type: 'string' },
                        email: { type: 'string' }
                    },
                    required: ['nome','email']
                },
                Produto: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer' },
                        nome: { type: 'string' },
                        categoriaId: { type: 'integer' },
                        fornecedorNome: { type: 'string' },
                        preco: { type: 'number', format: 'float' }
                    },
                    required: ['nome','categoriaId','preco']
                },
                Conta: {
                    type: 'object',
                    properties: {
                        id_conta: { type: 'integer' },
                        cliente_id: { type: 'integer' },
                        saldo: { type: 'number', format: 'float' }
                    },
                    required: ['cliente_id','saldo']
                },
                VendaItem: {
                    type: 'object',
                    properties: {
                        produtoId: { type: 'integer' },
                        quantidade: { type: 'integer' },
                        precoUnitario: { type: 'number', format: 'float' },
                        subtotal: { type: 'number', format: 'float' }
                    }
                },
                Venda: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer' },
                        clienteNome: { type: 'string' },
                        itens: { type: 'array', items: { $ref: '#/components/schemas/VendaItem' } },
                        dataHora: { type: 'string', format: 'date-time' },
                        total: { type: 'number', format: 'float' }
                    },
                    required: ['clienteNome','itens','total']
                }
            }
        },
        paths: {
            '/categoria': {
                post: {
                    summary: 'Create categoria',
                    requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Categoria' } } } },
                    responses: { '201': { description: 'Created', content: { 'application/json': { schema: { $ref: '#/components/schemas/Categoria' } } } } }
                },
                get: {
                    summary: 'List categorias',
                    responses: { '200': { description: 'OK', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Categoria' } } } } } }
                }
            },
            '/categoria/{id}': {
                get: {
                    summary: 'Get categoria by id',
                    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                    responses: { '200': { description: 'OK', content: { 'application/json': { schema: { $ref: '#/components/schemas/Categoria' } } } } }
                },
                put: {
                    summary: 'Update categoria',
                    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                    requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Categoria' } } } },
                    responses: { '200': { description: 'Updated' } }
                },
                delete: {
                    summary: 'Delete categoria',
                    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                    responses: { '204': { description: 'Deleted' } }
                }
            },
            '/fornecedores': {
                post: {
                    summary: 'Create fornecedor',
                    requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Fornecedor' } } } },
                    responses: { '201': { description: 'Created', content: { 'application/json': { schema: { $ref: '#/components/schemas/Fornecedor' } } } } }
                },
                get: {
                    summary: 'List fornecedores',
                    responses: { '200': { description: 'OK', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Fornecedor' } } } } } }
                }
            },
            '/fornecedores/{id}': {
                get: {
                    summary: 'Get fornecedor by id',
                    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                    responses: { '200': { description: 'OK', content: { 'application/json': { schema: { $ref: '#/components/schemas/Fornecedor' } } } } }
                },
                put: {
                    summary: 'Update fornecedor',
                    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                    requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Fornecedor' } } } },
                    responses: { '200': { description: 'Updated' } }
                },
                delete: {
                    summary: 'Delete fornecedor',
                    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                    responses: { '204': { description: 'Deleted' } }
                }
            },
            '/clientes': {
                post: {
                    summary: 'Create cliente',
                    requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Cliente' } } } },
                    responses: { '201': { description: 'Created', content: { 'application/json': { schema: { $ref: '#/components/schemas/Cliente' } } } } }
                },
                get: {
                    summary: 'List clientes',
                    responses: { '200': { description: 'OK', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Cliente' } } } } } }
                }
            },
            '/clientes/{id}': {
                get: {
                    summary: 'Get cliente by id',
                    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                    responses: { '200': { description: 'OK', content: { 'application/json': { schema: { $ref: '#/components/schemas/Cliente' } } } } }
                },
                put: {
                    summary: 'Update cliente',
                    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                    requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Cliente' } } } },
                    responses: { '200': { description: 'Updated' } }
                },
                delete: {
                    summary: 'Delete cliente',
                    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                    responses: { '204': { description: 'Deleted' } }
                }
            },
            '/usuarios': {
                post: {
                    summary: 'Register usuario',
                    requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Usuario' } } } },
                    responses: { '201': { description: 'Created', content: { 'application/json': { schema: { $ref: '#/components/schemas/Usuario' } } } } }
                },
                get: {
                    summary: 'List usuarios',
                    responses: { '200': { description: 'OK', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Usuario' } } } } } }
                }
            },
            '/usuarios/{id}': {
                get: {
                    summary: 'Get usuario by id',
                    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                    responses: { '200': { description: 'OK', content: { 'application/json': { schema: { $ref: '#/components/schemas/Usuario' } } } } }
                },
                delete: {
                    summary: 'Delete usuario',
                    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                    responses: { '204': { description: 'Deleted' } }
                }
            },
            '/produto': {
                post: {
                    summary: 'Create produto',
                    requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Produto' } } } },
                    responses: { '201': { description: 'Created', content: { 'application/json': { schema: { $ref: '#/components/schemas/Produto' } } } } }
                },
                get: {
                    summary: 'List produtos',
                    responses: { '200': { description: 'OK', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Produto' } } } } } }
                }
            },
            '/produto/{id}': {
                get: {
                    summary: 'Get produto by id',
                    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                    responses: { '200': { description: 'OK', content: { 'application/json': { schema: { $ref: '#/components/schemas/Produto' } } } } }
                },
                put: {
                    summary: 'Update produto',
                    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                    requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Produto' } } } },
                    responses: { '200': { description: 'Updated' } }
                },
                delete: {
                    summary: 'Delete produto',
                    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                    responses: { '204': { description: 'Deleted' } }
                }
            },
            '/venda': {
                post: {
                    summary: 'Create venda',
                    requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Venda' } } } },
                    responses: { '201': { description: 'Created', content: { 'application/json': { schema: { $ref: '#/components/schemas/Venda' } } } } }
                },
                get: {
                    summary: 'List vendas',
                    responses: { '200': { description: 'OK', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Venda' } } } } } }
                }
            },
            '/venda/{id}': {
                get: {
                    summary: 'Get venda by id',
                    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                    responses: { '200': { description: 'OK', content: { 'application/json': { schema: { $ref: '#/components/schemas/Venda' } } } } }
                },
                delete: {
                    summary: 'Delete venda',
                    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                    responses: { '204': { description: 'Deleted' } }
                }
            },
            '/contas': {
                post: {
                    summary: 'Create conta',
                    requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Conta' } } } },
                    responses: { '201': { description: 'Created', content: { 'application/json': { schema: { $ref: '#/components/schemas/Conta' } } } } }
                },
                get: {
                    summary: 'List contas',
                    responses: { '200': { description: 'OK', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Conta' } } } } } }
                }
            },
            '/contas/{id}': {
                get: {
                    summary: 'Get conta by id',
                    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                    responses: { '200': { description: 'OK', content: { 'application/json': { schema: { $ref: '#/components/schemas/Conta' } } } } }
                },
                put: {
                    summary: 'Update conta',
                    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                    requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Conta' } } } },
                    responses: { '200': { description: 'Updated' } }
                },
                delete: {
                    summary: 'Delete conta',
                    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                    responses: { '204': { description: 'Deleted' } }
                },
                post: {
                    // deposit endpoint is separate in router: /contas/{id}/depositar - kept below
                }
            },
            '/contas/{id}/depositar': {
                post: {
                    summary: 'Deposit into conta',
                    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                    requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', properties: { valor: { type: 'number', format: 'float' } }, required: ['valor'] } } } },
                    responses: { '200': { description: 'Deposited', content: { 'application/json': { schema: { $ref: '#/components/schemas/Conta' } } } } }
                }
            }
        }
    },
    apis: [
        './router/cliente_router.js',
        './router/conta_router.js',
        './router/fornecedor_router.js',
        './router/produto_router.js',
        './router/categoria_router.js',
        './router/venda_router.js',
        './router/usuario_router.js'
    ]
};

const specs = swaggerJsdoc(options);
module.exports = specs;
