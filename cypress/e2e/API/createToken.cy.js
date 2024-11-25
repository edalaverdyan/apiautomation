
describe('Test Herokuapp APIs', ()=> {

    it('Create token request', () => {

        cy.request({
            method: 'POST',
            url: 'https://restful-booker.herokuapp.com/auth',
            body: {
                "username": "admin",
                "password": "password123"
            },
        }).then((response) => {

            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('token');

        })
    })
})