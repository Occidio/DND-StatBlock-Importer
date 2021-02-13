/*
 * Dnd5e Statblock Importer on FoundryVTT
 *
 * Author: Occidio
 * Version: 0.0.1
 *
 */
export class statblockImportApp {

    static async init(){
        console.log("Init called")
    }
}

// Run when Foundry gets initialized
Hooks.once("init", async function() { 

    /* Why did i stop the enter propagation in the old sbc?
    window.addEventListener("keydown",function(e) {
        if(e.keyIdentifier=="U+000A" || e.keyIdentifier=="Enter") {
            if(e.target.id=="sbcInput") {
                e.stopPropagation()
                return false
            }
        }
    },true);
    */
   
    
});

Hooks.once("setup", function() {
    console.log("Setup")
});

Hooks.once("ready", async function() {
    console.log("ready")
});

Hooks.on("renderActorDirectory", (app, html, data) => {
    const startImportButton = $("<button id='startImportButton' class='create-entity 5eimportButton'><i class='fas fa-file-import'></i></i>Convert Statblock</button>");
    html.find(".directory-footer").append(startImportButton)
    startImportButton.click(async (ev) => {
        await statblockImportApp.init()
    });    
});