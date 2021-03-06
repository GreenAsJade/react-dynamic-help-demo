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

import { HelpFlow, HelpItem } from "react-dynamic-help";

export function HelpFlows(): JSX.Element {
    return (
        <div className="help-flow-container">
            <HelpFlow id="new-user" showInitially={true}>
                <HelpItem target="help-toggle">
                    <div>Click here to see more Dynamic Help</div>
                </HelpItem>
            </HelpFlow>

            <HelpFlow id="basic" showInitially={false}>
                <HelpItem target="add-stat-button">
                    <div>Click to add a stat</div>
                </HelpItem>
                <HelpItem target="stat-name-input" position="bottom-centre">
                    <div>Enter the name for a stat</div>
                </HelpItem>
                <HelpItem target="dice-chooser" position="bottom-centre">
                    <div>Choose a dice type</div>
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
                    <div>... and go to the dice page to roll your stats!</div>
                </HelpItem>
            </HelpFlow>
        </div>
    );
}
