import { ExclamationCircleOutlined } from '@ant-design/icons';
import { FC } from 'react';
import styles from './InputError.module.scss';

interface InputErrorType {
  message: string | undefined;
}
const InputError: FC<InputErrorType> = ({ message }) => (
  <div className={styles.error_container}>
    <ExclamationCircleOutlined className={styles.error_icon} />
    <span>{message}</span>
  </div>
);

export default InputError;
