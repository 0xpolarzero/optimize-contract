Forked and modified by polarzero from [5/9 design system](https://fiveoutofnine.com).

[Original repo](https://github.com/fiveoutofnine/www)

---

- replace optimize_contracts (name)
- replace optimize_contracts_description (description)
- replace optimize_contracts_url (url)

---

- paste imports, show diff with replaced imports
- have for each common contract (openzeppelin) a name associated with different kinds of imports (forge remappings, using node modules, etc... maybe better to just take the path that is always here)
- have it mapped to an alternative object, e.g.
  -> solady: audited, auditlink, repo, instructions to download as a whole
  -> import, instructions to use (different that oz)
- different kind of recommendations: gas savings (e.g. solady is a "sure" import bc strongly audited), maybe recommendations with just ideas, depending on the use case
