const express = require('express')
const request = require('supertest')

const app = express()

app.get('/api/client', function (req, res) {
  res.status(200).json()
})

describe('api', function () {
  describe('GET /api/client', function () {
    it('respond with an array of users', function (done) {
      request(app)
        .get('/api/client')
        .expect(200, done)
    })
  })
})