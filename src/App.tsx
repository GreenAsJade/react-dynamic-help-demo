/*
Copyright (c) 2022 Martin Gregory.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

import "./App.css";

import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useNavigate,
} from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faDice, faBars } from "@fortawesome/free-solid-svg-icons";

import { Page1 } from "Pages/Page1";
import { Page2 } from "Pages/Page2";

type HamburgerProps = {
    hide: () => void;
};

function HamburgerMenu(props: HamburgerProps): JSX.Element {
    const navigate = useNavigate();

    const showPage1 = React.useCallback(() => {
        props.hide();
        navigate("/page1");
    }, []);

    const showPage2 = React.useCallback(() => {
        props.hide();
        navigate("/page2");
    }, []);

    return (
        <div className="hamburger">
            <FontAwesomeIcon icon={faCog} onClick={showPage2} fixedWidth />
            <FontAwesomeIcon icon={faDice} onClick={showPage1} fixedWidth />
        </div>
    );
}

function App(): JSX.Element {
    const [hamburgerOpen, setHamburgerOpen] = React.useState(false);

    const showHamburger = React.useCallback(() => {
        setHamburgerOpen(true);
    }, []);

    const hideHamburger = React.useCallback(() => {
        setHamburgerOpen(false);
    }, []);

    return (
        <div className="App">
            <Router>
                <header className="App-header">
                    <div className="heading">
                        Numberz - a React Dynamic Help demo.
                    </div>
                    <FontAwesomeIcon icon={faBars} onClick={showHamburger} />
                    {hamburgerOpen && <HamburgerMenu hide={hideHamburger} />}
                </header>
                <Routes>
                    <Route path="/" element={<Page1 />} />
                    <Route path="/page1" element={<Page1 />} />
                    <Route path="/page2" element={<Page2 />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
