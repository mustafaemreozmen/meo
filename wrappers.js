const slowTyping = async (tk, str, color) => {
  if (!str) throw new Error("String cannot be empty");

  await tk.bold.slowTyping(str, {
    style: tk[color],
    flashStyle: tk.white,
    delay: 50,
  });
};

const drawImage = async (tk, resume) => {
  //Draw an image...
  await tk.drawImage(resume.photoUri, {
    shrink: {
      width: 50,
      height: 50,
    },
  });
};

const singleColumnMenu = (tk, resume) => {
  const constructedMenu = tk.singleColumnMenu(Object.keys(resume), {
    submittedLeftPadding: " ➡️ ",
    leftPadding: " · ",
    cancelable: true,
    exitOnUnexpectedKey: true,
    continueOnSubmit: true,
    selectedStyle: tk.bgBlue,
    submittedStyle: tk.bold.bgYellow,
  });

  constructedMenu.on("submit", singleColumnMenuSettings(tk, resume));
};

const singleColumnMenuSettings = (tk, resume) => (arg) => {
  if (arg.canceled) process.exit(0);
  tk.nextLine(Object.keys(resume).length);
  tk.wrapColumn(75).bold.yellow(
    JSON.stringify(resume[arg.selectedText], null, "  ")
  );
  tk.nextLine(10).green("Do you need another information? (CTRL+C for exit)");
  singleColumnMenu(tk, resume);
};

module.exports = {
  slowTyping,
  drawImage,
  singleColumnMenu,
  singleColumnMenuSettings,
};
