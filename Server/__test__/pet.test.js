const request = require('supertest') // seperti axios
const app = require('../app')
const { signToken } = require('../helpers/jwt')
const { hash } = require('../helpers/bcrypt')
const { sequelize } = require('../models')

let access_token;
beforeAll(async () => {
    try {
      const users = require('../data/users.json');
      users.forEach(el => {
        el.password = hash(el.password);  // Hashing password
        el.updatedAt = el.createdAt = new Date();  // Set timestamps
      });
  
      const pets = require('../data/pets.json');
      pets.forEach(el => {
        el.updatedAt = el.createdAt = new Date();  // Set timestamps
      });
  
      const species = require('../data/species.json');
      species.forEach(el => {
        el.updatedAt = el.createdAt = new Date();  // Set timestamps
      });
  
      const shelters = require('../data/shelters.json');
      shelters.forEach(el => {
        el.updatedAt = el.createdAt = new Date();  // Set timestamps
      });
  
      // Seed the data
      await sequelize.queryInterface.bulkInsert('Shelters', shelters, {});
      await sequelize.queryInterface.bulkInsert('Users', users, {});
      await sequelize.queryInterface.bulkInsert('Species', species, {});
      await sequelize.queryInterface.bulkInsert('Pets', pets, {});
  
      // Generate access token
      const payload = {
        id: 1,
        email: 'admin@example.com',
        role: 'Admin'
      };
  
      access_token = signToken(payload);
    } catch (error) {
      console.error(error);
    }
  });
  
  afterAll(async () => {
    try {
      // Clean up the database after tests
      await sequelize.queryInterface.bulkDelete('Shelters', null, { truncate: true, cascade: true, restartIdentity: true });
      await sequelize.queryInterface.bulkDelete('Users', null, { truncate: true, cascade: true, restartIdentity: true });
      await sequelize.queryInterface.bulkDelete('Species', null, { truncate: true, cascade: true, restartIdentity: true });
      await sequelize.queryInterface.bulkDelete('Pets', null, { truncate: true, cascade: true, restartIdentity: true });
    } catch (error) {
      console.error(error);
    }
  });
  


// .set => untuk ngeset headers
describe('GET /pets', () => {
    describe('GET /pets - succeed', () => {
        it('should be return of array of object instance data pets', async () => {
            const response = await request(app)
                .get('/pets')
                .set('Authorization', `Bearer ${access_token}`)

            expect(response.status).toBe(200) // testing untuk codenya
            expect(response.body).toBeInstanceOf(Object) // testing untuk isinya
            expect(response.body).toHaveProperty('message')
            expect(response.body).toHaveProperty('data', expect.any(Array))
            expect(response.body.data.length).toBeGreaterThan(0)
        })
    })

    describe('GET /pets - fail', () => {
        // error kalo belom login / gaada token
        it('should be return an object with error message', async () => {
            const response = await request(app)
                .get('/pets')

            expect(response.status).toBe(401) // testing untuk codenya
            expect(response.body).toBeInstanceOf(Object) // testing untuk isinya
            expect(response.body).toHaveProperty('message', expect.any(String))
        })

        // error kalo tokennya salah
        it('should be return an object with error message', async () => {
            const response = await request(app)
                .get('/events')
                .set('Authorization', `Bearer blablabla`)

            expect(response.status).toBe(401) // testing untuk codenya
            expect(response.body).toBeInstanceOf(Object) // testing untuk isinya
            expect(response.body).toHaveProperty('message', expect.any(String))
        })
    })

    describe('POST /pets', () => {
        describe('POST /pets - succeed', () => {
            it('should return an object with message', async () => {
                const body = { name: "Testing", age: 1, breed: "Testing Aja", description: "test", imageUrl: "https://test123.com", speciesId: 6, shelterId: 1 }
                const response = await request(app)
                    .post('/pets')
                    .set('Authorization', `Bearer ${access_token}`)
                    .send(body)
                    
                expect(response.status).toBe(201)
                expect(response.body).toHaveProperty('message', expect.any(String))
            }) 
        })
    
        describe('POST /pets - failed', () => {
            it('failed to create because not logged in yet', async () => {
                const body = { name: "Testing", age: 1, breed: "Testing Aja", description: "test", imageUrl: "https://test123.com", speciesId: 6, shelterId: 1 }
                const response = await request(app)
                    .post('/pets')
                    .send(body)
                    // console.log(response);
                    
                expect(response.status).toBe(401)
                expect(response.body).toHaveProperty('message', expect.any(String))
            }) 
        })
    
        describe('POST /pets - failed', () => {
            it('token is not valid', async () => {
                const body = { name: "Testing", age: 1, breed: "Testing Aja", description: "test", imageUrl: "https://test123.com", speciesId: 6, shelterId: 1 }
                const response = await request(app)
                    .post('/pets')
                    .set('Authorization', ``)
                    .send(body)
                    // console.log(response);
                    
                expect(response.status).toBe(401)
                expect(response.body).toHaveProperty('message', expect.any(String))
            }) 
        })
    
        describe('POST /pets - failed', () => {
            it('error validation required', async () => {
                const body = { title: null, synopsis: "Testing Aja", trailerUrl: "https://test.com", imgUrl: "https://test123.com", rating: 0, genreId: 1 }
                const response = await request(app)
                    .post('/pets')
                    .set('Authorization', `Bearer ${access_token}`)
                    .send(body)
                    // console.log(response);
                    
                expect(response.status).toBe(400)
                expect(response.body).toHaveProperty('message', expect.any(String))
            }) 
        })
    })
    
})