class Card {
    constructor(value, suit) {
        if (value && suit){
            this.value = value;
            this.suit = suit;
            return this;
        }
        return null;
    }
}

class Deck {
    constructor(){
        this.deck = [];
        for (let i = 1; i <= 13; i++) {
            this.deck.push(new Card(i , "of Hearts"));
            this.deck.push(new Card(i , "of Diamonds"));
            this.deck.push(new Card(i , "of Clubs"));
            this.deck.push(new Card(i , "of Spades"));
        }
        return this;
    }

    shuffle() {
        for (let i = this.deck.length - 1; i > 0; i--){
            let swapIdx = Math.floor(Math.random() * (i+1));
            let temp = this.deck[i];
            this.deck[i] = this.deck[swapIdx];
            this.deck[swapIdx] = temp;
        }
        return this;
    }

    reset() {
        this.deck = new Deck().deck;
        return this;
    }

    deal() {
        this.shuffle();
        return this.deck.pop();
    }
}

class Player {
    constructor(name) {
        this.name = name ? name : "Anonymous";
        this.hand = [];
    }

    draw(deck) {
        if (!deck instanceof Deck) {
            return null;
        }

        this.hand.push(deck.deal());
        return this;
    }

    discard(card) {
        if (!card){
            this.hand.pop();
            return this;
        }

        if (!card instanceof Card) {
            return null;
        }

        for (let i = 0; i < this.hand.length; i++){
            if (card == this.hand[i]) {
                if (i === this.hand.length - 1){
                    this.hand.pop();
                    return this;
                }
                const temp = this.hand[i];
                const lastIdx = this.hand.length - 1;
                this.hand[i] = this.hand[lastIdx];
                this.hand[lastIdx];
                this.hand.pop();
                return this;
            }
        }

        return null;
    }
}

var deck = new Deck();
console.log(deck.shuffle().reset().deal());
let player = new Player();
console.log(player.draw(deck).draw(deck).draw(deck).draw(deck).draw(deck).discard().hand);