import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { Mysolanaapp } from "../target/types/mysolanaapp";

describe("mysolanaapp", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  const program = anchor.workspace.Mysolanaapp as Program<Mysolanaapp>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.rpc.initialize({});
    console.log("Your transaction signature", tx);
  });
});
