// cypress/e2e/jukebox.cy.ts
describe('Jukebox AI', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should load the home page with sliders', () => {
    cy.get('[data-cy="audio-features"]').should('be.visible')
    cy.get('[type="range"]').should('have.length.at.least', 10)
  })

  it('should load song presets when clicked', () => {
    cy.contains('Shake It Off - Taylor Swift').click()
    cy.get('[data-cy="danceability"]').should('have.value', '0.646')
    cy.get('[data-cy="energy"]').should('have.value', '0.778')
  })

  it('should search by song name and show results', () => {
    cy.visit('/search')
    cy.get('[data-cy="search-input"]').type('Shake It Off{downArrow}{enter}')
      // .type({downArrow}{enter}).type()

    cy.get('[data-cy="search-results"]').should('be.visible')
    cy.contains('Taylor Swift').should('be.visible')
  })

  it('should show country distribution after clicking Show Location', () => {
    cy.get('[data-cy="show-location-btn"]').click()
    cy.get('[data-cy="response-chart"]').should('be.visible')
    // cy.get('[data-cy="chart-bars"]').should('have.length.at.least', 1)
  })
})