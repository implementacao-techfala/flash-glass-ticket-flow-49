
# Deploy Instructions

## Para GitHub:
1. Crie um novo repositório no GitHub
2. Faça push de todo o código incluindo os novos arquivos Docker
3. Certifique-se de incluir: Dockerfile, docker-compose.yml, nginx.conf

## Para Portainer:
1. No Portainer, vá em "Stacks"
2. Clique em "Add stack"
3. Escolha "Git repository"
4. Cole a URL do seu repositório GitHub
5. Defina o nome da stack como "support-form"
6. Clique em "Deploy the stack"

## Para testar localmente:
```bash
# Construir e rodar
docker-compose up --build

# Acessar em http://localhost:3000
```

## Comandos úteis:
```bash
# Ver logs
docker-compose logs -f

# Parar aplicação
docker-compose down

# Rebuild completo
docker-compose down && docker-compose up --build
```

## Portas expostas:
- Aplicação: 3000 (mapeada para porta 80 do container)

## Observações:
- Este é um frontend React que não precisa de banco de dados
- O webhook já está configurado para enviar dados para o endpoint externo
- A aplicação é totalmente funcional como está
