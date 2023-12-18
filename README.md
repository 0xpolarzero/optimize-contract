# optimize_deps

A basic solution to find better optimized dependencies for a Solidity smart contract, as well as a few basic best practices for saving gas.

IMAGE

Design forked and modified from [5/9's website](https://fiveoutofnine.com).

## Features

| Input                       | Output                            | Details                                                     |
| --------------------------- | --------------------------------- | ----------------------------------------------------------- |
| OpenZeppelin dependency     | Solady alternative (if it exists) | Imports diff, links, description, updated contracts, audits |
| Solmate dependency          | Solady alternative (if it exists) | Imports diff, links, description, updated contracts, audits |
| Openzeppelin Multicall      | Solady Multicaller                | Imports diff, links, description, updated contracts, audits |
| ERC721 batch operations     | Advice and mock mitigation        | Imports diff, links, description, updated contracts, audits |
| Events emitted inside loops | Advice and mock mitigation        | Code diff, basic modification                               |
| Airdrop pattern             | Advice and alternative            | Mitigation, link to alternative method (Gaslite Drop)       |
| Thirdweb contracts          | Advice and alternative (?)        | Mitigation, template for alternative method (?)             |

## TODO

- [x] Support Openzeppelin
- [x] Support Solmate
- [x] Support multicall contracts (find mostly used implementations) => recommend https://github.com/Vectorized/multicaller
- [ ] Recognize events emitted inside loops, recommend {Event}Batch outside
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
