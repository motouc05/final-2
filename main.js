class Enemy extends Item {
  constructor(name, descriptor) {
    super(name, descriptor)
  }

  kill() {
    addLine("You killed the " + this.name)
  }
}

player = new Player()

let killaction = /kill/;
let kill = function(action, player, object) {
  if (action == 'kill') {
    try {
      throw object.kill()
    }
    catch(e) {
      if(e != null) {
        addLine("You can't do that.")
      }
    }
  }
  return player
}
addAction(killaction, kill);

start = new Room('dusty hallway', 'It is dusty.')
enemy = new Enemy('enemy', 'kill it before it kills you')
table = new Item('table', 'its made out of wood.')
bedroom = new Room('Bedroom', 'its a kid bedroom.')
knife = new Item('knife', 'cut things with it.')
apple = new Item('apple', 'eat it if youre about to die.')
start.addItem(enemy)
start.addItem(table)
start.addItem(bedroom)
Bedroom.addItem(knife)
Bedroom.addItem(apple)
player.move(start)

function myTimer() {
  //do this every second
  let enemy = false
  for(i in player.location.contents) {
    let l = player.location.contents;
    if(l[i].name == 'enemy') {
      player.hp--;
      addLine("You have " + player.hp + " hit points left.")
    }
  }
  if(player.hp <= 0) {
    location.reload()
  }
}

var damage = setInterval(myTimer, 1000);
