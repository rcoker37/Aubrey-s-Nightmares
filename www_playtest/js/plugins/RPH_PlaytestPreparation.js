const { request } = require('http');

(function() {
    if (confirm("Do you want all game files to be decrypted into www_playtest?\nMake sure you disable all other mods unless you want their changes included in the decrypted data!")) {
        SceneManager.run = function() {
            const fs = require('fs');
            const path = require('path');
            let c = document.createElement("canvas");
            c.width = 640;
            c.height = 480;
            c.style = "position:Fixed;top:0;left:0;width:100vw;height:100vh;z-index:99999;image-rendering:pixelated;";
            document.body.appendChild(c);

            let ctx = c.getContext("2d");
            ctx.font = "24px OMORI_GAME2";
            ctx.fillStyle = "white";
            ctx.fillText("Preparing to decrypt...", 0, 16);

            // Some code stolen from FalsePattern
            const base = path.dirname(process.mainModule.filename);
            const decryptDir = `${base}/../www_playtest`;

            if (fs.existsSync(decryptDir)) {
                ctx.fillStyle = "red";
                ctx.fillText("The www_playtest directory already exists in your game! Delete it before running this process.", 10, 50, 620);
            } else {
                ctx.fillText("Building task list...", 10, 50);

                let fileList = [];

                function preparations(spath) {
                    let basePath = `${base}/${spath}`;
                    let decryptPath = `${decryptDir}/${spath}`;
                    let entries = fs.readdirSync(basePath);

                    for (let entry of entries) {
                        let candidate = `${spath}/${entry}`;
                        if (!candidate.startsWith("/mods") && !candidate.startsWith("/adm-zip-0.5.1") && !candidate.startsWith("/JSON-Patch-3.0.0") && !candidate.startsWith("/gomori")) {
                            if (fs.lstatSync(`${basePath}/${entry}`).isDirectory()) {
                                fs.mkdirSync(`${decryptPath}/${entry}`);
                                preparations(`${spath}/${entry}`);
                            } else {
                                if (!entry.toLowerCase().endsWith(".basil")) {
                                        fileList.push(`${spath}/${entry}`);
                                }
                            }
                        }
                    }
                }

                fs.mkdirSync(decryptDir);
                preparations("");
                console.log(fileList);

                ctx.clearRect(0, 0, 640, 480);
                ctx.fillText("Deriving keys...", 48, 16);

                const crypto = require("crypto")
                
                const algorithm = "aes-256-ctr";
                let steamkey = String(window.nw.App.argv).replace("--", "");
                const applySteamLibrary = (plugins) => {
                    const i = plugins.slice(0,16);
                    plugins = plugins.slice(16);
                    const d = crypto.createDecipheriv(algorithm, steamkey, i);
                    const r = Buffer.concat([d.update(plugins), d.final()]);
                    return r;
                }
                const parseHexString = function(str) { 
                    var result = [];
                    while (str.length >= 2) { 
                        result.push(parseInt(str.substring(0, 2), 16));
            
                        str = str.substring(2, str.length);
                    }
            
                    return result;
                }
                
                const decryptRPGMV = function(data, key) {
                    const l = key.length;
                    data = data.slice(16);
                    for (let i = 0; i < 16; i++) {
                        data[i] = data[i] ^ key[i % l];
                    }
                    return data;
                }		
                
                const rpgKey = parseHexString(JSON.parse(applySteamLibrary(fs.readFileSync(`${base}/data/System.KEL`))).encryptionKey);
	
                console.log(rpgKey, steamkey);

                function mutateExt(a) {
                    return a
                        .replace(".KEL", ".json")
                        .replace(".OMORI",".js")
                        .replace(".HERO",".yaml")
                        .replace(".AUBREY",".json")
                        .replace(".PLUTO", ".json")
                        .replace(".rpgmvp", ".png")
                        .replace(".rpgmvm",".m4a")
                        .replace(".rpgmvo",".ogg");
                }

                let s = new Date().getTime();

                function decryptNext() {
                    let el = fileList.pop();
                    ctx.clearRect(0, 0, 640, 480);
                    ctx.fillText("Copying...", 10, 16);
                    ctx.fillText(el, 10, 50);
                    ctx.fillText(fileList.length + " left.", 10, 80);
                    
                    let ext = path.extname(el);
                    let fdata;
                    switch (ext) {
                        case ".KEL":
                        case ".OMORI":
                        case ".AUBREY":
                        case ".HERO":
                        case ".PLUTO":
                            fdata = fs.readFileSync(`${base}${el}`);
                            fdata = applySteamLibrary(fdata);
                            fs.writeFileSync( mutateExt(`${decryptDir}${el}`), fdata);
                            break;
                        case ".rpgmvp":
                        case ".rpgmvo":
                        case ".rpgmvm":
                            fdata = fs.readFileSync(`${base}${el}`);
                            fdata = decryptRPGMV(fdata, rpgKey);
                            fs.writeFileSync(mutateExt(`${decryptDir}${el}`), fdata);
                            break;
                        default:
                            fdata = fs.readFileSync(`${base}${el}`);
                            fs.writeFileSync(`${decryptDir}${el}`,fdata);
                    }

                    if (fileList.length > 0) {
                        let ct = new Date().getTime();
                        if ((ct - s) > 50) {
                            setTimeout(decryptNext, 0);
                            s = ct;
                        } else {
                            decryptNext();
                        }
                    } else {
                        ctx.clearRect(0, 0, 640, 480);
                        ctx.fillText("Finalising...", 10, 16);

                        let indexHtml = fs.readFileSync(`${decryptDir}/index.html`,'utf-8');
                        indexHtml = indexHtml.replace(`<script type="text/javascript" src="gomori/gomori.js"></script>`,'<!-- -->'); // remove gomori
                        fs.writeFileSync(`${decryptDir}/index.html`,indexHtml);

                        let rpgManagers = fs.readFileSync(`${decryptDir}/js/rpg_managers.js`,'utf-8');
                        rpgManagers = rpgManagers.split("(function() {");
                        rpgManagers.pop();
                        rpgManagers = rpgManagers.join("(function() {");
                        fs.writeFileSync(`${decryptDir}/js/rpg_managers.js`, rpgManagers);

                        let systemJson = fs.readFileSync(`${decryptDir}/data/System.json`,'utf-8');
                        systemJson = JSON.parse(systemJson);
                        systemJson.hasEncryptedImages = false;
                        systemJson.hasEncryptedAudio = false;

                        fs.writeFileSync(`${decryptDir}/data/System.json`, JSON.stringify(systemJson, null, 2));
                        fs.writeFileSync(`${decryptDir}/Game.rpgproject`, 'RPGMV 1.6.1');

                        fs.renameSync(`${decryptDir}/data/Atlas.json`, `${decryptDir}/data/Atlas.yaml`);
                        fs.renameSync(`${decryptDir}/data/Notes.json`, `${decryptDir}/data/Notes.yaml`);
                        fs.renameSync(`${decryptDir}/data/Quests.json`, `${decryptDir}/data/Quests.yaml`);

                        let plugins = fs.readFileSync(`${decryptDir}/js/plugins.js`, "utf-8");
                        eval(plugins);
                        plugins = $plugins;

                        for (let p of plugins) {
                            if (p.name === "DisableMouse") {
                                p.status = false;
                            }
                            if (p.name === "YEP_Debugger" || p.name === "YEP_TestPlayAssist") {
                                p.status = true;
                            }
                        }

                        fs.writeFileSync(`${decryptDir}/js/plugins.js`, `// Generated by RPG Maker.
// Do not edit this file directly.
var $plugins =
${JSON.stringify(plugins, null, 2)}`);

                        ctx.clearRect(0, 0, 640, 480);
                        ctx.font = "56px OMORI_GAME2";
                        ctx.fillStyle = "lime";
                        ctx.fillText("Done. You can close the game.", 0, 60);
                    }
                }
                decryptNext();
            }
        }
    } else {
        console.log("bailing out...");
    }
})();