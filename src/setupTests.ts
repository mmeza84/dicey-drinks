import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";

Object.assign(global, {
  TextEncoder,
  TextDecoder,
});

// Mock import.meta.env for tests
Object.defineProperty(global, "import", {
  value: {
    meta: {
      env: {
        VITE_SUPABASE_URL: "https://test-supabase-url.supabase.co",
        VITE_SUPABASE_ANON_KEY: "test-anon-key",
      },
    },
  },
});

// Mock Supabase client
jest.mock("@/utils/supabase", () => ({
  __esModule: true,
  default: {
    from: jest.fn(() => ({
      select: jest.fn(() => Promise.resolve({ data: [], error: null })),
      insert: jest.fn(() => Promise.resolve({ data: [], error: null })),
      update: jest.fn(() => Promise.resolve({ data: [], error: null })),
      delete: jest.fn(() => Promise.resolve({ data: [], error: null })),
    })),
  },
}));

// Mock console.log to reduce noise in tests
global.console = {
  ...console,
  log: jest.fn(),
};
