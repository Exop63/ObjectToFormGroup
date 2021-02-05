 convert(data: any, ignor?: string[]): any {
    // console.log("Array = ", this.isArray(data), "Value: ", data);
    // console.log("Object = ", this.isObject(data), "Value: ", data);

    if (this.isArray(data)) {
      const array: any[] = [];
      data.forEach(el => {
        array.push(this.convert(el));
      });

      if (ignor) {
        return array;
      }
      return this.fb.array(array);
    } else if (this.isObject(data)) {
      let group = {};
      Object.keys(data).forEach(key => {
        if (ignor) {
          if (ignor.some(item => item === key)) {
            group[key] = [data[key]];
          } else {
            group[key] = this.convert(data[key]);
          }
        } else {
          group[key] = this.convert(data[key]);
        }
      });

      return this.fb.group(group);
    }
    return data;
  }

  isArray(value): boolean {
    return value instanceof Array;
  }
  isObject(value): boolean {
    return value instanceof Object;
  }
  objectOrArray(value): boolean {
    return this.isObject(value) || this.isArray(value);
  }
