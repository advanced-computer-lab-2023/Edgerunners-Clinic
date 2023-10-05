import { createRoot } from 'react-dom/client';
import Packages from './components/Packages';

const App1 = () => {
    return(
        <Packages />    
    )
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App1 />);