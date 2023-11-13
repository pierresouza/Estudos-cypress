describe("Central de Atendimento ao Cliente TAT", function () {
  const THREE_SECONDS_IN_MS = 3000;
  beforeEach(function () {
    cy.visit("./src/index.html");
  });
  it("verifica o título da aplicação", function () {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });
  it("preenche os campos obrigatórios e envia o formulário", function () {
    const longText =
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi impedit at possimus distinctio ad veniam aspernatur, consectetur modi officia consequuntur? Aliquid laborum a maiores dolorum porro fugit voluptatibus architecto esse?";

    cy.clock();
    cy.get("#firstName").type("Pierre");
    cy.get("#lastName").type("Souza");
    cy.get("#email").type("Pierre@exemplo.com");
    cy.get("#open-text-area").type(longText, { delay: 0 });
    cy.contains(".button", "Enviar").click();

    cy.get(".success").should("be.visible");

    cy.tick(THREE_SECONDS_IN_MS);

    cy.get(".success").should("not.be.visible");
  });
  it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", function () {
    cy.clock();

    cy.get("#firstName").type("Pierre");
    cy.get("#lastName").type("Souza");
    cy.get("#email").type("Pierre,exemplo.com");
    cy.get("#open-text-area").type("teste", { delay: 0 });
    cy.contains(".button", "Enviar").click();

    cy.get(".error").should("be.visible");

    cy.tick(THREE_SECONDS_IN_MS);

    cy.get(".error").should("not.be.visible");
  });
  it("Campo de telefone continua vazio quando preenchido com valor não-númerico", function () {
    cy.get("#phone").type("abcdefghj").should("have.value", "");
  });
  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", function () {
    cy.clock();
    cy.get("#firstName").type("Pierre");
    cy.get("#lastName").type("Souza");
    cy.get("#email").type("Pierre@exemplo.com");
    cy.get("#phone-checkbox").check().should("be.checked");
    cy.get("#open-text-area").type("teste", { delay: 0 });
    cy.contains(".button", "Enviar").click();

    cy.get(".error").should("be.visible");

    cy.tick(THREE_SECONDS_IN_MS);
    cy.get(".error").should("not.be.visible");
  });
  it("preenche e limpa os campos nome, sobrenome, email e telefone", function () {
    cy.get("#firstName")
      .type("Pierre")
      .should("have.value", "Pierre")
      .clear()
      .should("have.value", "");
    cy.get("#lastName")
      .type("Souza")
      .should("have.value", "Souza")
      .clear()
      .should("have.value", "");
    cy.get("#email")
      .type("pierre@exemplo.com")
      .should("have.value", "pierre@exemplo.com")
      .clear()
      .should("have.value", "");
    cy.get("#phone")
      .type(11987299382)
      .should("have.value", "11987299382")
      .clear()
      .should("have.value", "");
  });
  it("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatório", function () {
    cy.clock();
    cy.contains(".button", "Enviar").click();
    cy.get(".error").should("be.visible");

    cy.tick(THREE_SECONDS_IN_MS);

    cy.get(".error").should("not.be.visible");
  });
  it("Envia o formulário com sucesso usando um comando customizado", function () {
    cy.fillMandatoryFieldsAndSubmit();

    cy.get(".success").should("be.visible");
  });

  it("Seleciona um produto(Youtube) por seu texto", function () {
    cy.get("#product").select("youtube").should("have.value", "youtube");
  });
  it("Seleciona um produto(Mentoria) por seu texto", function () {
    cy.get("#product").select("mentoria").should("have.value", "mentoria");
  });
  it("Seleciona um produto(Blog) por seu texto", function () {
    cy.get("#product").select(1).should("have.value", "blog");
  });

  it("marca cada tipo de atendimento", function () {
    cy.get("input[type=radio][value=ajuda]").check().should("be.checked");
    cy.get("input[type=radio][value=elogio]").check().should("be.checked");
    cy.get("input[type=radio][value=feedback]").check().should("be.checked");
  });

  it('marca o tipo de atendimento "Feedback"', function () {
    cy.get('input[type="radio"][value=feedback]').check().should("be.checked");
  });

  it("marca ambos checkboxes, depois desmarca o último", function () {
    cy.get('input[type="checkbox"]')
      .check()
      .should("be.checked")
      .last()
      .uncheck()
      .should("not.be.checked");
  });

  it("Seleciona um arquivo da pasta fixtures", function () {
    cy.get("input[type='file']")
      .should("not.have.value")
      .selectFile("cypress/fixtures/example.json")
      .should(function ($input) {
        console.log($input);
        expect($input[0].files[0].name).to.equal("example.json");
      });
  });

  it("seleciona um arquivo simulando um drag-and-drop", function () {
    cy.get("input[type='file'")
      .should("not.have.value")
      .selectFile("cypress/fixtures/example.json", { action: "drag-drop" })
      .should(function ($input) {
        console.log($input);
        expect($input[0].files[0].name).to.equal("example.json");
      });
  });
  it("Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias", function () {
    cy.fixture("example.json").as("sampleFile");
    cy.get('input[type="file"]').selectFile("@sampleFile");
  });

  it("verifica que a política de privacidade abre em outra aba sem a necessidade de um clique", function () {
    cy.get("#privacy a").should("have.attr", "target", "_blank");
  });

  it("acessa a página da política de privacidade removendo o target e então clicando no link", function () {
    cy.get("#privacy a").invoke("removeAttr", "target").click();

    cy.contains("Talking About Testing").should("be.visible");
  });
});
