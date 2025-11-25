const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Cantina API',
            version: '1.0.0',
            description: 'API para gerenciamento de cantina',
            contact: {
                name: 'Francisco Rech, Dimitri Blorow',
                email: 'support@cantina.com'
            }
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development server'
            }
        ],
        components: {
            schemas: {
                Cliente: {
                    type: 'object',
                    required: ['nome', 'email', 'matricula'],
                    properties: {
                        id: {
                            type: 'integer',
                            description: 'Client ID'
                        },
                        nome: {
                            type: 'string',
                            description: 'Client name'
                        },
                        email: {
                            type: 'string',
                            description: 'Client email'
                        },
                        matricula: {
                            type: 'string',
                            description: 'Client registration number'
                        }
                    }
                },
                Conta: {
                    type: 'object',
                    required: ['cliente_id', 'saldo'],
                    properties: {
                        id: {
                            type: 'integer',
                            description: 'Account ID'
                        },
                        cliente_id: {
                            type: 'integer',
                            description: 'Associated client ID'
                        },
                        saldo: {
                            type: 'number',
                            format: 'float',
                            description: 'Account balance'
                        }
                    }
                },
                Fornecedor: {
                    type: 'object',
                    required: ['cnpj', 'nome', 'telefone'],
                    properties: {
                        id: {
                            type: 'integer',
                            description: 'Supplier ID'
                        },
                        cnpj: {
                            type: 'string',
                            description: 'CNPJ of the supplier'
                        },
                        nome: {
                            type: 'string',
                            description: 'Supplier name'
                        },
                        telefone: {
                            type: 'string',
                            description: 'Supplier phone number'
                        }
                    }
                }
            }
        }
    },
    apis: [
        './router/cliente_router.js',
        './router/conta_router.js',
        './router/fornecedor_router.js'
    ]
};

const specs = swaggerJsdoc(options);
module.exports = specs;
