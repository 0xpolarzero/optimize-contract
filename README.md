Forked and modified by polarzero from [5/9 design system](https://fiveoutofnine.com).

[Original repo](https://github.com/fiveoutofnine/www)

---

- replace optimize_deps (name)
- replace optimize_deps_description (description)
- replace optimize_deps_url (url)
- replace https://github.com/0xpolarzero/optimize-dependencies (github url)
- replace optimize_deps_github_name (github name)
- regenerate og image for home, and add it as public/static/og-images/home.png
  http://localhost:3000/api/og/page?title=optimize_deps&description=optimize_deps_description&path=/

---

- [x] paste imports, show diff with replaced imports
- [x] have for each common contract (openzeppelin) a name associated with different kinds of imports (forge remappings, using node modules, etc... maybe better to just take the path that is always here)
- [x] have it mapped to an alternative object, e.g.

  - [x] solady: audited, auditlink, repo, instructions to download as a whole

  - [x] (CANCELED) import, instructions to use (different that oz)

---

- [x] Support Openzeppelin
- [x] Support Solmate
- [ ] Support multicall contracts (find mostly used implementations) => https://github.com/Vectorized/multicaller
- [ ] pattern matching: some kind of airdrop, recommend optimized solution
- [ ] Thirdweb contracts (e.g. DropERC20Token): do you really need all this? recommend simpler solution (maybe with a template??)
