# Contributing to Ember Tooltips

Thank you for taking 30 seconds to read the contributing instructions.

tl;dr:

- Issue PRs from a feature branch on your fork, not master ([instructions here](#creating-a-fork))
- Make sure you create your PR off the correct branch:
  - `master` for `4.x` improvements and bug fixes
- Please include tests and README updates with any new features

Instructions to follow these guidelines are detailed below.

## 1. Creating a fork

You can create a fork of this addon with the following steps.

Please install dependencies using yarn so you avoid checking in a `package-lock.json` file.

```sh
git clone https://github.com/sir-dunxalot/ember-tooltips.git
cd ember-tooltips
yarn install # Use yarn, not npm

# Start with the branch for the relevant version of Ember Tooltips:

git checkout master # For 4.x changes

# Create your feature branch from which you will issue a PR to sir-dunxalot/ember-tooltips#master:

git branch -b your-feature

# Start development

ember s # Start server

# Keep code well formatted

yarn lint # To report on errors
yarn lint:fix # To attempt to auto-fix errors
```

## 2. Adding test coverage

Please include tests and documentation updates with any new features and bugfixes.

To run the test suite, visit the `/tests` route in the browser after running `ember s`.

If you want to run the test suite for a given ember-try scenario, you can use CLI commands:

```sh
# To run the test suite for a given ember-try scenario:
ember try:one ember-lts-3.24 --- ember serve # https://localhost:4200

# To run the tests for all scenarios in config/ember-try.js
ember try:testall
```

## 3. Updating documentation

Please update the README.md when making public changes.

Don't worry about updating the dummy app, which is hosted at http://sir-dunxalot.github.io/ember-tooltips/.
