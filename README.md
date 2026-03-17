# 🌟 ProTrainer - GTA San Andreas Definitive Edition Mod Menu 🌟

![GTA San Andreas](https://img.shields.io/badge/GTASA-Definitive%20Edition-success?style=for-the-badge)
![JavaScript](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)

ProTrainer is a highly modular, lightweight, and powerful Mod Menu written in JavaScript specifically designed for **Grand Theft Auto: San Andreas - The Definitive Edition** running on the CLEO Redux framework.

## ✨ Features

Our modular architecture ensures performance and vast capabilities:

*   🧍 **Player Module**: God mode, infinite stamina, wanted level management, change skins.
*   🗺️ **Teleport Module**: Waypoint teleportation, fast travel to safehouses and key locations.
*   🚗 **Vehicles Module**: Vehicle spawner (all game vehicles), repair/flip/clean your current vehicle instantly.
*   🛠️ **Vehicle Mods Module**: Directly apply colors, paintjobs, nitro, and performance upgrades on the fly.
*   🔫 **Weapons Module**: Give yourself any weapon, infinite ammo, no reload.
*   💻 **Core UI**: Extremely clean, native-looking graphical user interface for seamless navigation.

## 🚀 Installation

1.  **Prerequisites**: Make sure you have [CLEO Redux](https://cleo.li/) installed for GTA SA: DE.
2.  **Download**: Clone this repository or download the latest release from the [Releases page](../../releases).
3.  **Install**:
    *   Drop `ProTrainer.js` into your `Gameface/Binaries/Win64/CLEO/` folder.
    *   Drop the entire `ProTrainer` folder (containing `core` and `modules`) into the same `CLEO` folder.
4.  **Play**: Launch the game, wait for the CLEO initialized notification, and press `f4` to open the menu!

## 📂 Project Structure

```text
📁 ProTrainer-ModMenu/
├── 📄 ProTrainer.js        # Main initialization script
└── 📁 ProTrainer/          # Dedicated mod directory
    ├── 📁 core/            # Core scripts (e.g., UI rendering)
    │   └── ui.js
    └── 📁 modules/         # Feature modules
        ├── player_module.js
        ├── teleport_module.js
        ├── vehicle_mods_module.js
        ├── vehicles_module.js
        └── weapons_module.js
```

## 🤝 Contributing

Contributions, feature requests, and bug reports are highly welcome! 
1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

---
*Made with ❤️ for the GTA Modding Community.*
