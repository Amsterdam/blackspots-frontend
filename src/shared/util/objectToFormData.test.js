import objectToFormData from './objectToFormData';

describe('objectToFormData', () => {
  it('should create the correct form data for a complex object', () => {
    const file = new File([], 'fileName');
    const obj = {
      str: 'string',
      num: 10,
      flt: 5.43,
      point: { lat: 42.5, lon: 4.52 },
      fileObject: {
        fileName: 'name.jpg',
        id: 1,
        file,
      },
    };

    const formData = objectToFormData(obj);
    expect(formData.get('str')).toEqual('string');
    expect(formData.get('num')).toEqual('10');
    expect(formData.get('flt')).toEqual('5.43');
    expect(formData.get('point')).toEqual('{"lat":42.5,"lon":4.52}');
    expect(formData.get('fileObject')).toEqual(file);
  });
});
