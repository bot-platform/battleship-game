import "phaser";
import { Main } from "./scenes/main";
import { Boot } from "./scenes/boot";

class Game extends Phaser.Game {
  constructor(config: GameConfig) {
    super(config);
    this.scene.add("Boot", Boot, false);
    this.scene.add("Main", Main, false);
  }
}

export type Options = {
  // websocket server
  server: string;
  // DOM element where to inject the game
  parent: HTMLElement;
};

// Class represents wrapper for Phaser game object and exposure high-level API to control game.
export class Battleship {
  private phaserGame: Game;

  constructor(private options: Options) {
    console.debug('Creating game with: ', options);
    if (!options.server) {
      throw new Error('server is required');
    }
    if (!options.parent) {
      throw new Error('parent is required');
    }
    this.phaserGame = new Game(<GameConfig>{
      width: 800,
      height: 600,
      type: Phaser.AUTO,
      parent: options.parent,
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 200 }
        }
      }
    });
    this.phaserGame.events.on("websocket-error", function (payload) {
      console.debug(`websocket error: `, payload);
    });
  }

  // it runs first game scene
  public run(): void {
    this.phaserGame.scene.run("Boot", { server: this.options.server });
  }
}

// defines global property to test game using development server
Object.defineProperty(window, "Battleship", <PropertyDescriptor>{
  value: Battleship,
});
