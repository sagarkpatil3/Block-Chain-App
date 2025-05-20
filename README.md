# Private Block‑Chain‑App

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](LICENSE)

A minimal private‑blockchain prototype written in **Node.js**.  It demonstrates Proof‑of‑Work consensus, peer‑to‑peer networking via WebSockets, and a small wallet / transaction layer built on ECDSA keys.

> **Why?**  This repo is a learning exercise—small enough to read in an afternoon, yet complete enough to mine blocks, broadcast them to peers, and transfer coins between wallets.

---

## ✨  Core Features

| Area                       | What you’ll find                                                                                           | Where                                                                                                                                                                                                                      |
| -------------------------- | ---------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Blockchain**             | `Blockchain` class keeps an in‑memory chain starting with a `genesis()` block                              | `blockchain/index.js` ([github.com](https://github.com/sagarkpatil3/Block-Chain-App/raw/master/blockchain/index.js))                                                                                                       |
| **Proof‑of‑Work**          | Each call to `mineBlock()` crunches a SHA‑256 hash until it matches the current `difficulty` (default `3`) | `blockchain/block.js` ([github.com](https://github.com/sagarkpatil3/Block-Chain-App/raw/master/blockchain/block.js))                                                                                                       |
| **Difficulty retargeting** | `adjustDifficulty()` raises/lowers difficulty so blocks arrive \~ every `MINE_RATE` ms (`3000`)            | `config.js` ([github.com](https://github.com/sagarkpatil3/Block-Chain-App/raw/master/config.js))                                                                                                                           |
| **P2P mesh**               | Nodes gossip chains over WebSockets (`/p2p-server.js`) and auto‑sync on new blocks                         | `app/p2p-server.js` ([github.com](https://github.com/sagarkpatil3/Block-Chain-App/raw/master/app/p2p-server.js))                                                                                                           |
| **HTTP API**               | `GET /blocks`, `POST /mine` routes for quick testing                                                       | `app/index.js` ([github.com](https://github.com/sagarkpatil3/Block-Chain-App/raw/master/app/index.js))                                                                                                                     |
| **Wallet & Tx**            | ECDSA key‑pairs (`elliptic`), UTXO‑style outputs, basic `signTransaction()` helper                         | `wallet/{index,transaction}.js` ([github.com](https://github.com/sagarkpatil3/Block-Chain-App/raw/master/wallet/index.js), [github.com](https://github.com/sagarkpatil3/Block-Chain-App/raw/master/wallet/transaction.js)) |
| **Testing**                | Jest test runner & watch mode (`npm test`)                                                                 | `package.json` ([github.com](https://github.com/sagarkpatil3/Block-Chain-App/raw/master/package.json))                                                                                                                     |

---

## 🗂️  Project Layout

```
blockchain/      # Block & chain logic
wallet/          # Keys + transactions
app/             # Express + WebSocket servers
config.js        # Tunable constants (difficulty, mining rate, etc.)
chain-util.js    # Crypto helpers (hashing, key‑gen, UUID)
```

---

## 🚀  Getting Started

### Prerequisites

* **Node.js ≥ 20**
* npm (comes with Node) or yarn

### Install & Run a Single Node

```bash
git clone https://github.com/sagarkpatil3/Block-Chain-App.git
cd Block-Chain-App
npm install
npm run dev            # starts API on :3001 and P2P on :5001
```

### Spin Up Peers

```bash
# Terminal 1
npm run dev                  # HTTP 3001, P2P 5001

# Terminal 2
HTTP_PORT=3002 \
P2P_PORT=5002 \
PEERS="ws://localhost:5001" \
npm run dev
```

Each peer connects to addresses listed in **`PEERS`** (comma‑separated).

### Mine a Block

```bash
curl -X POST http://localhost:3001/mine \
     -H 'Content-Type: application/json' \
     -d '{"data":"Hello blockchain"}'
```

The new block is mined locally, broadcast to peers, and you can verify with:

```bash
curl http://localhost:3002/blocks   # peer’s view of the chain
```

---

## ⚙️  Configuration

| Env Var           | Purpose                                            | Default   |
| ----------------- | -------------------------------------------------- | --------- |
| `HTTP_PORT`       | REST API port                                      | `3001`    |
| `P2P_PORT`        | WebSocket port                                     | `5001`    |
| `PEERS`           | Comma‑separated list of peer WebSocket URLs        | *(empty)* |
| `DIFFICULTY`      | PoW leading‑zero difficulty (override `config.js`) | `3`       |
| `MINE_RATE`       | Target block time in ms                            | `3000`    |
| `INITIAL_BALANCE` | Wallet starting balance                            | `500`     |

---

## 🧪  Running Tests

```bash
npm test          # jest --watchAll
```

---

## 📈  Roadmap / Ideas

* Transaction pool & consensus on included TXs
* Networking handshake + message types (block, tx, peer discovery)
* Replace PoW with Proof‑of‑Stake (experiment)
* Docker compose file for multi‑node local cluster
* Front‑end dashboard to visualise the chain & mempool

Contributions or experiment branches are welcome—open a PR! 🙌

---

## 📄  License

This project is licensed under the **ISC License**—see the [LICENSE](LICENSE) file for details.
