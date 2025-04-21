export class Room {
  constructor(public id: number,
              public roomNumber: string,
              public capacity: number,
              public currentCapacity: number,
              public buildingName: string
  ) {
  }
}
