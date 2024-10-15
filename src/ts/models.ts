export interface ICoordinates {
  latitude: string;
  longitude: string;
}

export interface ILocation {
  street: {
    number: number;
    name: string;
  };
  city: string;
  state: string;
  country: string;
  postcode: string;
  coordinates: ICoordinates;
  timezone: {
    offset: string;
    description: string;
  };
}

export interface ILogin {
  uuid: string;
  username: string;
  password: string;
  salt: string;
  md5: string;
  sha1: string;
  sha256: string;
}

export interface IDob {
  date: string;
  age: number;
}

export interface IRegistered {
  date: string;
  age: number;
}

export interface IPicture {
  large: string;
  medium: string;
  thumbnail: string;
}

export interface IUser {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: ILocation;
  email: string;
  login: ILogin;
  dob: IDob;
  registered: IRegistered;
  phone: string;
  cell: string;
  id: {
    name: string;
    value: string;
  };
  picture: IPicture;
  nat: string;
}

export interface IUserCard {
  id: string;
  content: IUser;
}

export interface IUsersResponse {
  results: IUser[];
  info: {
    seed: string;
    results: number;
    page: number;
    version: string;
  };
}
