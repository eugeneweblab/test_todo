import React from 'react';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import NoMatch from './pages/NoMatch';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StoreProvider } from './store/StoreContext';

const App = () => {
    return (
        <StoreProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/signin/" element={<SignIn />}/>
                    <Route path="*" element={<NoMatch/>}/>
                </Routes>
            </Router>
        </StoreProvider>
    );
};

export default App;