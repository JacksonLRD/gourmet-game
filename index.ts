import { createSpinner } from "nanospinner";
import inquirer from "inquirer";

type dish = {
  value: string;
  rightDish?: dish;
  leftDish?: dish;
};

type inquirerResponse = {
  response: string;
};

const pratosIniciais: dish = {
  value: "Massa",
  rightDish: {
    value: "Lasanha",
  },
  leftDish: {
    value: "Bolo de chocolate",
  },
};

const spinner = createSpinner();

async function negativeAnswer(prato: dish): Promise<dish | null> {
  const answer1: inquirerResponse = await inquirer.prompt({
    name: "response",
    type: "input",
    message: "Qual prato voce pensou?",
  });
  const answer2: inquirerResponse = await inquirer.prompt({
    name: "response",
    type: "input",
    message: `${answer1.response} eh ________, mas ${prato.value} nao?`,
  });

  if (!answer1 || !answer2) return null;

  const novoPrato = {
    value: answer2.response,
    leftDish: {
      value: prato.value,
    },
    rightDish: {
      value: answer1.response,
    },
  };

  return novoPrato;
}

async function question(pratos: dish): Promise<void> {
  console.log("pratos: \n", pratos);

  const answer: inquirerResponse = await inquirer.prompt({
    name: "response",
    type: "list",
    message: `O prato que voce escolheu eh ${pratos.value}?`,
    choices: ["SIM", "NAO"],
  });
  const res = answer.response;

  console.log("res: \n", res);

  if (res === "SIM") {
    if (pratos.rightDish) {
      await question(pratos.rightDish);
    } else {
      spinner.success({
        text: "Acertei de novo! :)",
      });

      inicio();
    }
  }
  if (res === "NAO") {
    if (pratos.leftDish) {
      await question(pratos.leftDish);
    } else {
      const novoPrato = await negativeAnswer(pratos);
      console.log("novoPrato: \n", JSON.stringify(novoPrato));

      pratos.value = novoPrato.value;
      pratos.leftDish = novoPrato.leftDish;
      pratos.rightDish = novoPrato.rightDish;

      inicio();
    }
  }
}

async function inicio() {
  await inquirer.prompt({
    name: "inicio",
    type: "input",
    message: "Pense em um prato",
    default() {
      return "Ok";
    },
  });

  question(pratosIniciais);
}

inicio();
