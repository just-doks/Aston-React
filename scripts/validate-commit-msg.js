#!/usr/bin/env node

const { readFileSync } = require("fs");

const msgPath = process.argv[2];
const commitMsg = readFileSync(msgPath, "utf-8").trim();

const commitRegex = /^(just-doks|Run4gate|HandleWith) \[(feat|fix|chore|refactor)\]: .+/;

if (!commitRegex.test(commitMsg)) {
  console.error(
    `\x1b[31mERROR:\x1b[0m Коммит сообщение не соответствует формату:\n\n` +
      `  <just-doks|Run4gate|HandleWith> [feat|fix|chore|refactor]: описание\n\n` +
      `Ваше сообщение: "${commitMsg}"\n`
  );
  process.exit(1);
}

console.log("\x1b[32mКоммит сообщение корректно\x1b[0m");