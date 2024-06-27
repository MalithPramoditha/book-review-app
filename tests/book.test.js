const request = require('supertest');
const app = require('../src/app'); // Adjust the path as per your project structure
const mongoose = require('mongoose');

// Mock MongoDB connection
beforeAll(async () => {
  await mongoose.connect('mongodb+srv://malithpramoditha107:cSBjhlTFnuBgcKUS@bookreview.fazbmep.mongodb.net/?retryWrites=true&w=majority&appName=bookreview', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// Clear the test database after each test
afterEach(async () => {
  await mongoose.connection.dropDatabase();
});

// Close the MongoDB connection after all tests
afterAll(async () => {
  await mongoose.connection.close();
});

describe('Book API', () => {
  it('should create a new book', async (done) => {
    const res = await request(app)
      .post('/api/books')
      .send({
        title: 'Test Book 1',
        author: 'Test Author 1',
        rating: 4,
        review: 'This is a test review.'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    done();
  });

  it('should get all books', async (done) => {
    await request(app)
      .post('/api/books')
      .send({
        title: 'Test Book 2',
        author: 'Test Author 2',
        rating: 4,
        review: 'This is a test review.'
      });

    const res = await request(app).get('/api/books');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(1);
    done();
  });

  it('should update a book', async (done) => {
    const createRes = await request(app)
      .post('/api/books')
      .send({
        title: 'Test Book 3',
        author: 'Test Author 3',
        rating: 4,
        review: 'This is a test review.'
      });

    const updateRes = await request(app)
      .patch(`/api/books/${createRes.body._id}`)
      .send({
        title: 'Updated Test Book 3'
      });

    expect(updateRes.statusCode).toEqual(200);
    expect(updateRes.body.title).toEqual('Updated Test Book 3');
    done();
  });

  it('should delete a book', async (done) => {
    const createRes = await request(app)
      .post('/api/books')
      .send({
        title: 'Test Book 4',
        author: 'Test Author 4',
        rating: 4,
        review: 'This is a test review.'
      });

    const deleteRes = await request(app)
      .delete(`/api/books/${createRes.body._id}`);

    expect(deleteRes.statusCode).toEqual(200);
    expect(deleteRes.body.message).toEqual('Deleted Book');
    done();
  });
});
