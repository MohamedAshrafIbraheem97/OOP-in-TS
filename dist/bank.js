"use strict";
class Bank {
    constructor(code, address, accounts) {
        this._address = address;
        this._code = code;
        this._accounts = accounts;
    }
    getAccounts() {
        console.log("getting accounts...");
        return this._accounts;
    }
}
class Account {
    constructor(_balance = 0) {
        this._balance = _balance;
        this._accountNumber = this.generateAccountNumber();
    }
    get accountNumber() {
        return this._accountNumber;
    }
    get balance() {
        return this._balance;
    }
    set setBalance(v) {
        this._balance = v;
    }
    generateAccountNumber() {
        return "acc" + Date.now();
    }
    deposite(amountToBeDeposited) {
        try {
            this.setBalance += amountToBeDeposited;
            return true;
        }
        catch (e) {
            throw new Error("An error occured while depositing");
        }
    }
    withdrawWithLimit(amountToBeWithdrawn, WithdrawLimit) {
        try {
            if (amountToBeWithdrawn > WithdrawLimit)
                return "You exceeded the limit of withdraw operation can't be done!";
            else
                return this.withdrawWithoutLimit(amountToBeWithdrawn);
        }
        catch (error) {
            throw new Error("An error has hapened while trying to withdraw!");
        }
    }
    withdrawWithoutLimit(amountToBeWithdrawn) {
        try {
            if (this.balance < amountToBeWithdrawn)
                return "Your balance is not enough";
            this.setBalance -= amountToBeWithdrawn;
            return "Thank you for dealing with us, Please take your money.";
        }
        catch (e) {
            throw new Error("An error has hapened while trying to withdraw!");
        }
    }
}
class CheckingAccount extends Account {
}
class SavingAccount extends Account {
    constructor(balance) {
        super(balance);
    }
    withdraw(amountToBeWithdrawn) {
        let withdrawLimit = 400;
        try {
            return super.withdrawWithLimit(amountToBeWithdrawn, withdrawLimit);
        }
        catch (e) {
            throw new Error("An error has hapened while trying to withdraw!");
        }
    }
    AddInterest() {
        this.deposite(this.balance * 0.01);
    }
}
let accountsList = [];
let mido = new SavingAccount(500);
let hos = new SavingAccount(1500);
let bedo = new CheckingAccount(200);
accountsList.push(mido);
accountsList.push(hos);
accountsList.push(bedo);
let NBE = new Bank("nbe", "helwan", accountsList);
console.log(NBE.getAccounts());
