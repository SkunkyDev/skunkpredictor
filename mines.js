// Visual-only mode with backend preserved
(function () {
  const _0x1e201b = function () {
    let _0x3a5d0c = true;
    return function (_0x5dc369, _0x454eec) {
      const _0x485d23 = _0x3a5d0c ? function () {
        if (_0x454eec) {
          const _0x32b13b = _0x454eec.apply(_0x5dc369, arguments);
          _0x454eec = null;
          return _0x32b13b;
        }
      } : function () {};
      _0x3a5d0c = false;
      return _0x485d23;
    };
  }();
  (function () {
    _0x1e201b(this, function () {
      const _0x1e90c6 = new RegExp("function *\\( *\\)");
      const _0x24f289 = new RegExp("\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)", "i");
      const _0xe0e3aa = _0x2aeb3f("init");
      if (!_0x1e90c6.test(_0xe0e3aa + "chain") || !_0x24f289.test(_0xe0e3aa + "input")) {
        _0xe0e3aa("0");
      } else {
        _0x2aeb3f();
      }
    })();
  })();
  const _0x3b89a5 = function () {
    let _0x49e722 = true;
    return function (_0x2e3fbc, _0x4e99b3) {
      const _0x28a5c2 = _0x49e722 ? function () {
        if (_0x4e99b3) {
          const _0x5e4f79 = _0x4e99b3.apply(_0x2e3fbc, arguments);
          _0x4e99b3 = null;
          return _0x5e4f79;
        }
      } : function () {};
      _0x49e722 = false;
      return _0x28a5c2;
    };
  }();
  const _0x513264 = _0x3b89a5(this, function () {
    const _0x3ce093 = function () {
      let _0x5f4c29;
      try {
        _0x5f4c29 = Function("return (function() {}.constructor(\"return this\")( ));")();
      } catch (_0x55c988) {
        _0x5f4c29 = window;
      }
      return _0x5f4c29;
    };
    const _0x6f7ed8 = _0x3ce093();
    const _0x23d6b0 = _0x6f7ed8.console = _0x6f7ed8.console || {};
    const _0xd0316c = ["log", "warn", "info", "error", "exception", "table", "trace"];
    for (let _0x50e0b7 = 0; _0x50e0b7 < _0xd0316c.length; _0x50e0b7++) {
      const _0x3a2ab8 = _0x3b89a5.constructor.prototype.bind(_0x3b89a5);
      const _0x2d8ebf = _0xd0316c[_0x50e0b7];
      const _0x4a99f7 = _0x23d6b0[_0x2d8ebf] || _0x3a2ab8;
      _0x3a2ab8.__proto__ = _0x3b89a5.bind(_0x3b89a5);
      _0x3a2ab8.toString = _0x4a99f7.toString.bind(_0x4a99f7);
      _0x23d6b0[_0x2d8ebf] = _0x3a2ab8;
    }
  });
  _0x513264();
  'use strict';
  const _0x32f0b1 = {
    tile: "[data-test=\"mines-tile\"]",
    mines: "[data-test=\"mines-count\"]",
    bet: "[data-testid=\"bet-button\"]",
    cash: "[data-testid=\"cashout-button\"]",
    balance: "[data-test=\"balance\"]",
    betAmount: "[data-test=\"bet-amount\"]"
  };
  _0x32f0b1.currency = "[data-test=\"currency-selector\"]";
  const _0xa7dde3 = {
    device: "dvid",
    key: "lkey",
    stats: "game_stats"
  };
  const _0xed07cd = {
    retry: 0x1f4,
    click: 0x258
  };
  _0xed07cd.max = 0x3;

  class _0x5f8785 {
    constructor() {
      this.config = {
        "api": atob("aHR0cHM6Ly9zb3VsYXBpLnZlcmNlbC5hcHA="),
        "stakeApi": "https://stake." + webUrl + "/_api/graphql",
        "selectors": _0x32f0b1,
        "headers": {
          "Content-Type": "application/json",
          "x-access-token": document.cookie.match(/session=([^;]+)/)?.[1] || '',
          "Origin": "https://stake." + webUrl,
          "Referer": "https://stake." + webUrl + "/casino/games/mines"
        },
        "storage": _0xa7dde3,
        "timing": _0xed07cd
      };
      this.state = {
        mode: 'visual',
        "active": false,
        "history": new Map(),
        "clicks": 0x8,
        "stats": this.loadStats(),
        "statsVisible": false,
        "balance": 0x0,
        "currency": "ltc",
        "lastProfit": 0x0,
        "sessionStats": {
          startBalance: 0x0,
          currentBalance: 0x0,
          profit: 0x0
        }
      };
      this.autoplayState = {
        isAutoPlaying: false,
        currentMines: 0x0,
        gamesPlayed: 0x0,
        clicksForCurrentGame: 0x0,
        isDoubled: false,
        waitingForWin: false,
        baseAmount: true,
        currentBetAmount: 0.5,
        successfulWins: 0x0,
        clickLimit: 5, // Default click limit
        clickCount: 0 // Counter for clicks
      };
      this.init();
    }

    async init() {
      this.addStyles();
      this.createUI();
      this.setupDrag();
      this.createStatsTable();
      this.setupKeyboardShortcuts();
      const activationKey = localStorage.getItem(this.config.storage.key);
      if (activationKey) {
        const keyInput = this.find("#activation-key");
        if (keyInput) {
          keyInput.value = activationKey;
          await this.login();
        }
      }
    }

    async runAutoplaySequence() {
      this.autoplayState.clickCount = 0; // Reset click count
      this.autoplayState.clickLimit = parseInt(document.getElementById('click-limit').value) || 5; // Get click limit from input

      while (this.autoplayState.isAutoPlaying && this.autoplayState.clickCount < this.autoplayState.clickLimit) {
        try {
          await this.delay(200);
          const betButton = await this.waitForElement(this.config.selectors.bet, 10000);
          if (!betButton || betButton.disabled) {
            console.log("Waiting for game to be ready...");
            await this.delay(1000);
            continue;
          }

          this.autoplayState.currentMines = this.getRandomMines();
          this.autoplayState.clicksForCurrentGame = this.getRandomClicks(this.autoplayState.currentMines);
          await this.playAutoplayGame();
          this.autoplayState.clickCount++; // Increment click count
        } catch (error) {
          console.warn("Autoplay sequence error:", error);
          await this.delay(2000);
        }
      }

      if (this.autoplayState.clickCount >= this.autoplayState.clickLimit) {
        this.autoplayState.isAutoPlaying = false; // Stop autoplay when limit is reached
        console.log("Click limit reached. Autoplay stopped.");
        this.updateStatus("Click limit reached. Autoplay stopped.");
      }
    }

    async playAutoplayGame() {
      const betButton = await this.waitForElement(this.config.selectors.bet, 5000);
      if (!betButton || betButton.disabled) {
        throw new Error("Bet button not ready");
      }
      await this.delay(200);
      betButton.click();
      await this.delay(200);
      const tiles = await this.waitForElement(this.config.selectors.tile, 5000);
      if (tiles) {
        await this.playAutoplayRound(tiles);
      } else {
        throw new Error("Tiles not found");
      }
    }

    async playAutoplayRound(tiles) {
      this.initializeTiles(tiles);
      let clickCount = 0;

      while (clickCount < this.autoplayState.clicksForCurrentGame && this.autoplayState.isAutoPlaying) {
        try {
          const selectedTile = await this.selectTile(tiles);
          if (!selectedTile) {
            this.updateStats(false, clickCount, false);
            await this.delay(200);
            return;
          }
          clickCount++;
          await this.delay(200);
          const isMine = selectedTile.className.includes("mine");
          this.updateHistory(selectedTile, isMine);
          if (isMine) {
            this.updateStats(false, clickCount, true);
            return; // Stop on mine hit
          }
          if (clickCount === this.autoplayState.clicksForCurrentGame) {
            this.updateStats(true, clickCount, false);
            await this.cashout();
          }
        } catch (error) {
          console.warn("Round error:", error);
          await this.delay(1000);
          return;
        }
      }
    }

    updateStatus(message) {
      const statusMessage = document.getElementById('status-message');
      statusMessage.textContent = message;
    }

    // Other existing methods...

    // UI Creation
    createUI() {
      const predictorContainer = this.create("div", {
        "class": "predictor-container",
        "id": "predictor"
      }, `
        <h2 class="glow-text">Auto Clicker Menu</h2>
        <label for="click-limit">Set Click Limit:</label>
        <input type="number" id="click-limit" placeholder="Enter click limit" min="1" value="5" class="login-input">
        <button id="start-autoplay-button" class="control-button">Start Autoplay</button>
        <button id="stop-autoplay-button" class="control-button">Stop Autoplay</button>
        <div id="status-message"></div>
      `);
      document.body.appendChild(predictorContainer);

      document.getElementById('start-autoplay-button').onclick = () => {
        this.autoplayState.isAutoPlaying = true;
        this.runAutoplaySequence();
      };
      document.getElementById('stop-autoplay-button').onclick = () => {
        this.autoplayState.isAutoPlaying = false;
        this.updateStatus("Autoplay stopped.");
      };
    }

    // Other existing methods...
  }

  const _0x156303 = () => {
    try {
      window._predictor = new _0x5f8785();
    } catch (error) {
      console.warn("Initialization error:", error);
      setTimeout(_0x156303, 5000);
    }
  };

  if (document.readyState === "complete") {
    _0x156303();
  } else {
    window.addEventListener("load", _0x156303);
  }
})();
