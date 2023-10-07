
export default class Inventory {

    constructor() {
        this.items = [];
    }

    addItem(item) {
        const itemKey = Object.keys(this.items).find(key => this.items[key].name === item.name);

        if (itemKey) {
            this.items[itemKey].quantity += item.quantity;
        } else {
            this.items[itemKey] = item;
        }

    }

    removeItem(item) {
        const itemKey = Object.keys(this.items).find(key => this.items[key].name === item.name);

        if (itemKey) {
            this.items[itemKey].quantity--;
            if (this.items[itemKey].quantity <= 0) {
                delete this.items[itemKey];
            }
        }
    }

    getItem(item) {
        return this.items[item];
    }

    getItemQuantity(itemName) {
        return Object.values(this.items).filter(i=>i.name===itemName).map(i => i.quantity).reduce((accumulator, currentValue) => accumulator + currentValue,0);
      }


}
