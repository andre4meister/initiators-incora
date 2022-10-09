import { ChangeEvent, FC, useState } from 'react';
import Button from 'components/Button/Button';
import Input from 'components/Input/Input';
import Calendar from 'components/UI/Calendar/Calendar';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';

import styles from './styles/App.module.scss';

const App: FC = () => {
  const [input, setInput] = useState<string>('');

  return (
    <div className={styles.app}>
      <Header />
      <main>
        <Input
          placeholder="Input"
          value={input}
          type="text"
          handleOnChange={(event: ChangeEvent<HTMLInputElement>) => setInput(event.target.value)}
        />
        <Button
          handleOnClick={() => setInput('')}
        >
          Clean Input
        </Button>
        <Calendar />
      </main>
      <Footer />
    </div>
  );
};

export default App;
