#!/usr/bin/env/node

const { readFileSync } = require("fs");
const yargs = require("yargs");
const { inferSchema } = require("../lib");

const builder = (command) =>
  command.positional("file", {
    describe: "The file to infer the schema from",
    type: "string",
  });

const handler = ({ file }) => {
  // Read the file and parse the json
  const raw = readFileSync(file, "utf8").toString();

  const document = JSON.parse(raw);

  const inferredSchema = inferSchema(document);

  const schema = inferredSchema.toJSONSchema({ includeSchema: true });

  console.log(JSON.stringify(schema, null, 2));
};

yargs.command("$0 <file>", "Infer the schema from a json file", builder, handler).parse();
