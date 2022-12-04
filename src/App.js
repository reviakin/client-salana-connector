import React from "react";
import "./App.css";

function App() {
  const [walletAddress, setWalletAddress] = React.useState(null);

  const checkIfWalletIsConnected = async () => {
    // We're using optional chaining (question mark) to check if the object is null
    if (window?.solana?.isPhantom) {
      console.log("Phantom wallet found!");
      /*
       * The solana object gives us a function that will allow us to connect
       * directly with the user's wallet
       */
      const response = await window.solana.connect({ onlyIfTrusted: true });
      console.log("Connected with Public Key:", response.publicKey.toString());

      /*
       * Set the user's publicKey in state to be used later!
       */
      setWalletAddress(response.publicKey.toString());
    } else {
      alert("Solana object not found! Get a Phantom Wallet 👻");
    }
  };

  React.useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  /*
   * We want to render this UI when the user hasn't connected
   * their wallet to our app yet.
   */
  const renderNotConnectedContainer = () => (
    <button onClick={connectWallet}>Connect to Wallet</button>
  );
  const connectWallet = async () => {
    const { solana } = window;

    if (solana) {
      const response = await solana.connect();
      console.log("Connected with Public Key:", response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
  };

  return (
    <div>
      <h1>My first web3 app</h1>
      {!walletAddress && renderNotConnectedContainer()}
    </div>
  );
}

export default App;
