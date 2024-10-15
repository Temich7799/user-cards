import { IUser } from 'ts/models';

export type IUsersResponse = {
  results: IUser[];
  info: {
    seed: string;
    results: number;
    page: number;
    version: string;
  };
};

export const fetchUsers = async (count: number): Promise<IUsersResponse> => {
  const res = await fetch('https://randomuser.me/api/?results=' + count);
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return await res.json();
};
