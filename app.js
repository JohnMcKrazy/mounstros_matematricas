const $d = document;
const selector = (tag) => $d.querySelector(`${tag}`);
const selectorAll = (tag) => $d.querySelectorAll(`${tag}`);
const bgData = ["jpg", "webp", "jpg"];
const gameTitle = selector(".game_title");
const playerDataSection = selector(".check_data");
const playerCharacterSelection = selector(".select_character");

const setSectionLVL = (current_lvl) => selector(`.lvl_${current_lvl}`);
const page = selector("HTML");
let playerName;
let playerLVL;
let playerCharacter;
let playerCharacterDescription;
let gameLVL = 0;
const charactersData = {
    vampiro: {
        food: {
            icon: "🍷",
            description: "Copa",
        },
    },

    zombie: {
        food: {
            icon: "🧠",
            description: "Cerebro",
        },
    },

    mounstro_de_frankenstein: {
        food: {
            icon: "🥔",
            description: "Papa",
        },
    },

    hombre_lobo: {
        food: {
            icon: "🥩",
            description: "Carne",
        },
    },
};
const levelsConfig = {
    primero: 10,
    segundo: 25,
    tercero: 50,
};
/* const setBg = () => {
    page.style.background = `url('./assets/bg/lvl_${gameLVL}.${bgData[gameLVL]}') no-repeat center`;
    gameLVL++;
}; */
const setTitle = (txt) => {
    gameTitle.textContent = `${txt}`;
};
const setInstructiorns = (txt) => {
    selector(`.instructions`).textContent = txt;
};
const changeLevel = (outSection, inSection) => {
    outSection.classList.add("hide_section");
    inSection.classList.remove("hide_section");
};
const setData = () => {
    setTitle("Ingresa Tus Datos");
    setInstructiorns("Participante, por favor ingresa tus datos para que empiezes con esta aventura");
};
setData();
const createRandomForLVL = () => {
    return Math.ceil(Math.random() * levelsConfig[playerLVL]);
};
const startGame = () => {
    changeLevel(playerDataSection, playerCharacterSelection);
    setTitle("Seleccióna tu personaje");
    setInstructiorns(`Hola ${playerName}, estas apunto de jugar una aventura matematica, primero necesitamos que selecciones con que personaje te gustaria hacer en tu epico viaje`);
    playerCharacterSelection.addEventListener("submit", (e) => {
        e.preventDefault();
        for (let x = 0; x < playerCharacterSelection.elements.length; x++) {
            let field = playerCharacterSelection.elements[x];
            if (field.checked === true) {
                playerCharacterDescription = field.getAttribute("data-description");
                playerCharacter = field.value;
            }
        }
        lvl_1();
    });
};
const shuffleData = (array) => {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
};
const lvl_1 = () => {
    changeLevel(playerCharacterSelection, setSectionLVL(1));
    let currentNumber = createRandomForLVL();
    const currentOptions = [currentNumber];
    let sectionResponse = "";
    console.log(currentNumber);
    let newNumber;
    while (currentOptions.length < 4) {
        newNumber = createRandomForLVL();
        if (!currentOptions.includes(newNumber)) currentOptions.push(newNumber);
    }
    console.log(currentOptions);
    const currentIcon = charactersData[playerCharacter]["food"]["icon"];
    const currentDescription = charactersData[playerCharacter]["food"]["description"];
    shuffleData(currentOptions);
    console.log(currentOptions);
    let listLength = currentOptions.length;

    for (let x = 0; x < currentOptions.length; x++) {
        selector(`.lvl_1_option_${x + 1}`).setAttribute("value", currentOptions[x]);
        let content = "";
        for (let y = 0; y < currentOptions[x]; y++) {
            content += currentIcon;
        }
        const label = selector(`.lvl_1_option_${x + 1}_label`);
        label.setAttribute("data-ref", currentOptions[x]);
        label.querySelector(".content").textContent = content;
    }
    setTitle("Nivel 1");
    setInstructiorns(`${playerName}, eres ${playerCharacterDescription !== "Mounstro de Frankenstein" ? "un" : "el"} ${playerCharacterDescription}, estas a punto de hacer tu comida, para preparar la receta necesitas seleccionar la mesa que contiene:`);
    setSectionLVL(1).querySelector(".number_placeholder").textContent = currentNumber;
    setSectionLVL(1).querySelector(".icon_container").textContent = currentIcon;
    setSectionLVL(1).addEventListener("submit", (e) => {
        e.preventDefault();
        for (let x = 0; x < setSectionLVL(1).elements.length; x++) {
            let field = setSectionLVL(1).elements[x];
            if (field.checked === true) {
                sectionResponse = field.value;
            }
        }
        console.log(sectionResponse);
    });
};
playerDataSection.addEventListener("submit", (e) => {
    e.preventDefault();
    for (let x = 0; x < playerDataSection.elements.length; x++) {
        let field = playerDataSection.elements[x];
        if (field.name === "name") playerName = field.value;
        if (field.name === "level") playerLVL = field.value;
    }
    startGame();
});
selectorAll("[type='radio']").forEach((input) => {
    input.addEventListener("input", () => {
        console.log(input);
        const currentInputName = input.name;
        const currentInputValue = input.value;
        console.log(currentInputName);
        console.log(currentInputValue);

        selectorAll("LABEL").forEach((label) => {
            const ref = label.getAttribute("data-ref");
            console.log(label);
            if (currentInputValue === ref) {
                label.classList.add("option_active");
            } else {
                label.classList.remove("option_active");
            }
        });
    });
});

selectorAll(".character_selection").forEach((radio) => {
    radio.addEventListener("input", () => {
        if (radio.checked) {
            selectorAll(".character_img").forEach((img) => {
                if (img.getAttribute("data-ref") === radio.value) {
                    img.style.opacity = 0.7;
                } else {
                    img.style.opacity = 0.1;
                }
            });
        }
    });
});

/* playerName = "John";
playerLVL = "primero";

startGame(); */
