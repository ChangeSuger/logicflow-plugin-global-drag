import LogicFlow from '@logicflow/core';

export class GlobalDrag implements LogicFlow.Extension {
  static pluginName = 'global-drag';
  // LogicFlow 实例
  lf: LogicFlow;
  background: HTMLDivElement;
  prePosition: LogicFlow.Position = { x: 0, y: 0 };
  isSpaceDown = false;

  constructor({ lf }: LogicFlow.IExtensionProps) {
    this.lf = lf;
    const div = document.createElement('div');
    div.style.width = '100%';
    div.style.height = '100%';
    div.style.cursor = 'move';
    div.style.zIndex = '-99999';
    div.style.position = 'absolute';
    div.style.inset = '0';

    div.addEventListener('mousedown', this.startDrag);
    this.background = div;
  }

  private startDrag = (e: MouseEvent) => {
    document.addEventListener('mousemove', this.drag);
    document.addEventListener('mouseup', this.drop);
    const { x, y } = e;
    this.prePosition = { x, y };
  }

  private drag = (e: MouseEvent) => {
    const { x, y } = e;
    const deltaX = (x - this.prePosition.x);
    const deltaY = (y - this.prePosition.y);
    this.prePosition = { x, y };
    this.lf.translate(deltaX, deltaY);
  }

  private drop = () => {
    document.removeEventListener('mousemove', this.drag);
    document.removeEventListener('mouseup', this.drop);
  }

  render = () => {
    this.lf.container.appendChild(this.background);

    this.lf.keyboard.on('space', (e) => {
      e.preventDefault();
      if (this.isSpaceDown) {
        return;
      }
      this.isSpaceDown = true;
      this.background.style.zIndex = '99999';
    }, 'keydown');

    this.lf.keyboard.on('space', (e) => {
      e.preventDefault();
    }, 'keypress');

    this.lf.keyboard.on('space', (e) => {
      e.preventDefault();
      if (!this.isSpaceDown) {
        return;
      }
      this.isSpaceDown = false;
      this.background.style.zIndex = '-99999';
    }, 'keyup');
  }
}