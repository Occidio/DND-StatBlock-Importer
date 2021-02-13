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

Hooks.on("renderActorDirectory", (app, html, data) => {
    const startImportButton = $("<button id='startImportButton' class='create-entity 5eimportButton'><i class='fas fa-file-import'></i></i>Convert Statblock</button>");
    html.find(".directory-footer").append(startImportButton)
    startImportButton.click(async (ev) => {
        await statblockImportApp.init()
    });    
});