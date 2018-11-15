new Vue ({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startGame: function() {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        attack: function() {
            var damage = this.calculateDame(3, 10);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits monster for ' + damage
            });
            if(this.checkWin()) {
                return;
            }
            this.monsterAttack();
        },
        specialAttack: function() {
            var damage = this.calculateDame(10, 20);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true, 
                text: 'Player hits monster for ' + damage
            });

            if(this.checkWin()) {
                return;
            }
            this.monsterAttack();
        },
        heal: function() {
            if(this.playerHealth <= 90) {
                this.playerHealth += 10;
                this.turns.unshift({
                    isPlayer: true, 
                    text : 'Player heals for 10'
                });
            } else {
                this.turns.unshift({
                    isPlayer: true, 
                    text : 'Player heals for ' + (100 - this.playerHealth)
                });
                this.playerHealth = 100;
                
            }
            this.monsterAttack();
        },
        giveUp: function() {
            this.gameIsRunning = false;
        },
        calculateDame: function(min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        monsterAttack: function() {
            var damage = this.calculateDame(5, 12);
            this.playerHealth -= damage;
            this.turns.unshift({'isPlayer': false, 'text': 'Monster hits player for ' + damage});
            this.checkWin();
        },
        checkWin: function() {
            if(this.monsterHealth <= 0) {
                if(confirm('You won! New Game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            } else if (this.playerHealth <=0) {
                if(confirm('You lost! New Game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;    
        }
    }
})