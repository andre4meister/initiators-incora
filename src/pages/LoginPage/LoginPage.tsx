import Button from 'components/Button/Button';
import CheckBox from 'components/CheckBox/CheckBox';
import Input from 'components/Input/Input';
import { FC } from 'react';
import cn from 'classnames';

const LoginPage: FC = () => (
  <form>
    <div>
      <span>Email</span>
      <Input type="text" classes="textInput" />
    </div>
    <div>
      <span>Password</span>
      <Input type="text" classes="textInput" />
    </div>
    <div>
      <CheckBox isChecked={false} onChange={console.log} />
      <span>Remember me</span>
    </div>
    <Button handleOnClick={console.log}>neoButton</Button>
  </form>
);
export default LoginPage;