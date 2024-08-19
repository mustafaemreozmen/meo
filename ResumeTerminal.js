class ResumeTerminal {
  #resumeObj;
  #tk;
  #singleColumnMenu;

  constructor(tk, resumeObj) {
    this.#resumeObj = resumeObj;
    this.#tk = tk;
  }

  slowTyping = async (str, color) => {
    if (!str) throw new Error("String cannot be empty");

    await this.#tk.bold.slowTyping(str, {
      style: this.#tk[color],
      flashStyle: this.#tk.white,
      delay: 50,
    });
  };

  drawImage = async (width, height) => {
    await this.#tk.drawImage(this.#resumeObj.photoUri, {
      shrink: {
        width,
        height,
      },
    });
  };

  singleColumnMenu = (resume) => {
    this.#singleColumnMenu = this.#tk.singleColumnMenu(Object.keys(resume), {
      y: this.#tk.height + 2,
      submittedLeftPadding: " ➡️ ",
      leftPadding: " · ",
      cancelable: true,
      exitOnUnexpectedKey: true,
      continueOnSubmit: true,
      selectedStyle: this.#tk.bgBlue,
      submittedStyle: this.#tk.bold.bgYellow,
      extraLines: 3,
    });

    this.#singleColumnMenu.on("submit", (arg) =>
      this.#singleColumnMenuSettings(arg)
    );
  };

  #singleColumnMenuSettings = (arg) => {
    if (arg.canceled) process.exit(0);
    this.#tk.nextLine(Object.keys(this.#resumeObj).length * 2);
    this.#tk.bold.yellow(
      JSON.stringify(this.#resumeObj[arg.selectedText], null, "  ")
    );
    this.#tk.green("\n\nDo you need another information? (CTRL+C for exit)");
    this.singleColumnMenu(this.#resumeObj);
  };

  render = async () => {
    this.#tk.clear();
    this.#tk.wrapColumn({ x: 10, width: 25 });
    this.#tk.on("key", (key) => {
      if (key == "CTRL_C" || key == "ESC") {
        this.#tk.grabInput(false);
        process.exit(0);
      }
    });

    await this.drawImage(50, 50);
    await this.slowTyping("\nHi! I'm ", "magenta");
    await this.slowTyping(
      `${this.#resumeObj.name} ${this.#resumeObj.surname}\n`,
      "white"
    );
    this.#tk
      .brightBlue("I'm a ")
      .bold.yellow(`${this.#resumeObj.workExperience.at(0)?.title} `)
      .brightBlue("from ")
      .bold.red(
        `${this.#resumeObj.links.find((x) => x.type == "ADDRESS")?.value}\n\n`
      );
    await this.slowTyping("Choose for more detail:");
    this.singleColumnMenu(this.#resumeObj);
  };
}

module.exports = {
  ResumeTerminal,
};
