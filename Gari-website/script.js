// Usingsing Petra Wallet Adapter
const connectWalletBtn = document.getElementById("connectWalletBtn");

connectWalletBtn.addEventListener("click", async () => {
  try {
    if (window.aptos) {
      const response = await window.aptos.connect();
      const accountAddress = response.address;
      
      // Display the connected wallet address
      console.log("Connected Wallet Address:", accountAddress);

    } else {
      alert("Please install the Petra Wallet extension.");
    }
  } catch (error) {
    console.error("Error connecting wallet:", error);
  }
});