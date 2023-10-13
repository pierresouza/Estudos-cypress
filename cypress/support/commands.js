Cypress.Commands.add("fillMandatoryFieldsAndSubmit", function () {
    cy.get("#firstName").type("Pierre");
    cy.get("#lastName").type("Souza");
    cy.get("#email").type("Pierre@exemplo.com");
    cy.get("#open-text-area").type("teste");
    cy.contains(".button","Enviar").click();
})