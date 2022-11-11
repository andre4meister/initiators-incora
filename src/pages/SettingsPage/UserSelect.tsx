/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable implicit-arrow-linebreak */
import { FC, useEffect, useState } from 'react';
import { User } from 'types/dataTypes';
import axios from 'axios';
import Select from './Select';

const UserSelect: FC = () => {
  const [users, setUsers] = useState<User[] | null>(null);

  useEffect(() => {
    const response = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/users');
        setUsers(data);
      } catch (error) {
        if (error instanceof Error) {
          throw new Error();
        }
      }
    };
    response();
  }, []);

  return <>{users !== null && <Select users={users} />}</>;
};

export default UserSelect;
