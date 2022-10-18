describe("Navigation", () => {
  it("should navigate to the collections page", () => {
    cy.visit("http://localhost:3000/");
    cy.get('a[href*="collections"]').click({ multiple: true });
    cy.url().should("include", "/collections");
    cy.wait(500);
    cy.get("h1").contains("COLLECTIONS PAGE");
  });
});

export {};
