import ReconnectingWebSocket from 'reconnecting-websocket';

export class Boot extends Phaser.Scene {
  private phaserSprite: Phaser.GameObjects.Sprite;

  init(data: any): void {

    const rws = new ReconnectingWebSocket(data.server);

    rws.addEventListener('open', (event) => {
      rws.send('hello!');
    });

    rws.addEventListener('message', (event) => {

    });

    rws.addEventListener('close', (event) => {

    });

    rws.addEventListener('error', (event) => {
      this.game.events.emit("websocket-error", event);
    });
  }

  preload(): void {
    this.progressBar();
    this.load.image("logo", "./src/assets/phaser.png");
    this.load.image("bg", "./src/assets/bg.png");
  }

  create(data: any): void {
    const scale = 0.30;
    const bg = this.add.tileSprite(0, 0, this.game.canvas.width / scale, this.game.canvas.height / scale, 'bg').setOrigin(0, 0).setScale(scale, scale);
    // this.phaserSprite = this.add.sprite(400, 300, "logo").setDepth(2);
  }

  update(time: number, delta: number) {
    this.scene.start('Main');
  }


  private progressBar(): void {

    const progress = this.add.graphics();

    this.load.on('progress', function (value) {
      progress.clear();
      progress.fillStyle(0xffffff, 1);
      progress.fillRect(0, 270, 800 * value, 60);
    });

    this.load.on('complete', function () {
      progress.destroy();
    });
  }
}
