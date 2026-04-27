test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json(); //Nessa linha de texto ele procura a response do index.js e aloca no responseBody
  expect(responseBody.updated_at).toBeDefined(); //Já aqui ele espera que o responseBody seja definido usando o comparador toBeDefined, que verifica se foi iniciado, se foi DEFINIDO, mesmo ele sendo null, false ou uma string vazia tipo " "
  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString(); //Aqui é criado uma variável "parsedUpdatedAt" que gera a data de hoje no formato ISO 8601. E o motivo disso está na linha de baixo
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt); //Nessa linha ele compara e espera que a váriavel updateAt do index.js seja igual a variável criada na linha de cima.

  expect(responseBody.dependencies.database.version).toEqual("16.13");
  expect(responseBody.dependencies.database.max_connections).toEqual(100);
  expect(responseBody.dependencies.database.opened_connections).toEqual(1);
  //Minha explicação pode não estar exata, mas é uma forma simplificada de como interpretar o texto, então algumas formas podem estar simples demais, beirando estar errado.
  //O objetivo na verdade não era estar certo mas sim, explicar para alguém que não entende, como eu entendi :D
});
