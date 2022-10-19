describe("Log the user", () => {
  it("should navigate to login page, pick google auth and log the user in, then redirect to homepage", () => {
    const email = Cypress.env("GOOGLE_EMAIL");
    const password = Cypress.env("GOOGLE_PW");

    cy.visit("http://localhost:3000/");
    cy.get("#account-dropdown-trigger").click();
    cy.get("[data-radix-collection-item] > div > span").click({
      multiple: true,
    });
    cy.get("form").within(() => {
      cy.contains("button", "Sign in with Google").click({ force: true });
    });
    cy.wait(500);
    cy.origin(
      "https://accounts.google.com",
      { args: { email } },
      ({ email }) => {
        cy.get("input[type=email]").type(email);
        cy.contains("button", "Înainte").click();
        // });
      }
    );
  });
});

export {};
// loginSelector: `button[href="${Cypress.env(
//   "SITE_NAME"
// )}/api/auth/signin/google"]`,
