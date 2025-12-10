# Trabalho1 API

## Overview
Trabalho1 API is an Express.js application that provides a RESTful API for managing suppliers, clients, accounts, users, sales, and products. The API is documented using Swagger, making it easy to understand and interact with.

## Project Structure
```
trabalho1_api
├── index.js                # Entry point of the application
├── router                  # Contains route definitions
│   ├── fornecedor_router.js # Routes for managing suppliers
│   ├── cliente_router.js    # Routes for managing clients
│   ├── conta_router.js      # Routes for managing accounts
│   ├── usuario_router.js     # Routes for managing users
│   ├── venda_router.js      # Routes for managing sales
│   └── produto_router.js    # Routes for managing products
├── swagger.js              # Swagger specifications for API documentation
├── package.json            # npm configuration file
├── .env                    # Environment variables
├── .gitignore              # Files and directories to ignore by Git
└── README.md               # Project documentation
```

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd trabalho1_api
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Usage
1. Start the server:
   ```
   npm start
   ```
2. Access the API documentation at:
   ```
   http://localhost:3000/api-docs
   ```

## API Endpoints
- **Suppliers**: `/fornecedores`
- **Clients**: `/clientes`
- **Accounts**: `/contas`
- **Users**: `/usuarios`
- **Sales**: `/vendas`
- **Products**: `/produtos`

## Environment Variables
Create a `.env` file in the root directory and define your environment variables as needed.

## License
This project is licensed under the MIT License.