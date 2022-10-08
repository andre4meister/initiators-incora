import Calendar from 'components/UI/Calendar/Calendar';
import { FC } from 'react';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';

const App: FC = () => (
  <div className="App">
    <Header />
    <main>content</main>
    <Footer />
    <Calendar />
  </div>
);

export default App;
