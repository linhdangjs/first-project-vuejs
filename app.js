new Vue ({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false
    },
    methods: {
        startGame: function() {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
        },
        attack: function() {
            this.monsterHealth -= this.calculateDame(3, 10);

            if(this.checkWin()) {
                return;
            }
            this.monsterAttack();
        },
        specialAttack: function() {
            this.monsterHealth -= this.calculateDame(10, 20);

            if(this.checkWin()) {
                return;
            }
            this.monsterAttack();
        },
        heal: function() {

        },
        giveUp: function() {

        },
        calculateDame: function(min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        monsterAttack: function() {
            this.playerHealth -= this.calculateDame(5, 12);
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