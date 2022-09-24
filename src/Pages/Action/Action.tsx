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

import "./Action.css";

import * as React from "react";

import { FontAwesomeIcon as FA } from "@fortawesome/react-fontawesome";
import { faDiceD6, faDiceD20 } from "@fortawesome/free-solid-svg-icons";

import * as DynamicHelp from "react-dynamic-help";

import * as CharacterTypes from "CharacterTypes";

type ActionProps = {
    character: CharacterTypes.CharacterType;
    setStat: (name: string, value: number) => void;
};

export const Action = (props: ActionProps): JSX.Element => {
    // Connect targets to help system...
    const { registerTargetItem, triggerFlow } = React.useContext(
        DynamicHelp.Api,
    );
    const { ref: dice, used: diceUsed } = registerTargetItem("actual-dice");

    // Actual UI functionality
    const rollFor = (name: string, range: CharacterTypes.StatRange) => {
        const unRolled = Object.values(props.character.stats).reduce(
            (prev, current) => prev + (current.value === null ? 1 : 0),
            0,
        );

        if (unRolled === 1) {
            triggerFlow("finished-rolling");
        }

        const newValue = Math.floor(Math.random() * range) + 1;
        props.setStat(name, newValue);
        diceUsed();
    };

    return (
        <div id="action-page">
            <h1>Generate Stats</h1>
            <div className="character-name">
                Character: "{props.character.name}"
            </div>
            <div className="stat-config-section">
                {Object.keys(props.character.stats).length ? (
                    Object.entries(props.character.stats).map(
                        ([stat_name, stat], index: number) => (
                            <div key={stat_name} className="stat-line">
                                <span>{stat_name}:</span>
                                {stat.value ? (
                                    <span>{stat.value}</span>
                                ) : (
                                    <FA
                                        ref={index === 0 ? dice : null}
                                        icon={
                                            stat.range === 6
                                                ? faDiceD6
                                                : faDiceD20
                                        }
                                        onClick={() =>
                                            rollFor(stat_name, stat.range)
                                        }
                                    />
                                )}
                            </div>
                        ),
                    )
                ) : (
                    <span>(Need some statz first!)</span>
                )}
            </div>
        </div>
    );
};
