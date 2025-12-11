# 🌦️ GDASH - Desafio de Clima 2025/02

Sistema de coleta, processamento e visualização de dados climáticos usando uma arquitetura full-stack moderna.

## 🏗️ Arquitetura

```
Coletor Python → RabbitMQ → Worker Go → MongoDB ← API NestJS ← Dashboard React
```

## 🚀 Início Rápido

### Pré-requisitos
- Docker & Docker Compose
- Node.js 20+ (para desenvolvimento local)
- Python 3.11+ (para desenvolvimento local)
- Go 1.21+ (para desenvolvimento local)

### Executar com Docker

```bash
# Clone seu fork
git clone https://github.com/SEU-USERNAME/desafio-gdash-2025-02.git
cd desafio-gdash-2025-02

# Inicie todos os serviços
docker-compose up --build

# Serviços em execução:
# - Frontend: http://localhost:5173
# - API Backend: http://localhost:3000
# - Documentação API: http://localhost:3000/api/docs
# - RabbitMQ: http://localhost:15672 (admin/admin123)
```

### Credenciais de Login

```
Email: admin@example.com
Senha: 123456
```

## 📁 Estrutura do Projeto

```
.
├── backend/              # API NestJS
│   ├── src/
│   │   ├── auth/        # Autenticação & JWT
│   │   ├── users/       # Gerenciamento de usuários
│   │   ├── weather/     # Endpoints de dados climáticos
│   │   ├── export/      # Exportação CSV/XLSX
│   │   ├── schemas/     # Schemas MongoDB
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── package.json
│   ├── tsconfig.json
│   ├── Dockerfile
│   └── .env.example
│
├── frontend/            # React + Vite
│   ├── src/
│   │   ├── App.jsx      # Componente principal do dashboard
│   │   ├── main.jsx     # Ponto de entrada
│   │   └── index.css    # Estilos
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── Dockerfile
│
├── python-collector/    # Coletor de dados climáticos
│   ├── collector.py     # Integração com API Open-Meteo
│   ├── requirements.txt
│   └── Dockerfile
│
├── go-worker/          # Processador de fila de mensagens
│   ├── main.go         # Consumidor RabbitMQ e saver MongoDB
│   ├── go.mod
│   ├── go.sum
│   └── Dockerfile
│
├── docker-compose.yml  # Configuração completa da infraestrutura
└── README.md           # Este arquivo
```

## 🔑 Funcionalidades

- ✅ **Autenticação JWT** - Gerenciamento seguro de login e tokens
- ✅ **Dados de Clima em Tempo Real** - Coletados da API Open-Meteo a cada hora
- ✅ **Fila de Mensagens** - RabbitMQ para processamento assíncrono
- ✅ **Armazenamento MongoDB** - Dados persistentes com Mongoose ODM
- ✅ **Insights de Clima** - Análise e estatísticas com IA
- ✅ **Exportação de Dados** - Funcionalidade de export CSV e XLSX
- ✅ **Dashboard Responsivo** - UI moderna com React e Vite
- ✅ **Documentação da API** - Docs Swagger/OpenAPI
- ✅ **Containerização Docker** - Stack completo em containers
- ✅ **Padrão Worker** - Processador baseado em Go para escalabilidade

## 📊 Endpoints da API

### Autenticação
- `POST /auth/register` - Registrar novo usuário
- `POST /auth/login` - Login e receber token JWT

### Dados Climáticos
- `GET /weather` - Listar registros climáticos (paginado)
- `GET /weather/insights` - Obter insights e estatísticas de clima

### Exportação de Dados
- `GET /export/csv` - Exportar dados climáticos como CSV
- `GET /export/xlsx` - Exportar dados climáticos como Excel

### Gerenciamento de Usuários
- `GET /users` - Listar todos os usuários (requer autenticação)
- `GET /users/:id` - Obter usuário por ID (requer autenticação)

**Documentação completa disponível em**: http://localhost:3000/api/docs

## 🛠️ Stack de Tecnologias

### Backend
- **Framework**: NestJS 10+
- **Linguagem**: TypeScript
- **Banco de Dados**: MongoDB 7.0 com Mongoose
- **Autenticação**: JWT (Passport)
- **Documentação API**: Swagger/OpenAPI
- **Runtime**: Node.js 20

### Frontend
- **Framework**: React 18
- **Ferramenta de Build**: Vite 5
- **Cliente HTTP**: Axios
- **Estilos**: CSS3

### Pipeline de Dados
- **Linguagem**: Python 3.11
- **API**: Open-Meteo (dados climáticos gratuitos)
- **Bibliotecas**: requests, pika, python-dotenv

### Fila de Mensagens & Processamento
- **Broker**: RabbitMQ 3.12
- **Worker**: Go 1.21
- **Bibliotecas**: amqp091-go, mongo-go-driver

### Infraestrutura
- **Containerização**: Docker & Docker Compose
- **Orquestração**: Docker Compose

## 🔄 Fluxo de Dados

1. **Coletor Python** (a cada 1 hora)
   - Busca dados climáticos da API Open-Meteo
   - Envia mensagens para a fila RabbitMQ

2. **RabbitMQ** (Message Broker)
   - Armazena mensagens durável
   - Garante entrega aos consumidores

3. **Worker Go** (Contínuo)
   - Consome mensagens da fila
   - Salva dados no MongoDB
   - Implementa lógica de retry

4. **API NestJS**
   - Fornece endpoints para dados climáticos
   - Gera insights e estatísticas
   - Gerencia autenticação
   - Exporta dados em múltiplos formatos

5. **Dashboard React**
   - Exibe dados climáticos em tempo real
   - Mostra insights e análises
   - Permite exportação de dados
   - Interface de autenticação de usuário

## 📦 Variáveis de Ambiente

### Backend (.env)
```
DATABASE_URL=mongodb://admin:admin123@mongodb:27017/gdash?authSource=admin
JWT_SECRET=sua-chave-jwt-super-secreta-mude-em-producao
RABBITMQ_URL=amqp://admin:admin123@rabbitmq:5672
PORT=3000
```

### Coletor Python (.env)
```
RABBITMQ_URL=amqp://admin:admin123@rabbitmq:5672
```

### Worker Go (.env)
```
DATABASE_URL=mongodb://admin:admin123@mongodb:27017/gdash?authSource=admin
RABBITMQ_URL=amqp://admin:admin123@rabbitmq:5672
```

## 🚀 Guia de Desenvolvimento

### Setup Local (sem Docker)

#### Backend
```bash
cd backend
npm install
npm run start:dev
# Disponível em http://localhost:3000
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
# Disponível em http://localhost:5173
```

#### Coletor Python
```bash
cd python-collector
pip install -r requirements.txt
python collector.py
```

#### Worker Go
```bash
cd go-worker
go mod download
go run main.go
```

### Banco de Dados & Fila de Mensagens (Docker)
```bash
# Inicie apenas MongoDB e RabbitMQ
docker-compose up mongodb rabbitmq
```

## 🧪 Testando com Docker

### Inicie o stack
```bash
docker-compose up --build
```

### Aguarde os serviços
Todos os serviços devem estar saudáveis (verifique os logs)

### Acesse as aplicações
- **Dashboard**: http://localhost:5173
- **API**: http://localhost:3000
- **Docs API**: http://localhost:3000/api/docs
- **Gerenciamento RabbitMQ**: http://localhost:15672

### Teste o login
```
Email: admin@example.com
Senha: 123456
```

### Monitore serviços
```bash
# Veja logs de um serviço específico
docker-compose logs -f backend

# Veja todos os logs
docker-compose logs -f

# Pare todos os serviços
docker-compose down

# Remova volumes
docker-compose down -v
```

## 📈 Performance & Escalabilidade

- **Processamento Assíncrono**: RabbitMQ permite ingestão sem bloqueio
- **Padrão Worker**: Worker Go pode ser escalado horizontalmente
- **Connection Pooling**: Conexões MongoDB em pool
- **Paginação**: Endpoints de dados climáticos suportam paginação
- **Pronto para Cache**: Arquitetura suporta integração Redis

## 🔐 Recursos de Segurança

- **Autenticação JWT**: Auth stateless e escalável
- **Hash de Senha**: Planejado (adicionar bcrypt)
- **CORS Habilitado**: Requisições cross-origin configuradas
- **Variáveis de Ambiente**: Dados sensíveis em .env
- **Rate Limiting**: Pronto para integração

## 📝 Logging & Monitoramento

Serviços registram em console com timestamps:
- Requisições e respostas de API
- Operações de banco de dados
- Mensagens de fila
- Processamento do worker

Monitore com: `docker-compose logs [nome-do-serviço]`

## 🐛 Solução de Problemas

### Serviços não iniciam
```bash
# Verifique logs
docker-compose logs

# Remova containers e volumes antigos
docker-compose down -v
docker-compose up --build
```

### Conexão MongoDB recusada
- Certifique-se que MongoDB está saudável: `docker-compose ps`
- Aguarde alguns segundos para MongoDB inicializar
- Verifique URL de conexão nas variáveis de ambiente

### Fila RabbitMQ vazia
- Verifique se coletor Python está executando: `docker-compose logs python-collector`
- Verifique logs do worker Go: `docker-compose logs go-worker`
- Envie mensagem de teste manualmente via UI RabbitMQ

### Frontend não consegue acessar API
- Certifique-se que backend está rodando: `docker-compose logs backend`
- Verifique configuração de proxy em `frontend/vite.config.js`
- Verifique se CORS está habilitado no backend

## 📊 Dashboard de Monitoramento

Acesse Gerenciamento RabbitMQ:
- **URL**: http://localhost:15672
- **Usuário**: admin
- **Senha**: admin123

Monitore:
- Profundidade da fila
- Mensagens enviadas/recebidas
- Conexões do consumidor
- Saúde dos nós

## 🎥 Vídeo de Demonstração

**Vídeo de Demonstração (até 5 minutos):**

O vídeo deve incluir:
- Login funcionando
- Dashboard com dados climáticos
- Insights gerados
- Exportação de dados
- Arquitetura geral da aplicação

> [Adicione o link do seu vídeo aqui]

---

## 🚢 Deployment

O projeto está pronto para deployment em:
- **Kubernetes** (adicione manifests k8s)
- **Docker Swarm**
- **AWS ECS**
- **Google Cloud Run**
- **Azure Container Instances**

Basta usar as imagens Docker e configuração docker-compose como referência.

## 🤝 Contribuindo

1. Faça um Fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adicionar MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📞 Suporte

Para problemas e dúvidas:
1. Verifique issues existentes no GitHub
2. Crie uma nova issue com descrição detalhada
3. Inclua logs e mensagens de erro

---

**Feliz Rastreamento de Clima! 🌦️⚡**

*Última atualização: 11 de dezembro de 2025*
