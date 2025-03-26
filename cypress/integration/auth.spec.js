describe('Authentication', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Should display login button', () => {
    cy.contains('Login with Instagram').should('be.visible')
  })

  it('Should redirect to Instagram OAuth', () => {
    cy.contains('Login with Instagram').click()
    cy.url().should('include', 'api.instagram.com/oauth/authorize')
  })

  it('Should show error on failed login', () => {
    // Mock error response
    cy.intercept('POST', '/api/auth/instagram', {
      statusCode: 400,
      body: { error: 'Authentication failed' }
    })
    cy.contains('Login with Instagram').click()
    cy.contains('Login failed').should('be.visible')
  })
})
