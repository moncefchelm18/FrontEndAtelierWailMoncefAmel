import React from 'react';
import {BrowserRouter as Router, Route, Routes, Outlet, Link} from 'react-router-dom';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />}>
                    <Route path="team" element={<Team />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </Router>
    );
};

const About = () => {
    return (
        <div>
            <h1>About Us</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/about/team">Our Team</Link>
                    </li>
                    <li>
                        <Link to="/about/contact">Contact Us</Link>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </div>
    );
};

const Team = () => {
    return (
        <div>
            <h2>Meet Our Team</h2>
            <p>Here's some information about our team...</p>
        </div>
    );
};

const Contact = () => {
    return (
        <div>
            <h2>Contact Us</h2>
            <p>Here's our contact information...</p>
        </div>
    );
};

const NotFound = () => {
    return <h2>404 Not Found</h2>;
};

const Home = () => {
    return <h1>Welcome to our website!</h1>;
};
export default App;