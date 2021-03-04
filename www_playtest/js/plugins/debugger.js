(function() {
    const apiVersion = 1;
    if (window.__RPH_THE_RELOADER__) throw new Error("The Debugger isn't compatible with The Reloader for now.");

    let messageQueue = [];

    window.capturerGameVariablesData = {
        set(obj, prop, value) {
            messageQueue.push({
                "type":"update",
                "value":value,
                "prop":prop,
                "kind":"game_variables"
            });
            return Reflect.set(...arguments);
        }
    };

    window.capturerGameVariables = {
        set(obj, prop, value) {
            if (prop === "_data") {
                messageQueue.push(JSON.parse(JSON.stringify({
                    "type":"set",
                    "value": value,
                    "kind":"game_variables"
                })));
                obj[prop] = new Proxy(value, window.capturerGameVariablesData);
            } else {
                Reflect.set(...arguments);
            }

            return true;
        }
    };

    window.capturerGameSwitchesData = {
        set(obj, prop, value) {
            messageQueue.push({
                "type":"update",
                "value":value,
                "prop":prop,
                "kind":"game_switches"
            });
            return Reflect.set(...arguments);
        }
    };

    window.capturerGameSwitches = {
        set(obj, prop, value) {
            if (prop === "_data") {
                messageQueue.push(JSON.parse(JSON.stringify({
                    "type": "set",
                    "value": value,
                    "kind": "game_switches"
                })));
                obj[prop] = new Proxy(value, window.capturerGameSwitchesData);
            } else {
                Reflect.set(...arguments);
            }
        }
    }

    let oldCreateGameObjects = DataManager.createGameObjects;
    let oldExtractSaveContents = DataManager.extractSaveContents;

    DataManager.createGameObjects = function() {
        oldCreateGameObjects();
        $gameVariables._data = new Proxy($gameVariables._data, window.capturerGameVariablesData);
        $gameVariables = new Proxy($gameVariables, window.capturerGameVariables);
        $gameSwitches._data = new Proxy($gameSwitches._data, window.capturerGameSwitchesData);
        $gameSwitches = new Proxy($gameSwitches, window.capturerGameSwitches);
        messageQueue.push(JSON.parse(JSON.stringify({
            "type":"set",
            "value":$gameSwitches._data,
            "kind":"game_switches"
        })));
        messageQueue.push(JSON.parse(JSON.stringify({
            "type":"set",
            "value":$gameVariables._data,
            "kind":"game_variables"
        })));
    };

    DataManager.extractSaveContents = function(contents) {
        oldExtractSaveContents(contents);
        $gameVariables._data = new Proxy($gameVariables._data, window.capturerGameVariablesData);
        $gameVariables = new Proxy($gameVariables, window.capturerGameVariables);
        $gameSwitches._data = new Proxy($gameSwitches._data, window.capturerGameSwitchesData);
        $gameSwitches = new Proxy($gameSwitches, window.capturerGameSwitches);
        messageQueue.push(JSON.parse(JSON.stringify({
            "type":"set",
            "value":$gameSwitches._data,
            "kind":"game_switches"
        })));
        messageQueue.push(JSON.parse(JSON.stringify({
            "type":"set",
            "value":$gameVariables._data,
            "kind":"game_variables"
        })));
    };

    window.addEventListener("message", function(event) {
        if (event.origin !== "https://rph.space") return;
        if (event.data.type === "inquire") {
            if (event.data.apiVersion !== apiVersion) {
                alert("Your copy of the debugger mod is out of date! Please install an update, or contact Rph for assistance!");
                throw new Error("Debugger outdated! Please update");
            }

            let z = setInterval(function() {
                if (window.$gameVariables) {
                    debuggerWindow.postMessage({
                        "type": "initial",
                        "varNames":$dataSystem.variables,
                        "swNames":$dataSystem.switches,
                        "commonEvents":$dataCommonEvents.map(a => a?a.name:""),
                        "variableState":JSON.parse(JSON.stringify($gameVariables._data)),
                        "switchState":JSON.parse(JSON.stringify($gameSwitches._data))
                    }, "*");
                    clearInterval(z);
                }
            }, 10);
        }

        if (event.data.type === "invokeEvent") {
            $gameTemp.reserveCommonEvent(event.data.value);
        }

        if (event.data.type === "setVar") {
            $gameVariables.setValue(event.data.var, event.data.value);
        }

        if (event.data.type === "setSw") {
            $gameSwitches.setValue(event.data.sw, event.data.value);
        }
    });

    setTimeout(function() { 
        setInterval(function() {
            if (debuggerWindow.closed) {
                alert("Please disable the debugger mod if you wish to play without the debugger window visible.");
                window.debuggerWindow = window.open("https://rph.space/omoridbg/index.html");
            }
        }, 10);

        setInterval(function() {
            if (messageQueue.length > 0) {
                if (!debuggerWindow.closed) {
                    debuggerWindow.postMessage(messageQueue, "*");
                }
                messageQueue = [];
            }
        }, 50);

        window.debuggerWindow = window.open("https://rph.space/omoridbg/index.html", '', 'width=1280,height=720,top=60,left=60');
    }, 10000);
})();