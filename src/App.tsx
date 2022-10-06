import { FC } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";

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
