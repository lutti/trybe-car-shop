import sinon from 'sinon';
import { expect } from 'chai';
import { Model } from 'mongoose';
import { describe, afterEach } from 'mocha';
import MotorcycleService from '../../../src/Services/MotorcycleService';
import Motorcycle from '../../../src/Domains/Motorcycle';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';

describe('Teste das Motos', () => {
  const motoName = 'Honda Cb 600f Hornet';

  const inputMotorcycle: IMotorcycle = {
    model: motoName,
    year: 2005,
    color: 'Yellow',
    status: true,
    buyValue: 30,
    category: 'Street',
    engineCapacity: 600,
  };

  const outputMotorcycle = new Motorcycle({
    id: '634852326b35b59438fbea2f',
    model: motoName,
    year: 2005,
    color: 'Yellow',
    status: true,
    buyValue: 30,
    category: 'Street',
    engineCapacity: 600,
  });

  const updatedMotorcycle: IMotorcycle = {
    model: motoName,
    year: 2005,
    color: 'Black',
    status: true,
    buyValue: 30,
    category: 'Street',
    engineCapacity: 60,
  };

  it('teste se adiciona uma moto', async function () {
    sinon
      .stub(Model, 'create')
      .resolves(outputMotorcycle);

    const response = await MotorcycleService.create(inputMotorcycle);

    expect(response).to.deep.equal(outputMotorcycle);
  });

  it('teste se lista todas as motos', async function () {
    sinon
      .stub(Model, 'find')
      .resolves([outputMotorcycle]);

    const response = await MotorcycleService.findAll();

    expect(response).to.deep.equal([outputMotorcycle]);
  });

  it('teste se acha moto pelo id', async function () {
    sinon
      .stub(Model, 'findById')
      .resolves([outputMotorcycle][0]);

    const response = await MotorcycleService.findById('634852326b35b59438fbea2f');

    expect(response).to.deep.equal([outputMotorcycle][0]);
  });

  it('teste quando falha pelo id invalido', async function () {
    let error: Error | undefined;
    sinon
      .stub(Model, 'findById')
      .resolves([outputMotorcycle][0]);

    try {
      await MotorcycleService.findById('IDINVALIDO'); 
    } catch (err) {
      error = err as Error;
    }

    expect(error?.message).to.deep.equal('Invalid mongo id');
  });

  it('teste quando nao acha pelo id', async function () {
    let error: Error | undefined;
    sinon
      .stub(Model, 'findById')
      .resolves([outputMotorcycle][1]);
    try {
      await MotorcycleService.findById('634852326b35b59438fbea2f'); 
    } catch (err) {
      error = err as Error;
    }

    expect(error?.message).to.deep.equal('Motorcycle not found');
  });

  it('teste se tenta update com id invalido', async function () {
    let error : Error | undefined;
    sinon
      .stub(Model, 'findByIdAndUpdate')
      .resolves([outputMotorcycle][0]);
    
    try {
      await MotorcycleService.updateById('IDINVALIDO', updatedMotorcycle);  
    } catch (err) {
      error = err as Error;
    }

    expect(error?.message).to.deep.equal('Invalid mongo id');
  });

  afterEach(() => {
    sinon.restore();
  });
});