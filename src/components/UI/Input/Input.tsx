import cn from 'classnames';
import { FC, useState } from 'react';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { InputProps, InputTypes } from '../../../types/typesForUI';
import styles from './Input.module.scss';

const Input: FC<InputProps> = ({
  type,
  name,
  classes,
  handleOnChange,
  required,
  placeholder,
  value,
  autofill = true,
}) => {
  const [inputType, setInputType] = useState<InputTypes>('password');
  return (
    <div className={cn(styles.inputContainer, classes)}>
      <input
        maxLength={type === 'password' ? 30 : 700}
        name={name}
        placeholder={placeholder}
        value={value}
        type={type === 'password' ? inputType : type}
        required={required}
        className={styles.input}
        onChange={handleOnChange}
      />
      {type === 'password'
        && (inputType === 'password' ? (
          <EyeInvisibleOutlined
            className={styles.showPasswordButton}
            onClick={() => setInputType('text')}
          />
        ) : (
          <EyeOutlined
            className={styles.showPasswordButton}
            onClick={() => setInputType('password')}
          />
        ))}
    </div>
  );
};

export default Input;
