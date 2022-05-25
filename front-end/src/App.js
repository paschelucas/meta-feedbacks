import Router from "./routes/Router";
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    
  }

  p {
    margin: 0;
  }
  `


const App = () => {
  return (
    <div>
        <GlobalStyle/>
        <Router/>
    </div>
  );
}

export default App;
