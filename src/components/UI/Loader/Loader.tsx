import { FC } from 'react';
import styles from './Loader.module.scss';

const Loader: FC = () => (
  <div className={styles.container}>
    <div className={styles.spinner}>
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
);

export default Loader;
