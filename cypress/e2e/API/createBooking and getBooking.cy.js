import { faker } from '@faker-js/faker';

describe('Booking API Tests', () => {
    let token;
    let bookingId;

    before(() => {
        cy.request({
            method: 'POST',
            url: 'https://restful-booker.herokuapp.com/auth',
            body: {
                "username": "admin",
                "password": "password123"
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            token = response.body.token;
        });
    });

    it('Create Booking request', () => {
        const firstName = faker.name.firstName();
        const lastName = faker.name.lastName();

        cy.request({
            method: 'POST',
            url: 'https://restful-booker.herokuapp.com/booking',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: {
                "firstname": firstName,
                "lastname": lastName,
                "totalprice": 111,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2018-01-01",
                    "checkout": "2019-01-01"
                },
                "additionalneeds": "Breakfast"
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('bookingid');

            bookingId = response.body.bookingid;
            Cypress.env('bookingId', bookingId);

            expect(response.body.booking).to.have.property('firstname', firstName);
            expect(response.body.booking).to.have.property('lastname', lastName);
        });
    });

    it('Get Booking request', () => {

        expect(bookingId).to.exist;

        cy.request({
            method: 'GET',
            url: `https://restful-booker.herokuapp.com/booking/${bookingId}`,
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('firstname');
            expect(response.body).to.have.property('lastname');
            expect(response.body.additionalneeds).to.eq("Breakfast");
        });
    });
});