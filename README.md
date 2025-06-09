# TelesCash - Requisitos e Regras


## RFs (Requisitos funcionais - O que o usuário poderá fazer dentro da aplicação) 

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível ( logado ) exibir o próprio perfil;
- [x] Deve ser possível ( logado ) criar categorias (alimentação, transporte, internet...);
- [ ] Deve ser possível ( logado ) cadastrar uma transação;
- [ ] Deve ser possível ( logado ) listar as transações;
- [ ] Deve ser possível ( logado ) listar as transações por categorias (alimentação, transporte, internet...);
- [ ] Deve ser possível ( logado ) listar as transações por tipo (despesa ou crédito);
- [ ] Deve ser possível ( logado ) exibir valor do saldo atual;
- [ ] (ADMIN) Deve ser possível excluir um usuário;




## RNs (Regras de negócio - Quais condições o usuário poderá fazer a ação na aplicação)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [ ] Um usuario não pode excluir outro usuario;
- [ ] Um usuário não pode cadastrar uma transação sem categoria;
- [ ] Um usuário não pode criar cadastrar uma transação sem tipo;



## RNFs (Requisitos não-funcionais - Aquilo que o cliente não consegue controlar, requisitos técnicos)

- [x] A senha do usuário precisa estar hasheada;
- [x] Os dados da aplicação precisam estar persistidos em um banco de dados PortgresSQL;
- [ ] Todas as listas de dados precisam estar paginadas com 10 itens por página;
- [x] O usuário deve ser identificado por um JWT (JSON Web Token);
