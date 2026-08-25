# React Use Local Storage Sync

[![CI](https://github.com/heba-dora/react-use-local-storage-sync/actions/workflows/ci.yml/badge.svg)](https://github.com/heba-dora/react-use-local-storage-sync/actions/workflows/ci.yml)

An enterprise-grade React hook for seamless cross-tab `localStorage` synchronization, designed with strict SSR hydration safety for Next.js and Remix architectures.

## Installation

```bash
npm install react-use-local-storage-sync
```

## Features
- 🚀 **Cross-Tab Sync**: Instantly updates state across all open browser tabs using the `storage` event.
- 🛡️ **Hydration Safe**: Prevents React hydration mismatches on server-side rendered applications.
- 📦 **Strictly Typed**: Full TypeScript support with generic type inference.
- ✅ **Tested**: 100% Jest coverage mocking the Storage API.

## Usage

```tsx
import { useLocalStorageSync } from 'react-use-local-storage-sync';

function App() {
  const [token, setToken] = useLocalStorageSync('auth_token', '');

  return (
    <div>
      <p>Current Token: {token}</p>
      <button onClick={() => setToken('new_secure_token')}>Update Token</button>
    </div>
  );
}
```

## License
MIT
