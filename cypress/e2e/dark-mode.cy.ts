// cypress/e2e/dark-mode.cy.ts
describe('Dark Mode', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should toggle dark mode', () => {
    cy.get('html').should('not.have.class', 'dark')
    cy.get('[data-cy="theme-toggle"]').click()
    cy.get('html').should('have.class', 'dark')
  })
})