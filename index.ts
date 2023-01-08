import { createSpinner } from "nanospinner";
import inquirer from "inquirer";

type tipoDoPrato = {
  nome: string;
  pratos: tipoDoPrato[];
};

type inquirerResponse = {
  response: string;
};

const pratosIniciais: tipoDoPrato[] = [
  {
    nome: "Massa",
    pratos: [
      {
        nome: "Lasanha",
        pratos: [],
      },
    ],
  },
  {
    nome: "Bolo de Chocolate",
    pratos: [],
  },
];

const spinner = createSpinner();
let count = 0;

async function negativeAnswer(prato: string): Promise<tipoDoPrato | null> {
  const answer1: inquirerResponse = await inquirer.prompt({
    name: "response",
    type: "input",
    message: "Qual prato voce pensou?",
  });
  const answer2: inquirerResponse = await inquirer.prompt({
    name: "response",
    type: "input",
    message: `${answer1.response} eh ________, mas ${prato} nao?`,
  });

  if (!answer1 || !answer2) return null;
  return {
    nome: answer2.response,
    pratos: [
      {
        nome: answer1.response,
        pratos: [],
      },
    ],
  };
}

async function question(pratos: tipoDoPrato): Promise<tipoDoPrato | void> {
  console.log(JSON.stringify(pratos));

  const answer: inquirerResponse = await inquirer.prompt({
    name: "response",
    type: "list",
    message: `O prato que voce escolheu eh ${pratos.nome}`,
    choices: ["SIM", "NAO"],
  });

  const flag = answer.response === "SIM" ? true : false;

  console.log("count: ", count);

  if (flag) {
    if (pratos.pratos.length) {
      let novoPrato: tipoDoPrato | null;

      for (const prato of pratos.pratos) {
        const pratoAtual = await question(prato);

        if (pratoAtual) novoPrato = pratoAtual;
        if (novoPrato) pratos.pratos.shift();
      }
    } else {
      spinner.success({ text: count > 0 ? "Acertei de novo! :)" : "Acertei!" });
      count += 1;
      await incio();
    }
  } else {
    const novoPrato = await negativeAnswer(pratos.nome);
    if (novoPrato) {
      pratos.pratos.push(novoPrato);
    }
    console.log(JSON.stringify(pratos));
    await incio();
  }
}

async function incio() {
  // const spinner = createSpinner().start();
  await inquirer.prompt({
    name: "inicio",
    type: "input",
    message: "Pense em um prato",
    default() {
      return "Ok";
    },
  });
  question(pratosIniciais[0]);
}

await incio();

// nao reconhece um array
