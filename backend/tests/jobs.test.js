const app = require('../app');
const request = require('supertest');

describe('Job API tests', () => {

    it('should create a new job', async () => {
        const newJob = {
            position: 'software engineer',
            company: 'OpenAI',
            status: 'applied'
        };

        const res = await request(app)
        .post('/api/applications')
        .send(newJob);
        
        expect(res.body.position).toBe('software engineer');
    });
})