import logo from './logo.svg';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import IntentSelection from "./pages/IntentSelection";
import {Container} from "react-bootstrap";

const intents = require('./assets/intents')

function App() {
    return (
        <Container fluid>
            <IntentSelection
                intents={intents}/>
        </Container>
    );
}

export default App;
