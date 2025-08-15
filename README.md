# 🎡 SpinWheeler

SpinWheeler is an interactive **"Spin the Wheel"** game platform that allows users to **create, publish, and share custom spin wheels** with friends, communities, or audiences. Players can join a game via a unique link or Game ID and spin for rewards.

---

## 🚀 Features

- **Create custom wheels** with unlimited segments
- **Assign rewards** (points, items, prizes) to each segment
- **Publish & share** games via a unique Game ID or link
- **Live preview** of wheel during creation
- **Public spins** with fun animations
- **Spin history tracking**
- **Firebase-powered backend** for real-time data
- **Responsive design** with Tailwind CSS

---

## 🛠 Tech Stack

- **Frontend:** [Vite](https://vitejs.dev/) + [React](https://react.dev/) + [Tailwind CSS](https://tailwindcss.com/)
- **Backend:** [Firebase Firestore](https://firebase.google.com/docs/firestore) + Firebase Auth
- **State Management:** React Context API
- **Deployment:** Vercel / Netlify

---

## 📂 Project Architecture

```
spinwheeler/
│
├── public/ # Static assets (favicon, logo, etc.)
├── src/
│ ├── assets/ # Images, icons, fonts
│ ├── components/ # Reusable UI components
│ │ ├── Button.jsx
│ │ ├── InputField.jsx
│ │ ├── Wheel.jsx # The wheel component
│ │ ├── Modal.jsx
│ │ └── Navbar.jsx
│ │
│ ├── pages/ # Full-page components (routing targets)
│ │ ├── Landing.jsx
│ │ ├── CreateGame.jsx
│ │ ├── Rewards.jsx
│ │ ├── Publish.jsx
│ │ ├── SpinGame.jsx
│ │ └── NotFound.jsx
│ │
│ ├── hooks/ # Custom hooks
│ │ ├── useWheelSpin.js
│ │ └── useGameData.js
│ │
│ ├── context/ # React Context API for global state
│ │ ├── GameContext.jsx
│ │
│ ├── services/ # API calls, backend interaction
│ │ ├── gameService.js
│ │
│ ├── utils/ # Utility functions
│ │ ├── randomizeArray.js
│ │ └── validateInput.js
│ │
│ ├── App.jsx
│ ├── main.jsx
│ └── index.css # Tailwind base styles
│
├── tailwind.config.js
├── package.json
└── vite.config.js
```

---

## 🔥 Firebase Data Structure

```json
{
  "games": {
    "gameId_abc123": {
      "title": "My First Wheel",
      "creatorId": "user_001",
      "createdAt": "2025-08-15T10:15:00Z",
      "status": "published",
      "segments": [
        {
          "label": "Run",
          "color": "#FF5733",
          "reward": {
            "type": "points",
            "value": 50
          }
        }
      ],
      "spins": {
        "spin_001": {
          "userId": "guest",
          "timestamp": "2025-08-15T10:30:00Z",
          "result": {
            "label": "Run",
            "reward": {
              "type": "points",
              "value": 50
            }
          }
        }
      }
    }
  }
}
  "games": {
    "gameId_abc123": {
      "title": "My First Wheel",
      "creatorId": "user_001",
      "createdAt": "2025-08-15T10:15:00Z",
      "status": "published",
      "segments": [
        {
          "label": "Run",
          "color": "#FF5733",
          "reward": {
            "type": "points",
            "value": 50
          }
        }
      ],
      "spins": {
        "spin_001": {
          "userId": "guest",
          "timestamp": "2025-08-15T10:30:00Z",
          "result": {
            "label": "Run",
            "reward": {
              "type": "points",
              "value": 50
            }
          }
        }
      },
      "usersPlaying": 0
    }
  },
  "users": {
    "creatorId_001": {
      "timestamp": "2025-08-15T10:30:00Z",
      "points": 0,
      "played_games": {
        "gameId_abd123": {
          "spins": 3,
          "timestamp": "2025-08-15T10:45:00Z",
          "timePlayed": "0s"
        }
      },
      "created_games": {
        "gameId_abc123": {
          "timestamp": "2025-08-15T10:15:00Z",
          "usersPlaying": 5
        }
      }
    }
  }
}

```

## 👤 User Data Structure

````json
## 👤 User Data Structure

```json
{
  "users": {
    "user_001": {
      "uid": "user_001",
      "displayName": "Jane Doe",
      "username": "janedoe",
      "photoURL": "https://gabrielcool.com/avatar.png",
      "createdAt": "2025-08-15T10",
      "updatedAt": "2025-08-15T12",

      "role": "user", // or "admin"
      "isBanned": false,

      "stats": {
        "points": 1200,
        "totalSpins": 3,
        "gamesCreated": 2
      },

      "preferences": {
        "theme": "system",
        "notifications": {
          "spins": true,
          "follows": true,
          "marketing": false
        }
      },

      "playedGames": {
        "gameId_abc123": {
          "spinsCount": 2,
          "lastSpinAt": "2025-08-15"
        },
        "gameId_xyz789": {
          "spinsCount": 1,
          "lastSpinAt": "2025-08-15"
        }
      },

      "generatedGames": {
        "gameId_abc123": {
          "createdAt": "2025-08-15",
          "playersCount": 57,
          "status": "published"
        },
        "gameId_lmn456": {
          "createdAt": "2025-08-15",
          "playersCount": 12,
          "status": "draft"
        }
      }
    }
  }
}
````

## 🔐 Firestore Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null && request.auth.uid == userId;
      allow update, delete: if request.auth != null && request.auth.uid == userId;
    }

    match /games/{gameId} {
      allow read: if resource.data.status == "published" ||
                  (request.auth != null && request.auth.uid == resource.data.creatorId);
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null &&
                            request.auth.uid == resource.data.creatorId;

      match /spins/{spinId} {
        allow create: if get(/databases/$(database)/documents/games/$(gameId))
                        .data.status == "published";
        allow read: if get(/databases/$(database)/documents/games/$(gameId))
                        .data.status == "published" ||
                     (request.auth != null &&
                      request.auth.uid == get(/databases/$(database)/documents/games/$(gameId))
                        .data.creatorId);
      }
    }
  }
}
```

## 🚦 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/spinwheeler.git
cd spinwheeler
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Setup Firebase

1. Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/)
2. Enable Firestore & Authentication
3. Add your Firebase config to `.env`:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 4️⃣ Start Development Server

```bash
npm run dev
```

---

## 📜 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Abdulsamad Sadiq**  
Passionate blockchain developer & builder 🚀
