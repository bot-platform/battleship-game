import Group = Phaser.GameObjects.Group;

export class Main extends Phaser.Scene {

  private bgSpriteSize = 128;
  private bgScale = 0.23;
  private cellSize = this.bgSpriteSize * this.bgScale;

  create(): void {
    this.add.tileSprite(0, 0, this.game.canvas.width / this.bgScale, this.game.canvas.height / this.bgScale, 'bg').setOrigin(0, 0).setScale(this.bgScale, this.bgScale);
    this.createBoard("Left player", 2, 4);
    this.createBoard("Right player", 15, 4);
  }

  private createBoard(name: string, cellX, cellY): Group {

    // const leftBoard = this.add.grid(size, size * 3, size * 10, size * 10, size, size, 0xe2e2e2, 0x808080, 0x9c9c00).setOrigin(0, 0);
    // leftBoard.setInteractive();
    // leftBoard.on("pointerdown", (e) => {
    //   this.sound.play("destroy", {
    //     volume: 0.1,
    //   });
    // });

    const [x1, y1] = [this.cellSize * cellX, this.cellSize * cellY];
    const lineSize = this.cellSize * 10;
    const lineColor = 0xf00;

    const graphics = this.add.graphics({ lineStyle: { width: 3, color: 0x0000aa }, fillStyle: { color: 0xaa0000 } });
    const rect = new Phaser.Geom.Rectangle(x1, y1, lineSize, lineSize);

    graphics.strokeRectShape(rect);

    const group = this.add.group();

    const title = this.add.text(x1, y1, name, { fill: '#00f' });
    title.setPosition(rect.getLineD().x1, rect.getLineD().x2);
    title.setFontSize(26);
    title.setInteractive();
    title.on("pointerdown", (e) => {
      title.destroy();
    });

    group.add(title);

    return group;
  }

  update() {

  }
}
