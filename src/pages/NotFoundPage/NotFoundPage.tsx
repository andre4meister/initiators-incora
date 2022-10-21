import { useNavigate } from 'react-router-dom';
import Button from 'components/UI/Button/Button';
import image from '../../assets/images/meme.png';
import style from './NotFoundPage.module.scss';

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className={style.block}>
      <h1 className={style.error}>Ooops!</h1>
      <Button handleOnClick={() => navigate(-1)}>Go back</Button>
      <img alt="page not found" src={image} />
      <h5 className={style.text}>I was not looking for the page 404</h5>
    </div>
  );
};
export default NotFoundPage;
