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
    this.load.image("logo", "./src/assets/phaser.png");
  }

  create(data: any): void {
    this.phaserSprite = this.add.sprite(400, 300, "logo");
  }

  update(time: number, delta: number) {
  }
}
