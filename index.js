const express = require("express");
const server = express();

server.use(express.json());

let customers = [
  { id: 1, name: "Dev Samurai", site: "http://devsamurai.com.br" },
  { id: 2, name: "Google", site: "http://google.com.br" },
  { id: 3, name: "Uol", site: "http://uol.com.br" },
];

// Fazendo uma consulta para trazer todos os customers.
server.get("/customers", (req, res) => {
  return res.json(customers);
});

// Fazendo uma consulta para trazer apenas o customers por id.
server.get("/customers/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const customer = customers.find((item) => item.id === id);
  const status = customer ? 200 : 404; // se o status existir é 200 se não é 404

  // como retornar o status
  return res.status(status).json(customer);
});

// Inserindo um novo customers usando o método http post.
server.post("/customers", (req, res) => {
  const { name, site } = req.body;
  const id = (customers[customers.length - 1]?.id || 0) + 1;
  const newCustomer = {
    id,
    name,
    site,
  };

  customers.push(newCustomer);
  return res.status(201).json(newCustomer);
});

// Atualizando um customers por id utilizando o método http put.
// utilizamos findeIndex para pegar o index do array customers e comparar com a id que queremos atualizar.
server.put("/customers/:id", (req, res) => {
   
    const id = parseInt(req.params.id);

    const {name, site} = req.body;
   
    const index = customers.findIndex(item => item.id === id);

    const status = index >=0 ? 200 : 400;

    if(index >= 0) {
       customers[index] ={id: parseInt(id), name, site};
    };

    return res.status(status).json(customers[index]);

  });

  // Excluindo um customers por id utilizando o método http delete. 

  server.delete("/customers/:id", (req, res) => {
   
    const id = parseInt(req.params.id);

    const {name, site} = req.body;
   
    const index = customers.findIndex(item => item.id === id);

    const status = index >=0 ? 200 : 400;

    if(index >= 0){
        customers.splice(index, 1)
    };

    return res.status(status).json();

  });

server.listen(3000);
