/**
 *
 * @param {*} obj - the object to be converted
 * @param {*} form - the formData. used to fill the nested properties. Internal, not to be passed by the consumer.
 * @param {*} namespace - the parent property. Internal, not to be passed by the consumer
 * - takes a {} object and returns a FormData object.
 * - when the the object property is a file, will extract just the File object
 * - the last two parameters of the function are for internal use and not called directly, the main call will be always
 *  `const formData = objectToFormData(obj);`
 */
const objectToFormData = (obj, form = null, namespace = null) => {
  const fd = form || new FormData();

  Object.keys(obj).forEach((property) => {
    if (Object.prototype.hasOwnProperty.call(obj, property)) {
      const formKey = namespace ? `${namespace}[${property}]` : property;

      const propType = typeof obj[property];
      if (propType === 'string' || propType === 'number') {
        // if it's a string or number
        fd.append(formKey, obj[property]);
      } else if (obj[property].file && obj[property].file instanceof File) {
        fd.append(formKey, obj[property].file);
      } else {
        // get the property in json format
        fd.append(formKey, JSON.stringify(obj[property]));
      }
    }
  });

  return fd;
};

export default objectToFormData;
