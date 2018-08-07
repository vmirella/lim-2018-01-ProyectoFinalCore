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

  describe('newVisit(date, entryTime, name, dni, photo, photoUrl, company, employee, reasonForVisit)', (done) => {
    it('Debería retornar un objeto con el key de la nueva visita registrada', (done) => {
      const result = newVisit(date, entryTime, name, dni, photo, photoUrl, 'Laboratoria', employee, reasonForVisit);
      assert.equal(typeof result, 'object');
      done();
    });
  });
  
  describe('getClients()', (done) => {
    it('Debería retornar un objeto con todos los clientes', (done) => {
      const result = getClients();
      assert.equal(typeof result, 'object');
      done();
    });
  });

  describe('getEmployees(uidClient)', (done) => {
    it('Debería retornar un objeto con todos los empleados', (done) => {
      const result = getEmployees('-LJC5kBGvC-BBmDKVnQa');
      assert.equal(typeof result, 'object');
      done();
    });
  });
  

});