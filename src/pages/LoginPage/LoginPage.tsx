import Button from 'components/UI/Button/Button';
import Input from 'components/UI/Input/Input';
import { FC } from 'react';
import cn from 'classnames';

const LoginPage: FC = () => (
  <form>
    <div>
      <span>Email</span>
      <Input
        type="text"
        classes="textInput"
        placeholder="Emails"
        value=""
        handleOnChange={console.log}
      />
    </div>
    <div>
      <span>Password</span>
      <Input
        type="password"
        classes="textInput"
        placeholder="Password"
        value=""
        handleOnChange={console.log}
      />
    </div>

    <Button handleOnClick={console.log}>neoButton</Button>
  </form>
);
export default LoginPage;
