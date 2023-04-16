#! /usr/bin/env node
const tk = require("terminal-kit").terminal;
const resume = require("./resume.json");
const { slowTyping, drawImage, singleColumnMenu } = require("./wrappers");

async function render() {
  tk.wrapColumn({ x: 10, width: 25 });
  tk.on("key", (key) => {
    if (key == "CTRL_C" || key == "ESC") {
      tk.grabInput(false);
      tk.nextLine;
      process.exit(0);
    }
  });

  await drawImage(tk, resume);
  await slowTyping(tk, "\nHello! My name is ", "magenta");
  await slowTyping(tk, `${resume.name} ${resume.surname}\n`, "white");
  tk.brightBlue("I'm a ")
    .bold.yellow(`${resume.workExperience.at(0)?.title} `)
    .brightBlue("from ")
    .bold.red(`${resume.links.find((x) => x.type == "ADDRESS")?.value}\n\n`);
  await slowTyping(tk, "Choose for more detail:");
  singleColumnMenu(tk, resume);
}

render();
