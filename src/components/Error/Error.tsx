import image from '../../assets/images/error.png';
import style from './Error.module.scss';

const Error = () => (
  <div className={style.container}>
    <h2 className={style.text}> Error</h2>
    <img src={image} alt="error" className={style.image} />
  </div>
);

export default Error;
