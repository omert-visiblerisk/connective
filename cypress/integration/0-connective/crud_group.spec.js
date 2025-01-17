/// <reference types="cypress" />

describe("crud group", () => {
  beforeEach(() => {
    cy.visit("https://8080-gray-halibut-x0n7xsmr.ws-eu10.gitpod.io/")
    cy.get('[data-testid="email-input"]').type("test-coord@example.com")
    cy.get('[data-testid="password-input"]').type("Aa123456789")
    cy.get("form").submit()
  })

  it("should create a group", () => {
    cy.get('[data-testid="create-group"]').click()
    cy.get('[data-testid="name"]').type("NewGroup")
    cy.get('[data-testid="description"]').type("This is the group description")
    cy.get('[data-testid="activityOrder"]').parent().click()
    cy.get(".v-select-list").first().children().first().click()
    cy.get('[data-testid="submit-button"]').click()
    cy.url().should("contain", "/assign-group-students")
    cy.get('[data-testid="submit-button"]').click()
  })
})
