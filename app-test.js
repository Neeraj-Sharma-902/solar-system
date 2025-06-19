let mongoose = require("mongoose");
let server = require("./app");
let chai = require("chai");
let chaiHttp = require("chai-http");
const PlanetModel = mongoose.model('planets');


// Assertion 
chai.should();
chai.use(chaiHttp); 

describe('Planets API Suite', () => {

    before(async function() {
        // Set a longer timeout to allow for DB connection and seeding
        this.timeout(15000);

        // Set NODE_ENV to test
        process.env.NODE_ENV = 'test';

        // 1. Connect to the test database
        await mongoose.connect(process.env.MONGO_URI, {
            user: process.env.MONGO_USERNAME,
            pass: process.env.MONGO_PASSWORD,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDB connected for testing...");

        // 2. Clear the collection to ensure a clean slate for every test run
        await PlanetModel.deleteMany({});
        console.log("Cleared planets collection...");

        // 3. Seed the database with our test data
        const planetTestData = [
            { id: 1, name: 'Mercury', description: 'Smallest planet.' },
            { id: 2, name: 'Venus', description: 'Hottest planet.' },
            { id: 3, name: 'Earth', description: 'Our home.' },
            { id: 4, name: 'Mars', description: 'The Red Planet.' },
            { id: 5, name: 'Jupiter', description: 'Largest planet.' },
            { id: 6, name: 'Saturn', description: 'The ringed planet.' },
            { id: 7, name: 'Uranus', description: 'Tilted planet.' },
            { id: 8, name: 'Neptune', description: 'Farthest planet.' }
        ];
        await PlanetModel.insertMany(planetTestData);
        console.log("Seeded test data into planets collection.");
    });

    // --- TEARDOWN HOOK ---
    // This runs ONCE after all tests in this suite are finished
    after(async function() {
        // Clean up the database and close the connection to allow the process to exit
        await PlanetModel.deleteMany({});
        await mongoose.connection.close();
        console.log("MongoDB connection closed and collection cleaned.");
    });

    describe('Fetching Planet Details', () => {
        it('it should fetch a planet named Mercury', (done) => {
            let payload = {
                id: 1
            }
          chai.request(server)
              .post('/planet')
              .send(payload)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('id').eql(1);
                    res.body.should.have.property('name').eql('Mercury');
                done();
              });
        });

        it('it should fetch a planet named Venus', (done) => {
            let payload = {
                id: 2
            }
          chai.request(server)
              .post('/planet')
              .send(payload)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('id').eql(2);
                    res.body.should.have.property('name').eql('Venus');
                done();
              });
        });

        it('it should fetch a planet named Earth', (done) => {
            let payload = {
                id: 3
            }
          chai.request(server)
              .post('/planet')
              .send(payload)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('id').eql(3);
                    res.body.should.have.property('name').eql('Earth');
                done();
              });
        });
        it('it should fetch a planet named Mars', (done) => {
            let payload = {
                id: 4
            }
          chai.request(server)
              .post('/planet')
              .send(payload)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('id').eql(4);
                    res.body.should.have.property('name').eql('Mars');
                done();
              });
        });

        it('it should fetch a planet named Jupiter', (done) => {
            let payload = {
                id: 5
            }
          chai.request(server)
              .post('/planet')
              .send(payload)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('id').eql(5);
                    res.body.should.have.property('name').eql('Jupiter');
                done();
              });
        });

        it('it should fetch a planet named Satrun', (done) => {
            let payload = {
                id: 6
            }
          chai.request(server)
              .post('/planet')
              .send(payload)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('id').eql(6);
                    res.body.should.have.property('name').eql('Saturn');
                done();
              });
        });

        it('it should fetch a planet named Uranus', (done) => {
            let payload = {
                id: 7
            }
          chai.request(server)
              .post('/planet')
              .send(payload)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('id').eql(7);
                    res.body.should.have.property('name').eql('Uranus');
                done();
              });
        });

        it('it should fetch a planet named Neptune', (done) => {
            let payload = {
                id: 8
            }
          chai.request(server)
              .post('/planet')
              .send(payload)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('id').eql(8);
                    res.body.should.have.property('name').eql('Neptune');
                done();
              });
        });

        // it('it should fetch a planet named Pluto', (done) => {
        //     let payload = {
        //         id: 9
        //     }
        //   chai.request(server)
        //       .post('/planet')
        //       .send(payload)
        //       .end((err, res) => {
        //             res.should.have.status(200);
        //             res.body.should.have.property('id').eql(9);
        //             res.body.should.have.property('name').eql('Sun');
        //         done();
        //       });
        // });


    });        
});

//Use below test case to achieve coverage
describe('Testing Other Endpoints', () => {

    describe('it should fetch OS Details', () => {
        it('it should fetch OS details', (done) => {
          chai.request(server)
              .get('/os')
              .end((err, res) => {
                    res.should.have.status(200);
                done();
              });
        });
    });

    describe('it should fetch Live Status', () => {
        it('it checks Liveness endpoint', (done) => {
          chai.request(server)
              .get('/live')
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('status').eql('live');
                done();
              });
        });
    });

    describe('it should fetch Ready Status', () => {
        it('it checks Readiness endpoint', (done) => {
          chai.request(server)
              .get('/ready')
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('status').eql('ready');
                done();
              });
        });
    });

});