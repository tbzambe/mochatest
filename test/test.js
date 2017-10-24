const express = require('express'),
  mongoose = require('mongoose'),
  chai = require('chai'),

  assert = chai.assert,
  should = chai.should()

chai.use(require('chai-as-promised'))

/* To store **************************************************************************************/

mongoose.Promise = require('bluebird')
mongoose.connect('mongodb://localhost/mochatest', { useMongoClient: true })

const Person = mongoose.model('Person', new mongoose.Schema({
  name: String,
  twins: Boolean
}))

/* To check **************************************************************************************/


/**
 * Exemplo simples.
 */
describe('Array @ indexOf()', function () {
  const meuArray = [1, 2, 3]
  it('Retorna -1 quando o valor não está presente', function () {
    assert.equal(-1, meuArray.indexOf(4))
  })
})


/**
 * Testes pendentes.
 */
describe('Array @ indexOf()', function () {
  it('Retorna "Robson" quando o valor não está presente')
})


/**
 * Testando assincronamente.
 */
describe('Person @ save()', function () {
  it('Deve salvar sem erros', function (done) {
    const person = new Person({
      name: 'Romildo'
    })
    person.save(done)
  })
})


// beforeEach(function () {
//   console.log('Antes de todos os testes, uma mocha')
// })


/**
 * Soma argumentos de um objeto.
 */
function adiciona() {
  return Array.prototype.slice.call(arguments).reduce(function (anterior, atual) {
    return anterior + atual
  }, 0)
}
describe('Array @ adiciona()', function () {
  const testes = [
    { args: [1, 2], expectativa: 3 },
    { args: [1, 2, 3], expectativa: 6 },
    { args: [1, 2, 3, 4], expectativa: 10 },
    { args: [1, 2, 3, 4, 5], expectativa: 15 },
    { args: [1, 2, 4, 4, 5, 6], expectativa: 21 },
  ]
  testes.forEach(function (teste) {
    it('Deve somar corretamente ' + teste.args.length + ' args', function () {
      const result = adiciona.apply(null, teste.args)
      assert.equal(result, teste.expectativa)
    })
  })
})


/**
 * Teste pendente caso seja tarde ou noite.
 */
describe('Pending', function () {
  it('Deve rodar apenas se é manhã', function (done) {
    if ((new Date).getHours() < 12)
      done()
    else this.skip()
  })
})


/**
 * Adiciona e encontra usuário no banco.
 */
describe('Conexão', function () {
  const jucas = new Person({ name: 'Jucas', twins: true }),
    lonas = new Person({ name: 'Lonas', twins: true }),
    sutileza = new Person({ name: 'Sutileza' })

  jucas.save()
  lonas.save()
  sutileza.save()

  describe(' @ find()', function () {
    it('Deve responder com os gêmeos adicionados', function () {
      return Person.find({
        twins: true
      }).should.eventually.have.length(3)
    })
  })
})


/**
 * Fecha conexão após finalização de testes.
 */
after(function (done) {
  Person.remove(function (error) {
    Person.remove(function () {
      mongoose.connection.close()
      done()
    })
  })
})