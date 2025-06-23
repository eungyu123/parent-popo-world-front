import { vercelPreset } from '@vercel/react-router/vite';
import type { Config } from '@react-router/dev/config';

export default {
  ssr: false, // SPA 모드로 하고 싶으면 false
  presets: [vercelPreset()],
} satisfies Config;