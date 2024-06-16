//:!:>moon
module MoonCoin::moon_coin {
    use aptos_framework::coin;

    struct MoonCoin {}

    fun init_module(sender: &signer) {
        aptos_framework::managed_coin::initialize<MoonCoin>(
            sender,
            b"ChaChing",
            b"CHING",
            6,
            false,
        );
    }

    public entry fun register(account: &signer) {
        aptos_framework::managed_coin::register<MoonCoin>(account)
    }

    public entry fun mint(account: &signer, dst_addr: address, amount: u64) {
        aptos_framework::managed_coin::mint<MoonCoin>(account, dst_addr, amount);
    }

    public entry fun burn(account: &signer, amount: u64) {
        aptos_framework::managed_coin::burn<MoonCoin>(account, amount);
    }

    public entry fun transfer(from: &signer, to: address, amount: u64,) {
        coin::transfer<MoonCoin>(from, to, amount);
    }
}
//<:!:moon
