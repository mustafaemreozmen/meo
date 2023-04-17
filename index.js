#! /usr/bin/env node
const tk = require("terminal-kit").terminal;
const resume = require("./resume.json");
const { ResumeTerminal } = require("./ResumeTerminal");

const resumeTerminal = new ResumeTerminal(tk, resume);

resumeTerminal.render();