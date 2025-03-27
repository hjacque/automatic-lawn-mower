# Automatic Lawn Mower

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [Running the Application](#running-the-application)
  - [Running Tests](#running-tests)
  - [Linting & Formatting](#linting--formatting)
- [Input Format](#input-format)
- [Expected Output](#expected-output)

## Overview

This project implements an automatic lawn mower that navigates a rectangular lawn based on a set of predefined instructions. The mower can rotate left, rotate right, and move forward while staying within the lawn's boundaries.

## Features

- Reads an input file specifying lawn dimensions, mower positions, and movement instructions.
- Moves each mower sequentially according to the given commands.
- Outputs the final position and orientation of each mower.

## Installation

Ensure you have [Node.js](https://nodejs.org/) installed, then run:

```sh
npm install
```

## Usage

### Running the Application

To build and start the application with your input file, run:

```sh
npm run build
npm start -- <input-file>
```

### Running Tests

To execute unit tests using Jest:

```sh
npm run test
```

For test coverage:

```sh
npm run test:cover
```

### Linting & Formatting

To lint code:

```sh
npm run lint
```

To automatically fix lint issues:

```sh
npm run lint:fix
```

To check formatting:

```sh
npm run format
```

To automatically fix formatting:

```sh
npm run format:write
```

## Input Format

The input file should follow this structure:

```
5 5  # Upper-right corner coordinates of the lawn
1 2 N # coordinates and orientation of the first mower
LFLFLFLFF # instruction set for the first mower
3 3 E # coordinates and orientation of the second mower
FFRFFRFRRF # instruction set for the second mower
```

You can have as many mowers as you wish.

## Expected Output

The program will output the final positions of the mowers:

```
1 3 N
5 1 E
```
