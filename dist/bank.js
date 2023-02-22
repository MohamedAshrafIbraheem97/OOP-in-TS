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
    get customers() {
        return this._customers;
    }
    set customers(v) {
        if (v.length <= this.MAX_CUSTOMER_NUMBER &&
            this.customers.length <= this.MAX_CUSTOMER_NUMBER) {
            v.forEach((customer) => {
                this._customers.push(customer);
            });
        }
        else {
            throw new Error("Account can have two customers only!");
        }
    }
    constructor(_balance = 0, customers) {
        this._balance = _balance;
        this.MAX_CUSTOMER_NUMBER = 2;
        this._customers = [];
        this._accountNumber = this.generateAccountNumber();
        this.customers = customers;
    }
    get accountNumber() {
        return this._accountNumber;
    }
    get balance() {
        return this._balance;
    }
    set balance(v) {
        this._balance = v;
    }
    generateAccountNumber() {
        return "acc" + Date.now();
    }
    deposite(amountToBeDeposited) {
        try {
            this.balance += amountToBeDeposited;
            console.log(`You deposited: ${amountToBeDeposited} EGP`);
            return true;
        }
        catch (e) {
            throw new Error("An error occured while depositing");
        }
    }
    withdrawWithLimit(amountToBeWithdrawn, WithdrawLimit) {
        try {
            if (amountToBeWithdrawn > WithdrawLimit) {
                return "You exceeded the limit of withdraw operation can't be done!";
            }
            else {
                console.log(`You want to withdraw: ${amountToBeWithdrawn} EGP`);
                return this.withdrawWithoutLimit(amountToBeWithdrawn);
            }
        }
        catch (error) {
            throw new Error("An error has hapened while trying to withdraw!");
        }
    }
    withdrawWithoutLimit(amountToBeWithdrawn) {
        try {
            if (this.balance < amountToBeWithdrawn) {
                return `Your balance is not enough because you reuqested ${amountToBeWithdrawn}EGP and your total balance is ${this.balance}EGP`;
            }
            this.balance -= amountToBeWithdrawn;
            return "Thank you for dealing with us, Please take your money.";
        }
        catch (e) {
            throw new Error("An error has hapened while trying to withdraw!");
        }
    }
}
class Customer {
    get pin() {
        return this._pin;
    }
    set pin(v) {
        this._pin = v;
    }
    get account() {
        return this._account;
    }
    set account(v) {
        this._account = v;
    }
    constructor(name, address, dob, account) {
        this.name = name;
        this.address = address;
        this.dob = dob;
        this._cardNumber = this.generateCardNumber();
        this._pin = 1111;
        this._account = account;
    }
    generateCardNumber() {
        return "card" + Date.now();
    }
    verifyPassword(enteredPassword) {
        return enteredPassword === this.pin;
    }
}
class CheckingAccount extends Account {
    constructor(balance, customers) {
        super(balance, customers);
    }
    withdraw(amountToBeWithdrawn) {
        try {
            console.log(super.withdrawWithoutLimit(amountToBeWithdrawn));
        }
        catch (e) {
            throw new Error("An error has hapened while trying to withdraw!");
        }
    }
}
class SavingAccount extends Account {
    constructor(balance, customers) {
        super(balance, customers);
    }
    withdraw(amountToBeWithdrawn) {
        let withdrawLimit = 400;
        try {
            console.log(super.withdrawWithLimit(amountToBeWithdrawn, withdrawLimit));
        }
        catch (e) {
            throw new Error("An error has hapened while trying to withdraw!");
        }
    }
    AddInterest() {
        this.deposite(this.balance * 0.01);
    }
}
class ATM {
    constructor(location, mangedBy) {
        this.location = location;
        this.mangedBy = mangedBy;
        this.isAuthenticated = false;
    }
    login(customer, pin) {
        if (customer.verifyPassword(pin))
            this.isAuthenticated = true;
        else
            this.isAuthenticated = false;
        return this.isAuthenticated;
    }
    withdraw(customer, amount) {
        if (customer.account instanceof SavingAccount) {
            customer.account.withdraw(amount);
        }
        else if (customer.account instanceof CheckingAccount) {
            customer.account.withdraw(amount);
        }
    }
    deposite(customer, amount) {
        customer.account.deposite(amount);
    }
    checkBalance(customer) {
        console.log(`Your balance is: ${customer.account.balance.toFixed(2)} EGP`);
    }
}
// testing the code
let accountsList = [];
let midoAcc = new SavingAccount(200, []);
let mido = new Customer("mido", "4st @city", new Date(1997, 2, 1), midoAcc);
midoAcc.customers = [mido];
let hanaAcc = new SavingAccount(1500, []);
let hana = new Customer("hana", "4st @city", new Date(1997, 2, 1), hanaAcc);
hanaAcc.customers = [hana, mido];
let hemaAcc = new CheckingAccount(200, []);
let hema = new Customer("hima", "4st @city", new Date(1997, 2, 1), hemaAcc);
hemaAcc.customers = [hema];
accountsList.push(midoAcc);
accountsList.push(hanaAcc);
accountsList.push(hemaAcc);
let NBE = new Bank("nbe", "helwan", accountsList);
let atm1 = new ATM("helwan", NBE);
let atm2 = new ATM("maadi", NBE);
console.log(NBE.getAccounts());
if (atm1.login(mido, 1111)) {
    atm1.checkBalance(mido);
    atm1.deposite(mido, 50);
    atm1.checkBalance(mido);
    atm1.withdraw(mido, 200);
    atm1.withdraw(mido, 50);
    atm1.withdraw(mido, 50);
}
