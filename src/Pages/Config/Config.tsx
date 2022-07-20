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

import "./Config.css";

import * as React from "react";
import * as DynamicHelp from "react-dynamic-help";

import { FontAwesomeIcon as FA } from "@fortawesome/react-fontawesome";
import {
    faDiceD6,
    faDiceD20,
    faCirclePlus,
    faCheckCircle,
    faSquarePen,
    faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

import * as CharacterTypes from "CharacterTypes";

type ConfigProps = {
    character: CharacterTypes.CharacterType;
    setName: (name: string) => void;
    configStat: (name: string, range: 6 | 20) => void;
};

export const Config = (props: ConfigProps): JSX.Element => {
    const [editNameOpen, setEditNameOpen] = React.useState(false);
    const [newCharacterName, setNewCharacterName] = React.useState("");

    const [newStatEntryOpen, setNewStatEntryOpen] = React.useState(false);
    const [newStatName, setNewStatName] = React.useState("");
    const [newStatRange, setNewStatRange] =
        React.useState<CharacterTypes.StatRange>(0);

    const updateCharacterName = (ev: any) =>
        setNewCharacterName(ev.target.value);

    const updateNewStatName = (ev: any) => setNewStatName(ev.target.value);
    const updateNewStatRange = (ev: any) =>
        setNewStatRange(parseInt(ev.target.value) as CharacterTypes.StatRange);

    const editName = () => {
        setEditNameOpen(true);
    };

    const addStat = () => {
        setNewStatEntryOpen(true);
    };

    const saveName = () => {
        if (newCharacterName !== "") {
            props.setName(newCharacterName);
        }
        setEditNameOpen(false);
    };

    const saveNewStat = () => {
        if (newStatName !== "" && newStatRange) {
            props.configStat(newStatName, newStatRange);
        }
        setNewStatEntryOpen(false);
    };

    const { registerTargetItem } = React.useContext(DynamicHelp.Api);

    const { ref: addStatButton } = registerTargetItem("add-stat-button");
    const { ref: diceChooser } = registerTargetItem("dice-chooser");

    console.log("Config sees API:", registerTargetItem);

    return (
        <div id="config-page">
            <h1>Configure Stats</h1>
            <div className="character-name">
                {!editNameOpen ? (
                    <>
                        <span>Character: {props.character.name}</span>
                        <FA icon={faSquarePen} onClick={editName} />
                    </>
                ) : (
                    <>
                        <span>
                            Character:
                            <input
                                type="text"
                                placeholder="new character name"
                                onChange={updateCharacterName}
                            />
                        </span>
                        <FA icon={faCircleCheck} onClick={saveName} />
                    </>
                )}
            </div>
            <div className="stat-config-section">
                {Object.keys(props.character.stats).length ? (
                    Object.entries(props.character.stats).map(
                        ([stat_name, stat]) => (
                            <div key={stat_name} className="stat-config">
                                <span>{stat_name}</span>
                                <span>
                                    {stat.range === 6 ? (
                                        <FA icon={faDiceD6} />
                                    ) : (
                                        <FA icon={faDiceD20} />
                                    )}
                                </span>
                            </div>
                        ),
                    )
                ) : (
                    <span>No statz!</span>
                )}
            </div>
            <div className="add-a-stat">
                {newStatEntryOpen ? (
                    <div className="new-stat-entry-line">
                        <input
                            type="text"
                            placeholder="new stat name"
                            onChange={updateNewStatName}
                        />
                        <select
                            ref={diceChooser}
                            value={newStatRange}
                            onChange={updateNewStatRange}
                        >
                            <option value={0} />
                            <option value={6}>d6</option>
                            <option value={20}>d20</option>
                        </select>
                        <FA icon={faCheckCircle} onClick={saveNewStat} />
                    </div>
                ) : (
                    <FA
                        ref={addStatButton}
                        icon={faCirclePlus}
                        onClick={addStat}
                    />
                )}
            </div>
        </div>
    );
};
