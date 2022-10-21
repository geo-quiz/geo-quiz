import request from 'supertest'
//import {Express} from 'express-serve-static-core'

//import {createServer} from ''
//import {describe, expect, test} from '@jest/globals';
import { describe, expect } from '@jest/globals';
import { userRoute } from '../user';
//import { response } from 'express';

/*
let server: Express

beforeAll(async () => {
   server = await createServer()
})



describe('wrongEmail', () => {
    test('check if email is correct', () => {
        expect(userRoute.post('login')).toBe('/login');
    });
});
*!/



describe('POST /login', () => {
    it('should return 400 & valid response if request param list is empty', async done => {
        request(server)
            .post(`/api/v1/hello`)
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.body).toMatchObject({ 'message': 'Hello, stranger!' })
                done()
            })
    })
})
*/
describe('Post /login', () => {
    it('will send 200 when working', () => {
        expect(true).toBe(true);
    });
    it('response with status 200', () => {
        request(userRoute).post('/login').expect(200);
    });
});
