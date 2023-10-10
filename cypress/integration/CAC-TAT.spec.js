import { slowCypressDown } from "cypress-slow-down";
slowCypressDown(500);
// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

/// <reference types="Cypress" />

describe("Central de Atendimento ao Cliente TAT", function () {
  beforeEach(function () {
    cy.visit("./src/index.html");
  });
  it("verifica o título da aplicação", function () {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });
  it("preenche os campos obrigatórios e envia o formulário", function () {
    const longText =
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi impedit at possimus distinctio ad veniam aspernatur, consectetur modi officia consequuntur? Aliquid laborum a maiores dolorum porro fugit voluptatibus architecto esse?";
    cy.get("#firstName").type("Pierre");
    cy.get("#lastName").type("Souza");
    cy.get("#email").type("Pierre@exemplo.com");
    cy.get("#open-text-area").type(longText, { delay: 0 });
    cy.get(".button[type=submit]").click();

    cy.get(".success").should("be.visible");
  });
  it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", function () {
    cy.get("#firstName").type("Pierre");
    cy.get("#lastName").type("Souza");
    cy.get("#email").type("Pierre,exemplo.com");
    cy.get("#open-text-area").type("teste", { delay: 0 });
    cy.get(".button[type=submit]").click();
    cy.get(".error").should("be.visible");
  });
  it("Campo de telefone continua vazio quando preenchido com valor não-númerico", function () {
    cy.get("#phone").type("abcdefghj").should("have.value", "");
  });
  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", function () {
    cy.get("#firstName").type("Pierre");
    cy.get("#lastName").type("Souza");
    cy.get("#email").type("Pierre@exemplo.com");
    cy.get("#phone-checkbox").click();
    cy.get("#open-text-area").type("teste", { delay: 0 });
    cy.get(".button[type=submit]").click();

    cy.get(".error").should("be.visible");
  });
  it.only("preenche e limpa os campos nome, sobrenome, email e telefone", function () {
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
});