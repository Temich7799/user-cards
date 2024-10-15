import { fetchUsers, IUsersResponse } from 'api/users';
import { getRandomIndexesMap } from 'utils';

import { IUserCard } from './types';

export const formatUsersResponse = (response: IUsersResponse): IUserCard[] => {
  return response.results.map((user) => ({
    id: user.login.uuid,
    content: user,
  }));
};

export const getUsers = async (count: number): Promise<IUserCard[]> => {
  const response = await fetchUsers(count);
  return formatUsersResponse(response);
};

export const initialCount = 10;

export const replaceRandomCards = (oldCards: IUserCard[], newCards: IUserCard[]): IUserCard[] => {
  const indexesToChange = getRandomIndexesMap(newCards.length, initialCount);

  const updatedCards = oldCards.map((card, index) => {
    if (indexesToChange.has(index)) {
      return newCards.pop();
    }
    return card;
  });

  return updatedCards as IUserCard[];
};
