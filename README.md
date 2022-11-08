# Clockify API Client CLI

This is a CLI tool used to work with the Clockify API.

## Setup

1. Ensure you have Node.js and npm installed
2. Clone this repo
3. In the repo's folder in your terminal, run `cp .env{.example,}`
4. Edit `.env` with the API key associated with your Clockify account
5. Install dependencies with `npm install`

## Commands

The best way to understand the CLI is to just run it - if you don't specify any arguments, it will print out the available commands:

> Notice the `--` on the command line; this is required for NPM to send all of your arguments to the CLI

```
> npm start --

Usage: clockify-api-client [options] [command]

Options:
  -h, --help      display help for command

Commands:
  clients         Interact with clockify client data
  projects        Interact with clockify project data
  reports         Interact with clockify reporting data
  users           Interact with clockify user data
  help [command]  display help for command
```

Running `help` with one of the commands will give you more details about the options available for the specific command:

```
> npm start -- reports summary --help

Usage: clockify-api-client reports summary [options]

Fetch summary report data

Options:
  -f, --format <format>          The format to output the data in. (choices: "JSON", default: "JSON")
  -t, --target <target>          The destination file to output the data to. If not specified then output will be echoed to the terminal.
  --start <date>                 ISO8601 formatted start date; defaults to 1 month before now (default: "2022-10-07T11:00:00.000Z")
  --end <date>                   ISO8601 formatted end date; defaults to now (default: "2022-11-07T11:00:00.000Z")
  --filterGroups [filterGroups]  The summary filter groups to use (default: ["CLIENT","PROJECT","USER"])
  -h, --help                     display help for command

```
