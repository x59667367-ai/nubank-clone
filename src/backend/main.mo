actor {
  var balance : Text = "0.00";

  public query ({ caller }) func getBalance() : async Text {
    balance;
  };

  public shared ({ caller }) func setBalance(newBalance : Text) : async () {
    balance := newBalance;
  };
};
