# Advent of Code 2023

Easy setup and running of Advent of Code 2023 puzzles, aimed at TypeScript solutions (could be modified for other runtimes).

## Setup

Fork the repo, delete branch `main` (that'll be my code) then checkout branch `starter` into your own `main` branch!

Create a file called `.env` in the project root, and add the following:

```
WEB_SESSION=<your aoc session cookie>
```

Go to [https://adventofcode.com/2023](https://adventofcode.com/2023) and sign in, then get the value of the `session` cookie, and put it into the value for `WEB_SESSION` in `.env`

## Usage
Two commands are available: `setup` and `start`  
`yarn setup {DAY} [--force] [--fetch]`  
`yarn start {DAY} p{PART} [-t|--test-data] [-d|--debug]`

### New Day
tl;dr: `yarn setup --fetch`

To start on a new day, run `yarn setup {DAY}` eg. `yarn setup 5` for December 5th. Will default to the current day if no day is provided.

This will create the folder for the day, with all the templated files. If you need to recreate this for some reason, add `--force`.

It can also be configured to fetch the real data for the day's test, simply provide the `--fetch` flag. (This is off by default, but you'll mostly want to include it)

You must (for now) copy-paste the test-data manually into `data-test.txt`

### Files

Each day is divided into: 
- data files (`data.txt` and `data-test.txt`)
- solution files (`part1.ts` and `part2.ts`), which contain your actual logic
- a format file (`format.ts`), which is used to parse the data files into a usable format for the solution files
- a test file (`test.ts`), which you can optionally use to test your solutions

### Execution
tl;dr: `yarn today p{PART} [-t]`

To test your solutions, run `yarn start {DAY}` eg. `yarn start 5` for December 5th.
Can also run `yarn today` to infer current day.

A `part` flag is required, as each AoC puzzle is split into two parts. (eg. `yarn start 5 p1` or `yarn today p2`)

To run on test data, add the `-t` flag. (eg. `yarn start 5 p1 -t`)

To run in debug mode, add the `-d` flag. (eg. `yarn start 5 p1 -d`). Can mostly ignore this, sometimes useful for printing out the data in a nice format or to a file (eg. some of the grid puzzles)

## Utils
There are some relatively puzzle-agnostic utils in `utils/*` that you are free to use. Some (`data.ts`) are required for the runner to work, so be careful if you remove these.

I like to add to this folder as the month goes on, (eg with `grid.ts`, [example here from previous year](https://github.com/mattbalmer/advent-of-code-2022/blob/main/utils/grid.ts)), feel free to do the same!