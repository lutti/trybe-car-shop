import sinon from 'sinon';
import { expect } from 'chai';
import { Model } from 'mongoose';
import { describe, afterEach } from 'mocha';
import CarService from '../../../src/Services/CarService';
import Car from '../../../src/Domains/Car';
import ICar from '../../../src/Interfaces/ICar';

describe('Testes dos Carros', () => {
  const inputCar: ICar = {
    model: 'Marea',
    year: 2002,
    color: 'Black',
    status: true,
    buyValue: 15.99,
    doorsQty: 4,
    seatsQty: 5,
  };

  const outputCar = new Car({
    id: '634852326b35b59438fbea2f',
    model: 'Marea',
    year: 2002,
    color: 'Black',
    status: true,
    buyValue: 15.99,
    doorsQty: 4,
    seatsQty: 5,
  });

  const updatedCar: ICar = {
    model: 'Marea',
    year: 2002,
    color: 'Red',
    status: true,
    buyValue: 12.99,
    doorsQty: 2,
    seatsQty: 5,
  };

  const updatedOutput = new Car({
    id: '634852326b35b59438fbea2f',
    model: 'Marea',
    year: 2002,
    color: 'Red',
    status: true,
    buyValue: 12.99,
    doorsQty: 2,
    seatsQty: 5,
  });

  afterEach(() => {
    sinon.restore();
  });

  it('Teste se adiciona carro', async function () {
    sinon
      .stub(Model, 'create')
      .resolves(outputCar);

    const response = await CarService.create(inputCar);

    expect(response).to.deep.equal(outputCar);
  });

  it('teste se lista todos', async function () {
    sinon
      .stub(Model, 'find')
      .resolves([outputCar]);

    const response = await CarService.findAll();

    expect(response).to.deep.equal([outputCar]);
  });

  it('teste se acha por id', async function () {
    sinon
      .stub(Model, 'findById')
      .resolves([outputCar][0]);

    const response = await CarService.findById('634852326b35b59438fbea2f');

    expect(response).to.deep.equal([outputCar][0]);
  });

  it('teste se falha com o id invalido', async function () {
    let error : Error | undefined;
    sinon
      .stub(Model, 'findById')
      .resolves([outputCar][0]);
    try {
      await CarService.findById('IDINVALIDO');  
    } catch (err) {
      error = err as Error;
    }
    
    expect(error?.message).to.deep.equal('Invalid mongo id');
  });

  it('teste se nao acha um carro por id', async function () {
    let error : Error | undefined;
    sinon
      .stub(Model, 'findById')
      .resolves([outputCar][1]);
    try {
      await CarService.findById('634852326b35b59438fbea2f');
    } catch (err) {
      error = err as Error;
    }
    
    expect(error?.message).to.deep.equal('Car not found');
  });

  it('teste se dá update', async function () {
    sinon
      .stub(Model, 'findByIdAndUpdate')
      .resolves([updatedOutput][0]);

    const response = await CarService.updateById('634852326b35b59438fbea2f', updatedCar);

    expect(response).to.deep.equal([updatedOutput][0]);
  });

  it('teste se tenta update com id invalido', async function () {
    let error : Error | undefined;
    sinon
      .stub(Model, 'findByIdAndUpdate')
      .resolves([updatedOutput][0]);

    try {
      await CarService.updateById('IDINVALIDO', updatedCar);
    } catch (err) {
      error = err as Error;
    }
    
    expect(error?.message).to.deep.equal('Invalid mongo id');
  });
});