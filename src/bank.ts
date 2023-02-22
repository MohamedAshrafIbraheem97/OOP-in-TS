class Bank {
  private _code: string;
  private _address: String;
  private _accounts: Account[];

  constructor(code: string, address: string, accounts: Account[]) {
    this._address = address;
    this._code = code;
    this._accounts = accounts;
  }

  getAccounts(): Account[] {
    console.log("getting accounts...");
    return this._accounts;
  }
}

abstract class Account {
  private readonly MAX_CUSTOMER_NUMBER = 2;
  private _accountNumber: string;

  private _customers: Customer[] = [];
  public get customers(): Customer[] {
    return this._customers;
  }
  public set customers(v: Customer[]) {
    if (
      v.length <= this.MAX_CUSTOMER_NUMBER &&
      this.customers.length <= this.MAX_CUSTOMER_NUMBER
    ) {
      v.forEach((customer) => {
        this._customers.push(customer);
      });
    } else {
      throw new Error("Account can have two customers only!");
    }
  }

  constructor(private _balance: number = 0, customers: Customer[]) {
    this._accountNumber = this.generateAccountNumber();
    this.customers = customers;
  }

  get accountNumber() {
    return this._accountNumber;
  }

  get balance() {
    return this._balance;
  }

  protected set balance(v: number) {
    this._balance = v;
  }

  private generateAccountNumber() {
    return "acc" + Date.now();
  }

  deposite(amountToBeDeposited: number): boolean {
    try {
      this.balance += amountToBeDeposited;
      console.log(`You deposited: ${amountToBeDeposited} EGP`);

      return true;
    } catch (e) {
      throw new Error("An error occured while depositing");
    }
  }

  protected withdrawWithLimit(
    amountToBeWithdrawn: number,
    WithdrawLimit: number
  ): string {
    try {
      if (amountToBeWithdrawn > WithdrawLimit) {
        return "You exceeded the limit of withdraw operation can't be done!";
      } else {
        console.log(`You want to withdraw: ${amountToBeWithdrawn} EGP`);
        return this.withdrawWithoutLimit(amountToBeWithdrawn);
      }
    } catch (error) {
      throw new Error("An error has hapened while trying to withdraw!");
    }
  }

  protected withdrawWithoutLimit(amountToBeWithdrawn: number): string {
    try {
      if (this.balance < amountToBeWithdrawn) {
        return `Your balance is not enough because you reuqested ${amountToBeWithdrawn}EGP and your total balance is ${this.balance}EGP`;
      }

      this.balance -= amountToBeWithdrawn;
      return "Thank you for dealing with us, Please take your money.";
    } catch (e) {
      throw new Error("An error has hapened while trying to withdraw!");
    }
  }
}

class Customer {
  private _cardNumber: string;

  private _pin: number;
  private get pin(): number {
    return this._pin;
  }
  private set pin(v: number) {
    this._pin = v;
  }

  private _account: SavingAccount | CheckingAccount;
  public get account(): SavingAccount | CheckingAccount {
    return this._account;
  }
  public set account(v: SavingAccount | CheckingAccount) {
    this._account = v;
  }

  constructor(
    public name: string,
    public address: string,
    public dob: Date,
    account: SavingAccount | CheckingAccount
  ) {
    this._cardNumber = this.generateCardNumber();
    this._pin = 1111;
    this._account = account;
  }

  private generateCardNumber() {
    return "card" + Date.now();
  }

  verifyPassword(enteredPassword: number): boolean {
    return enteredPassword === this.pin;
  }
}

class CheckingAccount extends Account {
  constructor(balance: number, customers: Customer[]) {
    super(balance, customers);
  }

  withdraw(amountToBeWithdrawn: number) {
    try {
      console.log(super.withdrawWithoutLimit(amountToBeWithdrawn));
    } catch (e) {
      throw new Error("An error has hapened while trying to withdraw!");
    }
  }
}

class SavingAccount extends Account {
  constructor(balance: number, customers: Customer[]) {
    super(balance, customers);
  }

  withdraw(amountToBeWithdrawn: number) {
    let withdrawLimit = 400;

    try {
      console.log(super.withdrawWithLimit(amountToBeWithdrawn, withdrawLimit));
    } catch (e) {
      throw new Error("An error has hapened while trying to withdraw!");
    }
  }

  AddInterest() {
    this.deposite(this.balance * 0.01);
  }
}

class ATM {
  private isAuthenticated: boolean = false;
  constructor(private location: string, private mangedBy: Bank) {}

  login(customer: Customer, pin: number): boolean {
    if (customer.verifyPassword(pin)) this.isAuthenticated = true;
    else this.isAuthenticated = false;
    return this.isAuthenticated;
  }

  withdraw(customer: Customer, amount: number) {
    if (customer.account instanceof SavingAccount) {
      customer.account.withdraw(amount);
    } else if (customer.account instanceof CheckingAccount) {
      customer.account.withdraw(amount);
    }
  }

  deposite(customer: Customer, amount: number) {
    customer.account.deposite(amount);
  }

  checkBalance(customer: Customer) {
    console.log(`Your balance is: ${customer.account.balance.toFixed(2)} EGP`);
  }
}

// testing the code

let accountsList: Account[] = [];

let midoAcc: SavingAccount = new SavingAccount(200, []);
let mido: Customer = new Customer(
  "mido",
  "4st @city",
  new Date(1997, 2, 1),
  midoAcc as SavingAccount
);
midoAcc.customers = [mido];

let hanaAcc: SavingAccount = new SavingAccount(1500, []);
let hana: Customer = new Customer(
  "hana",
  "4st @city",
  new Date(1997, 2, 1),
  hanaAcc as SavingAccount
);
hanaAcc.customers = [hana, mido];

let hemaAcc: CheckingAccount = new CheckingAccount(200, []);
let hema: Customer = new Customer(
  "hima",
  "4st @city",
  new Date(1997, 2, 1),
  hemaAcc as CheckingAccount
);
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
