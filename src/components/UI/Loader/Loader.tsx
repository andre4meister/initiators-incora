import { FC } from 'react';
import styles from './Loader.module.scss';

const Loader: FC = () => (
  <div className={styles.container}>
    <div className={styles.loader} />
  </div>
);

export default Loader;
