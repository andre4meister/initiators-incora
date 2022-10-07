import { FC } from "react";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

const App: FC = ({}) => {
  return (
    <div className='App'>
      <Header />
      <main>content</main>
      <Footer />
    </div>
  );
};

export default App;
