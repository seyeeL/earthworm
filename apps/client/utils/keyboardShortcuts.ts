// 添加全局快捷键
interface Shortcut {
  key: string;
  ctrlKey: boolean;
  command: Function;
}

const shortcuts: Shortcut[] = [];

window.addEventListener("keyup", (e: KeyboardEvent) => {
  const shortcut = findMatchingShortcut(e);

  if (shortcut) {
    shortcut.command();
  }
});

function findMatchingShortcut(event: KeyboardEvent): Shortcut | undefined {
  return shortcuts.find((shortcut) => {
    return (
      shortcut.ctrlKey === event.ctrlKey &&
      shortcut.key === event.key.toLowerCase()
    );
  });
}

function parseKey(keyString: string) {
  const keys = keyString.toLowerCase().split("+");

  const result = {
    key: keys.pop()!, // 取数组最后一个元素作为 key
    ctrlKey: keys.includes("ctrl"),
  };

  return result;
}

export function registerShortcut(key: string, command: Function) {
  const shortcut = createShortcut(key, command);

  shortcuts.push(shortcut);

  return shortcut;
}

function createShortcut(key: string, command: Function): Shortcut {
  return {
    ...parseKey(key),
    command,
  };
}

export function cancelShortcut(key: string, command: Function): void;
export function cancelShortcut(shortcut: Shortcut): void;
export function cancelShortcut(
  keyOrShortcut: string | Shortcut,
  command?: Function
){
  if (typeof keyOrShortcut === "string") {
    const matchingShortcut = shortcuts.find((shortcut) => {
      return shortcut.key === keyOrShortcut && shortcut.command === command;
    });

    if (matchingShortcut) {
      const index = shortcuts.indexOf(matchingShortcut);
      shortcuts.splice(index, 1);
    }
  } else {
    const index = shortcuts.indexOf(keyOrShortcut);
    if (index !== -1) {
      shortcuts.splice(index, 1);
    }
  }
}

export function cleanAllShortcut() {
  shortcuts.length = 0;
}
