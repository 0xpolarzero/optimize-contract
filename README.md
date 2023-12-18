# optimize_deps

A basic solution to find better optimized dependencies for a Solidity smart contract.

## Features

Paste a smart contract with its imports, and it will replace them with optimized dependencies (currently OpenZeppelin/Solmate => Solady), with:

- the imports diff;
- links to the new contracts;
- short description, list of updated contracts, audit status of the library.

Design forked and modified from [5/9's website](https://fiveoutofnine.com).

## TODO

- [x] Support Openzeppelin
- [x] Support Solmate
- [x] Support multicall contracts (find mostly used implementations) => recommend https://github.com/Vectorized/multicaller
- [ ] Consider [this](https://github.com/lambdalf-dev/ethereum-contracts) for ERC721 batch operations (need to run benchmarks with Solady)
- [ ] Pattern matching: recognize some kind of airdrop pattern => recommend an optimized solution (Gaslite drop)
- [ ] Thirdweb contracts (e.g. DropERC20Token): do you really need all this? recommend a simpler solution (maybe provide some templates??)
- [ ] Provide some gas benchmarks diff for each replaced contracts (e.g. OZ ERC20 => Solady ERC20 ~x% gas savings, with links)

## Replace when branding is done

- replace optimize_deps (name)
- replace optimize_deps_description (description)
- replace optimize_deps_url (url)
- replace https://github.com/0xpolarzero/optimize-dependencies (github url)
- replace optimize_deps_github_name (github name)
- regenerate og image for home, and add it as public/static/og-images/home.png
  http://localhost:3000/api/og/page?title=optimize_deps&description=optimize_deps_description&path=/
