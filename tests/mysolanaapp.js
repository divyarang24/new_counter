const anchor =require("@project-serum/anchor");
const { Program } =require("@project-serum/anchor");
const { Mysolanaapp } =require("../target/types/mysolanaapp");
const { SystemProgram } = require("@solana/web3.js");
const assert=require("assert");
describe("mysolanaapp", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.Mysolanaapp;
  const baseAccount = anchor.web3.Keypair.generate();
  it("Creates a counter)", async () => {
    /* Call the create function via RPC */
    await program.rpc.create({
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [baseAccount],
    });

    /* Fetch the account and check the value of count */
    const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log('Count 0: ', account.count.toString())
    assert.ok(account.count.toString() == 0);
   

  });

  it("Increments the counter", async () => {
    // const baseAccount = _baseAccount;

    await program.rpc.increment({
      accounts: {
        baseAccount: baseAccount.publicKey,
      },
    });

    const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log('Count 1: ', account.count.toString())
    assert.ok(account.count.toString() == 1);
  });
});