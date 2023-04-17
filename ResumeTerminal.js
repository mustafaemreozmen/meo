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

  boldTyping = async (str, color) => {
    if (!str) throw new Error("String cannot be empty");
  
    await this.#tk.bold[color](str);
  }

  drawImage = async () => {
    //Draw an image...
    await this.#tk.drawImage(this.#resumeObj.photoUri, {
      shrink: {
        width: 50,
        height: 50,
      },
    });
  };

  singleColumnMenu = (resume) => {
     this.#singleColumnMenu = this.#tk.singleColumnMenu([...Object.keys(resume), "exit"], {
      submittedLeftPadding: " 🔘  ",
      leftPadding: " ⚪️  ",
      cancelable: true,
      exitOnUnexpectedKey: true,
      selectedLeftPadding: " 🔘  ",
      continueOnSubmit: true,
      selectedStyle: this.#tk.bgBlue,
      submittedStyle: this.#tk.bold.bgYellow,
    });
  
    this.#singleColumnMenu.on("submit", (arg) => this.#singleColumnMenuSettings(arg));
  };

  #singleColumnMenuSettings = (arg) => {
    if (arg.canceled || arg.selectedText == "exit") process.exit(0);
    this.#tk.clear();
    this.#tk.nextLine(1).green("Do you need another information? (CTRL+C for exit)").nextLine(2);
    this.boldTyping("Hi! I'm ", "magenta");
    this.boldTyping(`${this.#resumeObj.name} ${this.#resumeObj.surname}\n`, "white");
    this.#tk.brightBlue("I'm a ")
      .bold.yellow(`${this.#resumeObj.workExperience.at(0)?.title} `)
      .brightBlue("from ")
      .bold.red(`${this.#resumeObj.links.find((x) => x.type == "Based on")?.value}\n\n`);
    this.#tk.wrapColumn(75).bold.yellow(
      JSON.stringify(this.#resumeObj[arg.selectedText], null, "  ")
    ).nextLine(2);
    this.singleColumnMenu(this.#resumeObj);
  };

  render = async() => {
    this.#tk.clear();
    this.#tk.wrapColumn({ x: 10, width: 25 });
    this.#tk.on("key", (key) => {
      if (key == "CTRL_C" || key == "ESC") {
        this.#tk.grabInput(false);
        this.#tk.nextLine;
        process.exit(0);
      }
    });
  
    await this.drawImage();
    await this.slowTyping("\nHi! I'm ", "magenta");
    await this.slowTyping(`${this.#resumeObj.name} ${this.#resumeObj.surname}\n`, "white");
    this.#tk.brightBlue("I'm a ")
      .bold.yellow(`${this.#resumeObj.workExperience.at(0)?.title} `)
      .brightBlue("from ")
      .bold.red(`${this.#resumeObj.links.find((x) => x.type == "Based on")?.value}\n\n`);
    await this.slowTyping("Choose for more detail:");
    this.singleColumnMenu(this.#resumeObj);
  }
}


module.exports = {
  ResumeTerminal
};
