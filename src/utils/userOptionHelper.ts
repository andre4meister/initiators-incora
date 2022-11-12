import { User } from 'types/dataTypes';
import { UserOption } from '../pages/SettingsPage/Select';

const userOptionHelper = (users: User[]) => users.map((user) => {
  const value = user.id;
  const label = `${user.firstName} ${user.lastName}`;
  return { value, label } as UserOption;
});

export default userOptionHelper;
