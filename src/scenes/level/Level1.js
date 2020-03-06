import loader from '../../utils/loader'
import backgroundImg from '../../assets/background.jpg'
import { babySprite } from '../../assets/sprite'
import { clickSound } from '../../assets/audio'
import Character from '../../entities/Character'
import { generateRandomLevel } from '../../utils/helpers'

class Level1 extends Phaser.Scene {
	constructor() {
		super('Level1')
		this.isLevel = true
	}

	init(data) { }

	preload() {
		loader(this)

		this.load.image('background', backgroundImg)
		this.load.image('char-0', babySprite)
		this.load.audio('char-0-happy', clickSound)
	}

	create(data) {
		console.log(generateRandomLevel(1))
		this.scene.launch('Hud')
		this.scene.bringToTop('Hud')

		this.add.sprite(0, 0, 'background').setOrigin(0, 0)

		this.input.on('pointerup', function () {
			this.game.events.emit('addScore')
		}, this)

		// TODO: Iterate trough all levels available
		const babyHappySound = this.sound.add('char-0-happy')
		const babyCharacter = new Character({
			scene: this,
			key: 'char-0',
			x: 140,
			y: 250
		})

		babyCharacter.on('pointerup', function () {
			babyHappySound.play()
		}, this)
	}

	update(time, delta) { }
}


export default Level1