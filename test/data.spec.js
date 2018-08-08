describe('data', () => {

  it('Debería ser una función', () => {
    assert.isFunction(signInUser);
  });

  it('Debería ser una función', () => {
    assert.isFunction(updateVisitor);
  });

  it('Debería ser una función', () => {
    assert.isFunction(newVisit);
  });

  it('Debería ser una función', () => {
    assert.isFunction(getClients);
  });

  it('Debería ser una función', () => {
    assert.isFunction(getEmployees);
  });

  describe('signInUser(email, password)', () => {
    it('Debería retornar debería retornar true al iniciar sesión', (done) => {
      const result = signInUser('admin@gmail.com', '123456');
      assert.equal(result, true);
      done();
    });
  });

  describe('newVisit(date, entryTime, name, dni, photo, photoUrl, company, employee, reasonForVisit)', () => {
    it('Debería retornar un objeto con el key de la nueva visita registrada', (done) => {
      const result = newVisit('2018-08-07', '10:22', 'Test Name', '39832382', '-LJMY1Bf6uHRt1VuPx9w', 'https://firebasestorage.googleapis.com/v0/b/visitame-8b1e9.appspot.com/o/-LJMY1Bf6uHRt1VuPx9w?alt=media&token=d7b727c4-4e28-4b9d-8cfc-57b5ec4442d3', 'Laboratoria', 'Lourdes Vilchez', 'Visita test');
      assert.equal(typeof result, 'string');
      done();
    });
  });
  
  describe('updateVisitor(visitorId, date, entryTime, departureTime, name, dni, photo, photoUrl, company, employee, reasonForVisit)', () => {
    it('Debería retornar un objeto con todos los datos actualizados de la visita', (done) => {
      const result = updateVisitor('-LJMh1KKXP1h8_HUnQZR', '2018-08-07', '10:12', '11:20', 'Test Name', '39832362', '-LJMY1Bf6uHRt1VuPx9w', 'https://firebasestorage.googleapis.com/v0/b/visitame-8b1e9.appspot.com/o/-LJMY1Bf6uHRt1VuPx9w?alt=media&token=d7b727c4-4e28-4b9d-8cfc-57b5ec4442d3', 'Laboratoria', 'Lourdes Vilchez', 'Visita test update');
      assert.equal(typeof result, 'object');
      done();
    });
  });

  describe('getClients()', () => {
    it('Debería retornar un objeto con todos los clientes', (done) => {
      const result = getClients();
      assert.equal(typeof result, 'object');
      done();
    });
  });

  describe('getEmployees(uidClient)', () => {
    it('Debería retornar un objeto con todos los empleados', (done) => {
      const result = getEmployees('-LJC5kBGvC-BBmDKVnQa');
      assert.equal(typeof result, 'object');
      done();
    });
  });
  

});