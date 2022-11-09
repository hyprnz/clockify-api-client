[![Build-test](https://github.com/hyprnz/clockify-api-client/actions/workflows/build-test.yaml/badge.svg)](https://github.com/hyprnz/clockify-api-client/actions/workflows/build-test.yaml)

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


## Development

### Verifying s3 operations locally
You can test the save-to-s3 operations locally with localstack:

1. Assuming you have localstack running, start by creating a bucket:
    ```
    awslocal s3api create-bucket --bucket clockify-eg
    ```
1. Ensure your .env file is configured to use localstack:
    ```.env
    ...
    LOCALSTACK_S3_ENDPOINT=http://localhost:4566
    AWS_ACCESS_KEY_ID=local
    AWS_SECRET_ACCESS_KEY=local
    ...
    ```
1. Run a command to push some data into s3:
    ```
    npm start -- reports detail --pageSize 2 -t s3 -d clockify-eg -k dump.json
    ```
1. Verify the object was created, and that it contains the data you're expecting:
    ```
    awslocal s3api list-objects --bucket clockify-eg
    awslocal s3api get-object --bucket clockify-eg --key dump.json out.json
    cat out.json
    ```