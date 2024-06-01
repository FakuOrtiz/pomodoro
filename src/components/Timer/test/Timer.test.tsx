import { render, screen } from "@testing-library/preact";
import { vi } from "vitest";
import Timer from "../Timer";

describe("Timer", () => {
  beforeEach(() => {
    render(<Timer />);
  });

  test("should show study emojis", () => {
    expect(screen.queryByText(/📚 📖 ✏️/i)).toBeTruthy();
  });

  test("should not show break emojis", () => {
    expect(screen.queryByText(/☕ 🧉 🌿/i)).toBeNull();
  });

  test("should not show success emojis", () => {
    expect(screen.queryByText(/🎉 ✨ 🎊/i)).toBeNull();
  });

  test("should render a button", () => {
    expect(screen.getByRole("button")).toBeDefined();
  });
});

//This is because the worker is not running in the test environment
//Shows "Woker is not defined" error when running tests

const WorkerMock = vi.fn(() => ({
  postMessage: vi.fn(),
  onmessage: vi.fn(),
  terminate: vi.fn(),
}));

vi.stubGlobal("Worker", WorkerMock);
