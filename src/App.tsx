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
import "../node_modules/react-dynamic-help/lib/es5/DynamicHelp.css";

import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useNavigate,
} from "react-router-dom";

import { FontAwesomeIcon as FA } from "@fortawesome/react-fontawesome";
import { faTableList, faDice, faBars } from "@fortawesome/free-solid-svg-icons";

import * as DynamicHelp from "react-dynamic-help";

import * as CharacterTypes from "CharacterTypes";

import { Action } from "Pages/Action";
import { Config } from "Pages/Config";

import { HelpFlows } from "HelpFlows/HelpFlows";

type HamburgerProps = {
    hide: () => void;
};

function HamburgerMenu(props: HamburgerProps): JSX.Element {
    const { registerTargetItem } = React.useContext(DynamicHelp.Api);
    const { ref: dice, used: diceClicked } =
        registerTargetItem("hamburger-dice");
    const { ref: config, used: configClicked } =
        registerTargetItem("hamburger-config");

    const navigate = useNavigate();

    const showAction = React.useCallback(() => {
        props.hide();
        navigate("/action");
        diceClicked();
    }, []);

    const showConfig = React.useCallback(() => {
        props.hide();
        configClicked();
        navigate("/config");
    }, []);

    return (
        <div className="hamburger">
            <FA
                icon={faTableList}
                onClick={showConfig}
                fixedWidth
                ref={config}
            />
            <FA icon={faDice} onClick={showAction} fixedWidth ref={dice} />
        </div>
    );
}

function AppHelpToggle(): JSX.Element {
    const [appHelpVisible, setVisible] = React.useState(false);
    const { registerTargetItem, enableFlow, enableHelp } = React.useContext(
        DynamicHelp.Api,
    );

    const { ref: helpToggle, used: signalButtonUsed } =
        registerTargetItem("help-toggle");

    const toggleHelpVis = () => {
        if (appHelpVisible) {
            enableFlow("new-user");
            enableHelp(false);
        } else {
            signalButtonUsed();
            enableFlow("basic");
            enableHelp("true");
        }
        setVisible(!appHelpVisible);
    };

    return (
        <div id="HelpToggle" ref={helpToggle}>
            <button
                onClick={toggleHelpVis}
                className={appHelpVisible ? "visible" : ""}
            >
                ?
            </button>
        </div>
    );
}

function AppWithHelp(): JSX.Element {
    return (
        <DynamicHelp.HelpProvider>
            <App />
            <HelpFlows />
        </DynamicHelp.HelpProvider>
    );
}

function App(): JSX.Element {
    const [hamburgerOpen, setHamburgerOpen] = React.useState(false);

    const { registerTargetItem, resetHelp } = React.useContext(DynamicHelp.Api);
    const { ref: burger, used: burgerClicked } = registerTargetItem("burger");
    const { ref: heading } = registerTargetItem("heading");

    const [character, setCharacter] =
        React.useState<CharacterTypes.CharacterType>({
            name: "anonymous",
            stats: {},
        });

    const showHamburger = React.useCallback(() => {
        setHamburgerOpen(true);
        burgerClicked();
    }, [burgerClicked, hamburgerOpen]);

    const hideHamburger = React.useCallback(() => {
        setHamburgerOpen(false);
    }, []);

    const setStat = React.useCallback((stat: string, value: number): void => {
        console.log("setting stat", value);
        character.stats[stat].value = value;
        setCharacter({ ...character });
    }, []);

    const resetRolls = () => {
        for (const [stat, stat_data] of Object.entries(character.stats)) {
            character.stats[stat] = { ...stat_data, value: null };
        }
        setCharacter({ ...character });
    };

    const setName = React.useCallback((name: string): void => {
        character.name = name;
        resetRolls();
        setCharacter({ ...character });
    }, []);

    const configStat = React.useCallback(
        (stat: string, range: 6 | 20): void => {
            character.stats[stat] = { range, value: null };
            resetRolls();
            setCharacter({ ...character });
        },
        [],
    );

    return (
        <div className="App">
            <AppHelpToggle />
            <Router>
                <header className="App-header">
                    <div className="heading">
                        <span ref={heading}>
                            Statz - a React Dynamic Help demo.
                        </span>
                        <sup onClick={resetHelp}>⟳</sup>
                    </div>
                    <FA icon={faBars} onClick={showHamburger} ref={burger} />
                    {hamburgerOpen && <HamburgerMenu hide={hideHamburger} />}
                </header>
                <Routes>
                    <Route
                        path="/action"
                        element={
                            <Action character={character} setStat={setStat} />
                        }
                    />
                    <Route
                        path="*"
                        element={
                            <Config
                                character={character}
                                setName={setName}
                                configStat={configStat}
                            />
                        }
                    />
                </Routes>
            </Router>
        </div>
    );
}

export default AppWithHelp;
