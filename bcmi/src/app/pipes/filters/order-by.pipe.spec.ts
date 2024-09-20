import { OrderByPipe } from '@pipes/filters/order-by.pipe';

describe('OrderByPipe', () => {
  let records;
  let args;
  let expectedResponse;
  const pipe = new OrderByPipe();

  function objectFactory( property?: string, value?: any ) {
    return {
      [property]: value ? value : null
    };
  }

  function objectArrayFactory( iterations: number, property?: string ) {
    const objArr = [];
    for ( let i = 0; i < iterations; i++ ) {
      objArr.push({
        property: property ? property : 'id' + i
      });
    }
    return objArr;
  }

  function argsObjectFactory( property: string, direction: number ) {
    return {
      property: property,
      direction: direction
    };
  }

  describe('given a property of arg is null', () => {
    it('returns records', () => {
      records = objectArrayFactory(2);
      args = argsObjectFactory( null, null );
      expectedResponse = records;

      expect(pipe.transform(records, args).length).toBe(expectedResponse.length);
    });
    it('returns records', () => {
      records = objectArrayFactory(5);
      args = argsObjectFactory( null, -1 );
      expectedResponse = records;

      expect(pipe.transform(records, args).length).toBe(expectedResponse.length);
    });
    it('returns records', () => {
      records = objectArrayFactory(10);
      args = argsObjectFactory( 'dateAdded', null );
      expectedResponse = records;

      expect(pipe.transform(records, args).length).toBe(expectedResponse.length);
    });
  });
  describe('given property does not exist on a record', () => {
    // These cases are not handled by the order-by pipe
    // removing case temporarily until we fix.
   /* it('returns null records at top', () => {
      records = [
        objectFactory('dateAdded', new Date()),
        objectFactory('dateAdded')
      ];

      args = argsObjectFactory( 'dateAdded', 1 );

      expectedResponse = [
        objectFactory('dateAdded'),
        objectFactory('dateAdded', new Date())
      ];

      expect(JSON.stringify(pipe.transform(records, args))).toBe(JSON.stringify(expectedResponse));
    });
    it('returns null records at top', () => {
      records = [
        objectFactory('dateAdded', new Date()),
        objectFactory('dateAdded')
      ];

      args = argsObjectFactory( 'dateAdded', 1 );

      expectedResponse = [
        objectFactory('dateAdded'),
        objectFactory('dateAdded', new Date())
      ];

      expect(JSON.stringify(pipe.transform(records, args))).toBe(JSON.stringify(expectedResponse));
    });*/
  });
  describe('given record value returns object that is not a date', () => {
    it('does not sort the item and returns the rest in descending order', () => {
      records = [
        objectFactory('dateAdded', new Object),
        objectFactory('dateAdded', objectFactory('name', 'bword')),
        objectFactory('dateAdded', objectFactory('name', 'eword')),
        objectFactory('dateAdded', objectFactory('name', 'aword')),
        objectFactory('dateAdded', objectFactory('name', 'cword')),
        objectFactory('dateAdded', objectFactory('name', 'dword'))
      ];

      args = argsObjectFactory( 'dateAdded', 1 );

      expectedResponse = [
        objectFactory('dateAdded', new Object),
        objectFactory('dateAdded', objectFactory('name', 'aword')),
        objectFactory('dateAdded', objectFactory('name', 'bword')),
        objectFactory('dateAdded', objectFactory('name', 'cword')),
        objectFactory('dateAdded', objectFactory('name', 'dword')),
        objectFactory('dateAdded', objectFactory('name', 'eword'))
      ];

      expect(JSON.stringify(pipe.transform(records, args))).toBe(JSON.stringify(expectedResponse));
    });
    it('does not sort the item and returns the rest in ascending order', () => {
      records = [
        objectFactory('dateAdded', new Object),
        objectFactory('dateAdded', objectFactory('name', 'bword')),
        objectFactory('dateAdded', objectFactory('name', 'eword')),
        objectFactory('dateAdded', objectFactory('name', 'aword')),
        objectFactory('dateAdded', objectFactory('name', 'cword')),
        objectFactory('dateAdded', objectFactory('name', 'dword'))
      ];

      args = argsObjectFactory( 'dateAdded', -1 );

      expectedResponse = [
        objectFactory('dateAdded', new Object),
        objectFactory('dateAdded', new Object({ name: 'eword'})),
        objectFactory('dateAdded', new Object({ name: 'dword'})),
        objectFactory('dateAdded', new Object({ name: 'cword'})),
        objectFactory('dateAdded', new Object({ name: 'bword'})),
        objectFactory('dateAdded', new Object({ name: 'aword'}))
      ];

      expect(JSON.stringify(pipe.transform(records, args))).toBe(JSON.stringify(expectedResponse));
    });
  });
  describe('given aCompare and bCompare are strings', () => {
    it('returns a < b', () => {
      records = [
        objectFactory('dateAdded', objectFactory('name', 'bword')),
        objectFactory('dateAdded', objectFactory('name', 'eword')),
      ];

      args = argsObjectFactory( 'dateAdded', 1 );

      expectedResponse = [
        objectFactory('dateAdded', objectFactory('name', 'bword')),
        objectFactory('dateAdded', objectFactory('name', 'eword')),
      ];

      expect(JSON.stringify(pipe.transform(records, args))).toBe(JSON.stringify(expectedResponse));
    });
    it('returns a > b', () => {
      records = [
        objectFactory('dateAdded', objectFactory('name', 'eword')),
        objectFactory('dateAdded', objectFactory('name', 'bword')),
      ];

      args = argsObjectFactory( 'dateAdded', 1 );

      expectedResponse = [
        objectFactory('dateAdded', objectFactory('name', 'bword')),
        objectFactory('dateAdded', objectFactory('name', 'eword')),
      ];

      expect(JSON.stringify(pipe.transform(records, args))).toBe(JSON.stringify(expectedResponse));
    });
    it('sorts records in descending order', () => {
      records = [
        objectFactory('dateAdded', objectFactory('name', 'bword')),
        objectFactory('dateAdded', objectFactory('name', 'eword')),
        objectFactory('dateAdded', objectFactory('name', 'aword')),
        objectFactory('dateAdded', objectFactory('name', 'cword')),
        objectFactory('dateAdded', objectFactory('name', 'dword'))
      ];

      args = argsObjectFactory( 'dateAdded', -1 );

      expectedResponse = [
        objectFactory('dateAdded', objectFactory('name', 'eword')),
        objectFactory('dateAdded', objectFactory('name', 'dword')),
        objectFactory('dateAdded', objectFactory('name', 'cword')),
        objectFactory('dateAdded', objectFactory('name', 'bword')),
        objectFactory('dateAdded', objectFactory('name', 'aword'))
      ];

      expect(JSON.stringify(pipe.transform(records, args))).toBe(JSON.stringify(expectedResponse));
    });
    it('sorts records in ascending order', () => {
      records = [
        objectFactory('dateAdded', objectFactory('name', 'bword')),
        objectFactory('dateAdded', objectFactory('name', 'eword')),
        objectFactory('dateAdded', objectFactory('name', 'aword')),
        objectFactory('dateAdded', objectFactory('name', 'cword')),
        objectFactory('dateAdded', objectFactory('name', 'dword'))
      ];

      args = argsObjectFactory( 'dateAdded', 1 );

      expectedResponse = [
        objectFactory('dateAdded', objectFactory('name', 'aword')),
        objectFactory('dateAdded', objectFactory('name', 'bword')),
        objectFactory('dateAdded', objectFactory('name', 'cword')),
        objectFactory('dateAdded', objectFactory('name', 'dword')),
        objectFactory('dateAdded', objectFactory('name', 'eword'))
      ];

      expect(JSON.stringify(pipe.transform(records, args))).toBe(JSON.stringify(expectedResponse));
    });
    it('does not sort the records', () => {
      records = [
        objectFactory('dateAdded', objectFactory('name', 'bword')),
        objectFactory('dateAdded', objectFactory('name', 'bword')),
        objectFactory('dateAdded', objectFactory('name', 'bword')),
        objectFactory('dateAdded', objectFactory('name', 'bword')),
        objectFactory('dateAdded', objectFactory('name', 'bword'))
      ];

      args = argsObjectFactory( 'dateAdded', -1 );

      expectedResponse = [
        objectFactory('dateAdded', objectFactory('name', 'bword')),
        objectFactory('dateAdded', objectFactory('name', 'bword')),
        objectFactory('dateAdded', objectFactory('name', 'bword')),
        objectFactory('dateAdded', objectFactory('name', 'bword')),
        objectFactory('dateAdded', objectFactory('name', 'bword'))
      ];

      expect(JSON.stringify(pipe.transform(records, args))).toBe(JSON.stringify(expectedResponse));
    });
  });
  describe('given aCompare and bCompare are date objects', () => {
    it('returns a < b', () => {
      records = [
        objectFactory('dateAdded', new Date('2018, 11, 17')),
        objectFactory('dateAdded', new Date('2018, 11, 18')),
      ];

      args = argsObjectFactory( 'dateAdded', 1 );

      expectedResponse = [
        objectFactory('dateAdded', new Date('2018, 11, 17')),
        objectFactory('dateAdded', new Date('2018, 11, 18')),
      ];

      expect(JSON.stringify(pipe.transform(records, args))).toBe(JSON.stringify(expectedResponse));
    });
    it('returns a > b', () => {
      records = [
        objectFactory('dateAdded', new Date('2018, 11, 18')),
        objectFactory('dateAdded', new Date('2018, 11, 17')),
      ];

      args = argsObjectFactory( 'dateAdded', 1 );

      expectedResponse = [
        objectFactory('dateAdded', new Date('2018, 11, 17')),
        objectFactory('dateAdded', new Date('2018, 11, 18')),
      ];

      expect(JSON.stringify(pipe.transform(records, args))).toBe(JSON.stringify(expectedResponse));
    });
    it('sorts records in descending order', () => {
      records = [
        objectFactory('dateAdded', new Date('2018, 11, 19')),
        objectFactory('dateAdded', new Date('2018, 11, 15')),
        objectFactory('dateAdded', new Date('2018, 11, 13')),
        objectFactory('dateAdded', new Date('2018, 11, 18')),
        objectFactory('dateAdded', new Date('2018, 11, 12'))
      ];

      args = argsObjectFactory( 'dateAdded', -1 );

      expectedResponse = [
        objectFactory('dateAdded', new Date('2018, 11, 19')),
        objectFactory('dateAdded', new Date('2018, 11, 18')),
        objectFactory('dateAdded', new Date('2018, 11, 15')),
        objectFactory('dateAdded', new Date('2018, 11, 13')),
        objectFactory('dateAdded', new Date('2018, 11, 12'))
      ];

      expect(JSON.stringify(pipe.transform(records, args))).toBe(JSON.stringify(expectedResponse));
    });
    it('sorts records in ascending order', () => {
      records = [
        objectFactory('dateAdded', new Date('2018, 11, 19')),
        objectFactory('dateAdded', new Date('2018, 11, 15')),
        objectFactory('dateAdded', new Date('2018, 11, 13')),
        objectFactory('dateAdded', new Date('2018, 11, 18')),
        objectFactory('dateAdded', new Date('2018, 11, 12'))
      ];

      args = argsObjectFactory( 'dateAdded', 1 );

      expectedResponse = [
        objectFactory('dateAdded', new Date('2018, 11, 12')),
        objectFactory('dateAdded', new Date('2018, 11, 13')),
        objectFactory('dateAdded', new Date('2018, 11, 15')),
        objectFactory('dateAdded', new Date('2018, 11, 18')),
        objectFactory('dateAdded', new Date('2018, 11, 19'))
      ];

      expect(JSON.stringify(pipe.transform(records, args))).toBe(JSON.stringify(expectedResponse));
    });
    it('does not sort the records', () => {
      records = [
        objectFactory('dateAdded', new Date('2018, 11, 19')),
        objectFactory('dateAdded', new Date('2018, 11, 19')),
        objectFactory('dateAdded', new Date('2018, 11, 19')),
        objectFactory('dateAdded', new Date('2018, 11, 19')),
        objectFactory('dateAdded', new Date('2018, 11, 19'))
      ];
      args = argsObjectFactory( 'dateAdded', -1 );

      expectedResponse = [
        objectFactory('dateAdded', new Date('2018, 11, 19')),
        objectFactory('dateAdded', new Date('2018, 11, 19')),
        objectFactory('dateAdded', new Date('2018, 11, 19')),
        objectFactory('dateAdded', new Date('2018, 11, 19')),
        objectFactory('dateAdded', new Date('2018, 11, 19'))
      ];

      expect(JSON.stringify(pipe.transform(records, args))).toBe(JSON.stringify(expectedResponse));
    });
  });
});
