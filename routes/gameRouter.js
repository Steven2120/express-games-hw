const express = require("express");

const router = express.Router();

const uuidv4 = require("uuid").v4;

let games = [
  {
    id: "adowb1b3bb",
    game: "League of Legends",
    description:
      "League of Legends is a team-based game with over 140 champions to make epic plays with.",
  },
  {
    id: "kd7b9ks2nda",
    game: "PlayerUnknown's Battlegrounds",
    description:
      "PLAYERUNKNOWN'S BATTLEGROUNDS is a last-man-standing shooter being developed with community feedback.",
  },
];

router.get("/get-all-games", function (req, res) {
  res.json({ payload: games });
});

router.get("/get-game-by-id/:id", function (req, res) {
  const { id } = req.params;

  let foundGame = games.findIndex((item) => {
    return item.id === id;
  });
  if (foundGame === -1) {
    res.status(404).json({
      message: "The game with the id does not exist, please check id",
    });
  } else {
    res.json({
      payload: games[foundGame],
    });
  }
});

router.post("/create-new-game", function (req, res) {
  const { name } = req.body;
  const { description } = req.body;
  let newGame = { id: uuidv4(), name, description };

  let gameFound;

  if (!name || !description) {
    res.json({
      message: "cannot leave text area blank",
    });
  }

  games.forEach((item) => {
    if (
      newGame.game === item.game ||
      newGame.description === item.description ||
      newGame.id === item.id
    ) {
      gameFound = true;
    }
  });
  if (gameFound) {
    res.json({
      message: "Game already exists, cannot add game",
    });
  } else {
    games.push(newGame);
    res.json({ games });
  }
});

router.put("/update-game/:id", function (req, res) {
  let canUpdate = false;
  let foundGame;
  games.forEach(function (item) {
    if (item.id === req.params.id) {
      canUpdate = true;
      foundTeam = item;
    }
  });
  if (canUpdate) {
    let isFound = games.findIndex((item) => item.game === req.body.updatedName);
    if (isFound > -1) {
      res.json({ message: "Cannot update because game already exists" });
    } else {
      foundGame.game = req.body.updatedName;
      res.json({ foundGame });
    }
  } else {
    res.json({ message: "Game not found! Cannot update!" });
  }
});

router.delete("/delete-game/:id", function (req, res) {
  let isFound = games.findIndex((item) => item.id === req.params.id);
  if (isFound === -1) {
    res.json({ message: "ID Not Found!" });
  } else {
    games.splice(isFound, 1);
    res.json({ games });
  }
});

module.exports = router;
