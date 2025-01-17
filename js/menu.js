import { colonialSpace } from "./colonialSpace.js";
import * as cw3 from "./cw3.js";
import { mapEditor } from "./mapEditor.js";
if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add("dark");
}
let mainMenu = {
    display(display) {
        document.getElementById("mainMenu").style.display = display ? "" : "none";
    }
};
let colonialSpaceButton = document.getElementById("csb");
let loadButton = document.getElementById("ldb");
colonialSpaceButton.addEventListener("click", () => {
    mainMenu.display(false);
    colonialSpace.display(true);
});
loadButton.addEventListener("click", () => {
    let fileInput = document.createElement("input");
    fileInput.setAttribute("type", "file");
    fileInput.setAttribute("accept", ".cw3");
    fileInput.click();
    fileInput.addEventListener("change", () => {
        let file = fileInput.files[0];
        let reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = () => {
            cw3.decompress(reader.result, mapEditor.loadMap);
            mapEditor.display(true);
            mainMenu.display(false);
            mapEditor.onClose = () => {
                mainMenu.display(true);
                mapEditor.display(false);
            };
        };
        reader.onerror = () => {
            alert(`Error:\n${reader.error}`);
        };
    });
});
export { mainMenu };
