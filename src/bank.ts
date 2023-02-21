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
  private _accountNumber: string;

  constructor(private _balance: number = 0) {
    this._accountNumber = this.generateAccountNumber();
  }

  get accountNumber() {
    return this._accountNumber;
  }

  get balance() {
    return this._balance;
  }

  protected set setBalance(v: number) {
    this._balance = v;
  }

  private generateAccountNumber() {
    return "acc" + Date.now();
  }

  protected deposite(amountToBeDeposited: number): boolean {
    try {
      this.setBalance += amountToBeDeposited;
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
      if (amountToBeWithdrawn > WithdrawLimit)
        return "You exceeded the limit of withdraw operation can't be done!";
      else return this.withdrawWithoutLimit(amountToBeWithdrawn);
    } catch (error) {
      throw new Error("An error has hapened while trying to withdraw!");
    }
  }

  protected withdrawWithoutLimit(amountToBeWithdrawn: number): string {
    try {
      if (this.balance < amountToBeWithdrawn)
        return "Your balance is not enough";

      this.setBalance -= amountToBeWithdrawn;
      return "Thank you for dealing with us, Please take your money.";
    } catch (e) {
      throw new Error("An error has hapened while trying to withdraw!");
    }
  }
}

class CheckingAccount extends Account {}

class SavingAccount extends Account {
  constructor(balance: number) {
    super(balance);
  }

  withdraw(amountToBeWithdrawn: number): string {
    let withdrawLimit = 400;

    try {
      return super.withdrawWithLimit(amountToBeWithdrawn, withdrawLimit);
    } catch (e) {
      throw new Error("An error has hapened while trying to withdraw!");
    }
  }

  AddInterest() {
    this.deposite(this.balance * 0.01);
  }
}

let accountsList: Account[] = [];

let mido = new SavingAccount(500);
let hos = new SavingAccount(1500);
let bedo = new CheckingAccount(200);
accountsList.push(mido);
accountsList.push(hos);
accountsList.push(bedo);

let NBE = new Bank("nbe", "helwan", accountsList);
console.log(NBE.getAccounts());
