import {Colleague} from '../colleague/colleague';

export class Department {
  constructor(public id: number,
              public name: string,
              public colleague:Colleague
  ) {
  }
}
