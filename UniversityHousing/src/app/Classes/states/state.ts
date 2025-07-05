import {Governorate} from '../governorate/governorate';

export class State {
  constructor(
    public id :number,
    public name: string,
    public governorate:Governorate,
  ) {
  }
}
