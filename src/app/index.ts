import chalk from "chalk";
import { createSpinner } from "nanospinner";
import inquirer from "inquirer";

type tipoDoPrato = {
  nome: string;
  prato: tipoDoPrato[] | [];
};

// const massa: tipoDoPrato = {
//   nome: "massa",
//   prato: [
//     {
//       nome: "frito",
//       prato: [
//         {
//           nome: "empanado",
//           prato: [
//             {
//               nome: "bolinha de queijo",
//               prato: [],
//             },
//             {
//               nome: "pastel",
//               prato: [],
//             },
//           ],
//         },
//       ],
//     },
//     {
//       nome: "lasanha",
//       prato: [],
//     },
//   ],
// };

const pratos: tipoDoPrato = {
  nome: "massa",
  prato: [
    {
      nome: "lasanha",
      prato: [],
    },
  ],
};

const str = "O prato que voce pensou eh [prato]";

async function handleAnswer(isCorrect) {
  const spinner = createSpinner("Checking answer...").start();
  await sleep();

  if (isCorrect) {
    spinner.success({ text: `Nice work ${playerName}. That's a legit answer` });
  } else {
    spinner.error({ text: `💀💀💀 Game over, you lose ${playerName}!` });
    process.exit(1);
  }
}

async function askName() {
  const answers = await inquirer.prompt({
    name: "player_name",
    type: "input",
    message: "What is your name?",
    default() {
      return "Player";
    },
  });

  playerName = answers.player_name;
}

async function question() {
  const answers = await inquirer.prompt({
    name: "question_1",
    type: "list",
    message: "JavaScript was created in 10 days then released on\n",
    choices: [
      "May 23rd, 1995",
      "Nov 24th, 1995",
      "Dec 4th, 1995",
      "Dec 17, 1996",
    ],
  });

  return handleAnswer(answers.question_1 === "Dec 4th, 1995");
}

// const arrGeral = [arrMassa, boloChocolate];

// console.log("PENSE EM UM PRATO");

// const prato: any = null;

// console.log(str.replace("[prato]", "massa"));

// const res1 = true;

// if (res1) console.log(str.replace("[prato]", "lasanha"));

// const prat3: prato = { value: "pastel" };

// const prat3Type: pratoType = {
//   nome: "fritura",
//   pratos: [prat3],
// };

// arrMassa.push(prat3Type);

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

console.log(JSON.stringify(pratosIniciais));

async function question(pratos: tipoDoPrato): Promise<tipoDoPrato | void> {
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

    incio();
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
