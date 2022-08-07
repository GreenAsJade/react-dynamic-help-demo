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

import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { HelpFlow, HelpItem } from "react-dynamic-help";

import { FontAwesomeIcon as FA } from "@fortawesome/react-fontawesome";

export function HelpFlows(): JSX.Element {
    return (
        <div className="help-flow-container">
            <HelpFlow id="new-user" showInitially={true}>
                <HelpItem id="help-for-help-toggle" target="help-toggle">
                    <div>Click here to see more Dynamic Help</div>
                </HelpItem>
            </HelpFlow>

            <HelpFlow id="banner-dismiss-separately" showInitially={true}>
                <HelpItem
                    id="help-for-heading"
                    target="heading"
                    position={"bottom-centre"}
                    highlightTarget={false}
                >
                    <div>
                        This is a deliberately obtuse and pointless app,
                        existing only to display Dynamic Help features and
                        usage. 😀
                    </div>
                </HelpItem>
            </HelpFlow>

            <HelpFlow id="basic" showInitially={false}>
                <HelpItem target="add-stat-button">
                    <div>Click to add a stat</div>
                </HelpItem>
                <HelpItem target="stat-name-input" position="bottom-centre">
                    <>
                        <div>Enter the name for a stat</div>
                        <div className="demo-note">
                            (positioned differently){" "}
                        </div>
                    </>
                </HelpItem>
                <HelpItem target="dice-chooser" position="bottom-centre">
                    <div>Choose a dice type</div>
                    <div className="demo-note">
                        (targets a different HTML element type)
                    </div>
                </HelpItem>
                <HelpItem id="help-for-stat-ok" target="stat-ok">
                    <div>OK?</div>
                </HelpItem>
                <HelpItem target="name-button" position="center-right">
                    <div>Now you should enter your Character name...</div>
                </HelpItem>
                <HelpItem
                    id="special-help-item"
                    target="burger"
                    position="bottom-left"
                >
                    <>
                        <div>
                            ... and go to the dice page to roll your stats!
                        </div>
                        <div className="demo-note">
                            (help item with custom id for styling...
                        </div>
                        <div className="demo-note">
                            ... same flow, item in different Route)
                        </div>
                    </>
                </HelpItem>
                <HelpItem
                    target="hamburger-dice"
                    position="top-left"
                    anchor={"top-right"}
                    margin="0 3px 0 0"
                >
                    <FA icon={faArrowRight} fixedWidth />
                </HelpItem>
                <HelpItem
                    target="actual-dice"
                    position="bottom-right"
                    anchor="bottom-left"
                    margin="0 0 -4px 3px"
                >
                    <FA icon={faArrowLeft} fixedWidth />
                    <span>now click to roll!</span>
                </HelpItem>
            </HelpFlow>

            <HelpFlow id="finished-rolling" showInitially={false}>
                <HelpItem target="burger" position="bottom-left">
                    <div>
                        Now you can go back and set up another character, on the
                        Config page
                    </div>
                </HelpItem>
                <HelpItem
                    target="hamburger-config"
                    position="top-left"
                    anchor={"top-right"}
                    margin="0 3px 0 0"
                >
                    <FA icon={faArrowRight} fixedWidth />
                </HelpItem>
            </HelpFlow>

            <HelpFlow id="testing" showInitially={false}>
                <HelpItem
                    target="dice"
                    position="top-left"
                    anchor={"top-right"}
                    margin="0 3px 0 0"
                >
                    <FA icon={faArrowRight} fixedWidth />
                </HelpItem>
            </HelpFlow>
        </div>
    );
}
