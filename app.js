new Vue ({
    el: '#app',
    data: {
        playerHealth: 100,
        playerAngry: 0,
        isFullAngry: false,
        monsterHealth: 100,
        isPlayerLowHP: false,
        isMonsterLowHP: false,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startGame: function() {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.playerAngry = 0;
            this.isFullAngry = false;
            this.isPlayerLowHP = false;
            this.isMonsterLowHP = false;
            this.turns = [];
        },
        attack: function() {
            var damage = this.calculateDame(3, 10);
            this.monsterHealth -= damage;
            this.checkMonsterHP();
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
            if(this.isFullAngry) {
                this.playerAngry = 0;
                var damage = this.calculateDame(15, 25);
                this.monsterHealth -= damage;
                this.checkMonsterHP();
                this.turns.unshift({
                    isOP: true, 
                    text: 'Player Use Ultimate for ' + damage
                });
    
                if(this.checkWin()) {
                    return;
                }
                this.monsterAttack();
            } else {
                return;
            }
        
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
            this.playerAngry -= 20;
            this.isFullAngry = false;
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
            this.checkPlayerHP();
            this.upAngry();
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
        },
        upAngry: function() {
            if((this.playerAngry + 20) < 100) {
                this.isFullAngry = false;
                this.playerAngry += 20;
            } else {
                this.playerAngry = 100;
                this.isFullAngry = true;
                this.turns.unshift({
                    isWarning: true,
                    text: 'Special Attack Ready!!!'
                });
            }
            
        }, 
        checkPlayerHP: function() {
            if(this.playerHealth <= 20) {
                this.isPlayerLowHP = true;
            } else {
                this.isPlayerLowHP = false;
            }
        },
        checkMonsterHP: function() {
            if(this.monsterHealth <= 20) {
                this.isMonsterLowHP = true;
            } else {
                this.isMonsterLowHP = false;
            }
        },

    }
})