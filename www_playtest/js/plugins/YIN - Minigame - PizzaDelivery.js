//-----------------------------------------------------------------------------
// OMORI Minigame - Pizza Delivery
//-----------------------------------------------------------------------------

Game_Interpreter.prototype.initPizzaDelivery = function () {
    ImageManager.loadPicture("PIZZA-Background");
    ImageManager.loadAtlas("MN_PizzaItems");

    $gameSystem._chosenHouses = [];
    $gameSystem._checkedHouses = [];

    var _pizzaHouse1 = this.generateHouse(1);
    var _pizzaHouse2 = this.generateHouse(2);
    var _pizzaHouse3 = this.generateHouse(3);

    this._pizzaHouse1 = _pizzaHouse1;
    this._pizzaHouse2 = _pizzaHouse2;
    this._pizzaHouse3 = _pizzaHouse3;

    // this.checkImages();
}

Game_Interpreter.prototype.checkImages = function () {
    var houseText = this.houseHints();
    for (var i = 1; i < 37; i++) {
        // console.log(houseText[i]);
        for (var j = 0; j < houseText[i].length; j++) {
            // console.log(houseText[i][j]);
            text = houseText[i][j];
            text = text.split(" ");
            for (var word = 0; word < text.length; word++) {
                ImageManager.loadPicture('PIZZA-' + text[word]);
            }
        }
    }
}

Game_Interpreter.prototype.houseHints = function () {
    return {
        1: ["Cans In The Yard", "Red PickupTruck", "Green Rug", "Cans By The Garbage", "RunDown Brown Roof", "Boarded Up Window", "Brick Front", "No Fence", "Roots In The Yard", "Plants On The Driveway", "Garbage Lined Up In The Front"],

        2: ["Dark Green PickupTruck", "Purple Rug", "Stone Chimney In The Yellow Roof", "Yellow Door With Windows", "Windows In The Door"],

        3: ["White Rug", "Dark Pink Door", "Tether Ball In The Yard", "Pink Roof", "One Pink Front Window", "Purple Flowers By The Window"],

        4: ["Gray Rug", "Orange Door", "Cones In Front Of The Driveway", "Light Blue Roof", "Ladder By The Tree"],
        //-----------------------------------------
        5: ["Gray Car", "Large Rock In The Yard", "Flowers By The Large Rock", "Purple Rug", "Orange Roof", "Brick Front", "No Garbage Cans"],

        6: ["White Door", "Dark Blue Roof With The Stone Chimney", "Beat Up Front", "Easel In The Yard", "Plants In The Yard"],

        7: ["Red PickupTruck", "Light Yellow Door With Windows", "Boxes In The Side Yard", "Purple Flowers By The Yellow Window", "Dark Purple Rug", "No Garbage Can", "Red Roof", "No Fence"],

        8: ["Purple Roof With A Chimney", "Messy Yard", "Brown Rug", "No Fence", "Ladder By The Door", "Hydrant Out Front", "Dark Red Door"],
        //-----------------------------------------
        9: ["Light Brown Roof", "Pink Door", "Gray PickupTruck", "No Fence"],

        10: ["Yellow Roof", "Tires In The Yard", "White Door With No Windows", "Picnic Table On The Side", "Grill In The Yard"],

        11: ["Blue Roof", "Light Brown Door", "Brown Rug", "Dog House", "Roots In The Yard"],

        12: ["Light Green Roof", "Toys In The Yard", "Cans By The White Fence", "White Rug", "One Green Window", "Large Rock In The Yard", "Hydrant Out Front"],
        //-----------------------------------------======================================================================================================================================================================================
        13: ["Light By The Driveway", "Dark Green Rug", "Blue PickupTruck", "Brown Fence With Bushes", "Hydrant Out Front", "Purple Brick Chimney In A Dark Green Roof"],

        14: ["Brown Roof", "Roots And Flowers In The Yard", "Tree Lined Entrance", "Dark Yellow Rug", "Dark Red Door", "White Garage Door"],

        15: ["Blue Roof With The Blue Brick Chimney", "White Brick Front", "Green PickupTruck", "Garbage On The Left Side", "Hoops In The Yard", "Tether Ball", "Bushes By The Light Brown Garage Door"],

        16: ["Pink Car In The Driveway", "Brown Roof With Dark Green Chimney", "Yellow Door With Windows", "Yellow Flowers In The Bushes"],
        //-----------------------------------------
        17: ["White Car", "Light Pink Garage Door", "Light Pink Rug", "White Door With Windows", "Dirt Patch By The Fence", "Light Gray Roof", "Flowers In The Yard", "Boxes By The Garage Door"],

        18: ["Dark Brown Brick Roof", "Garage Door With No Windows", "Beat Up Fence", "Green PickupTruck", "Garbage Out Front", "Yellow Flowers In The Bushes", "Trees In The Yard", "Couch In The Garbage"],

        19: ["Red Roof", "Messy Garbage On The Left Side", "Blue Rug", "Gray Door", "Rock Lined Driveway", "Bottles And Cans In The Yard", "Tree By The Door", "No Windows In The Garage Door", "Red Brick Chimney"],

        20: ["Light Brown Roof", "Orange Door", "Garbage On The Side Of The Driveway", "Gray Car", "Brown Chimney", "Flowers Bushes Lined Driveway"],
        //-----------------------------------------
        21: ["Purple Roof", "Purple Chimney", "Pink Door", "Dark Red Garage Door", "Hydrant Out Front", "Dark Blue Rug", "Pink Car", "Birdhouse In The Yard", "Mailbox Out Front", "Flowers Boxes In The Yard", "Grill On The Right Side", "Wood Planks By The Trees"],

        22: ["Dark Brown Door", "Dark Green Roof", "White Brick Front", "Plants By The Door", "Mulch On The Side Of The Yard", "Garbage By The Fence", "Dog House", "Purple Brick Chimney", "Hoops"],

        23: ["Yellow Roof", "Work Table On The Side", "Tools In The Yard", "Yellow Rug", "Gray PickupTruck", "White Garage Door With Windows", "Tires In The Yard"],

        24: ["Red PickupTruck", "Blue Roof", "Cones Out Front", "Yellow Door With Windows", "Flamingo", "Birdhouse", "Blue Brick Chimney"],
        //-----------------------------------------======================================================================================================================================================================================
        25: ["Purple Roof", "White Rug", "Flamingo And Trees On The Driveway", "Brown Fence On The Left Side", "Gray Stone Chimney", "One Pink Window", "Grill By The Picnic Table"],

        26: ["Light Brown Roof", "Brown Door", "Hoops By The Brown Fence", "Purple Rug", "Two Black Garbage Cans", "Toys In The Yard", "Light Brown Brick Front", "Cones Out Front"],

        27: ["Dark Brown Roof", "Sign Out Front", "Roots In The Yard", "Red Flowers By The Yellow Window"],

        28: ["Flowers Lined Path", "Garbage On The Left And Right Side", "Two Green Garbage Cans On The Right", "White Roof", "White Door", "Hydrant Out Front", "White Stone Chimney"],
        //-----------------------------------------
        29: ["Yellow Roof", "Dark Red Door", "Brown Rug", "Garbage In The Front", "Tires In The Yard", "Ladder By The Door", "Gray PickupTruck", "Blue PickupTruck", "Wood Planks On The Side"],

        30: ["White Fence", "Pink Car", "Flowers Lined Driveway", "Light Brown Roof", "Grill On The Left Side", "Dark Pink Door"],

        31: ["Dark Brown Roof", "Swing", "Tether Ball", "Flowers In The Yard", "Garbage On The Dirt Patch", "Small Dirt Path", "Toys Out Front"],

        32: ["Red Roof", "Gray Rug", "Orange Door", "Roots In The Yard", "Two Green Garbage Cans", "Beat Up Front", "Hydrant Out Front", "Ladder On The Wood Planks", "Gray Stone Chimney"],
        //-----------------------------------------
        33: ["Gray Roof", "Brick Front", "Purple Rug", "Ladder By The Door", "Two Garbage Cans", "Bottles By The Garbage", "Dog House", "Wood Planks In The Yard", "No Fence", "Gray PickupTruck Out Front"],

        34: ["White Car Out Front", "Mailbox Out Front", "Cans By The Garbage Out Front", "Light Blue Roof", "Trees By The Entrance", "Light Red Door", "Hoops", "Light Green Rug"],

        35: ["Yellow Car Out Front", "Red Flowers By The Window", "Flowers By The Small Path", "Mulch In The Yard", "Blue Roof", "Dark Blue Rug", "Trees In Front Of The White Fence"],

        36: ["Hydrant Out Front", "No Fence", "Purple Flowers By The Pink Window", "Garbage On The Right Side By The Toys", "Pink Door", "White Roof", "Gray Car", "Car Toys In The Yard"],
    }
}

Game_Interpreter.prototype.generateHouse = function (neighborhood) {
    var neighborhoodHouses = {
        1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        2: [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
        3: [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]
    }

    var houseHintsPt1 = this.houseHints();
    var chosenHouse = $gameSystem.randomizeArray(neighborhoodHouses[neighborhood])[0];

    while (!chosenHouse || $gameSystem._chosenHouses.contains(chosenHouse)) {
        chosenHouse = $gameSystem.randomizeArray(neighborhoodHouses[neighborhood])[0];
    }
    // console.log(chosenHouse);


    $gameSystem._chosenHouses.push(chosenHouse);
    var wordPool = houseHintsPt1[chosenHouse];

    $gameSystem.randomizeArray(wordPool);
    var description1 = wordPool[0];
    wordPool.splice(0, 1);

    $gameSystem.randomizeArray(wordPool);
    var description2 = wordPool[0];
    wordPool.splice(0, 1);

    $gameSystem.pizza = [description1, description2];

    var partPool = [
        "This Pizza Goes Down The Street To The House With The ",
        "Please Take This Pizza To The House With The ",
        "Look For The House That Has The ",
        "This Pizza Goes To The House With The ",
        "Take The Pizza To The House That Has The ",
        "Find The House With The ",
        "Can You Find The House With The ",
        "Take This Pizza To The House With The ", 
        "Take This Pizza Down The Street To The House With The ",
        "Please Find The House With The ",
        "This Pizza Goes To The House That Has The ",
        "Can You Find The House That Has The "
    ]

    $gameSystem.randomizeArray(partPool);
    var part = partPool[0];

    var text = part + $gameSystem.pizza[0] + " And The " + $gameSystem.pizza[1];
    if (text.contains("The No")) {
        text = text.replace("The No", "No");
    }

    return text;
}

Game_Interpreter.prototype.showPizzaNote = function (text) {
    AudioManager.playSe({name: 'GEN_mess_paper', volume: 100, pitch: 100})
    if (text === 0) text = this._pizzaHouse1;
    if (text === 1) text = this._pizzaHouse2;
    if (text === 2) text = this._pizzaHouse3;

    var note = SceneManager._scene._pizzaNote = new Window_PizzaDeliveryNote(text);
    SceneManager._scene.addChild(note);
}

Game_Interpreter.prototype.correctHouse = function (houseID) {
    if (houseID === $gameSystem._chosenHouses[$gameVariables.value(817)]) return true;
    return false;
}

Game_Interpreter.prototype.checkedHouseAlready = function () {
    if (!$gameSystem._checkedHouses.contains($gameVariables.value(822))) {
        $gameSystem._checkedHouses.push($gameVariables.value(822));
        return false;
    }
    return true;
}

Game_Interpreter.prototype.checkingCurrentHouse = function (houseID) {
    $gameVariables.setValue(822, houseID);
}

//=============================================================================
//
//=============================================================================
Game_System.prototype.randomizeArray = function (array) {
    if (!array) return;
    var curElement = array.length;
    var temp;
    var randomizedLoc;
    while (0 !== curElement) {
        randomizedLoc = Math.floor(Math.random() * curElement);
        curElement -= 1;
        temp = array[curElement];
        array[curElement] = array[randomizedLoc];
        array[randomizedLoc] = temp;
    };
    return array;
}

//=============================================================================
//
//=============================================================================
function Window_PizzaDeliveryNote() {
    this.initialize.apply(this, arguments);
}

Window_PizzaDeliveryNote.prototype = Object.create(Window_Base.prototype);
Window_PizzaDeliveryNote.prototype.constructor = Window_PizzaDeliveryNote;

Window_PizzaDeliveryNote.prototype.initialize = function (text) {
    var x = (Graphics.boxWidth - this.windowWidth()) / 2;
    var y = (Graphics.boxHeight - this.windowHeight()) / 3;
    Window_Base.prototype.initialize.call(this, x, y, this.windowWidth(), this.windowHeight());
    this.opacity = 0;
    this.refresh(text);
};

Window_PizzaDeliveryNote.prototype.standardPadding = function () {
    return 0;
}

Window_PizzaDeliveryNote.prototype.refresh = function (text) {
    this.contents.clear();
    this.visible = true;
    var bitmap = ImageManager.loadPicture('PIZZA-Background');
    this.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, 0, 0);
    text = text.split(" ");
    // console.log(text);
    var nextX = 24;
    var nextY = 32;
    for (var i = 0; i < text.length; i++) {
        var bitmap = ImageManager.loadPicture('PIZZA-' + text[i]);
        if (nextX + bitmap.width > 580) {
            nextX = 24;
            nextY += 64;
        }
        this.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, nextX, nextY);
        nextX = nextX + bitmap.width + 20;
    }
}

Window_PizzaDeliveryNote.prototype.update = function () {
    Window_Base.prototype.update.call(this);
    if (Input.isTriggered("ok")) {
        this.closeNote();
    }
}

Window_PizzaDeliveryNote.prototype.windowWidth = function () {
    return Graphics.boxWidth - 20;
};

Window_PizzaDeliveryNote.prototype.windowHeight = function () {
    return Graphics.boxHeight - 40;
};

Window_PizzaDeliveryNote.prototype.closeNote = function () {
    this.close();
    this.visible = false;
    SceneManager._scene.removeChild(SceneManager._scene._pizzaNote);
}

var yin_updateCallMenu = Scene_Map.prototype.updateCallMenu;
Scene_Map.prototype.updateCallMenu = function () {
    if ($gamePlayer.canMove() && this.isMenuCalled() && $gameSwitches.value(818)) {
        if ((SceneManager._scene._pizzaNote && !SceneManager._scene._pizzaNote.visible)) {
            SceneManager._scene._pizzaNote.closeNote();
            $gameMap._interpreter.showPizzaNote($gameVariables.value(817));
            return;
        } else if (!SceneManager._scene._pizzaNote) {
            $gameMap._interpreter.showPizzaNote($gameVariables.value(817));
        }
    } else {
        yin_updateCallMenu.apply(this);
    }
}

var yin_Pizza_moveByInput = Game_Player.prototype.moveByInput;
Game_Player.prototype.moveByInput = function () {
    if (SceneManager._scene._pizzaNote && SceneManager._scene._pizzaNote.visible) return;
    yin_Pizza_moveByInput.call(this);
};

Game_Character.prototype.getRandomNPCGraphic = function () {
    this._opacity = 0;
    this._characterName = $gameSystem.randomizeArray(["FA_PizzaPeople_01", "FA_PizzaPeople_02"])[0];
    this._characterIndex = $gameSystem.randomizeArray([0, 1, 2, 3, 4, 5, 6, 7])[0];
    var frame = 1;
    this._direction = 2;
    this._pattern = this._originalPattern = frame % 3;
    this._priorityType = 2;
}
