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

const pratos: dish = {
  value: "Massa",
  rightDish: {
    value: "Lasanha",
  },
  leftDish: {
    value: "Bolo de chocolate",
  },
};

let count = 0;

export const dishFactory = (
  value: string,
  rightDish?: dish,
  leftDish?: dish
): dish => {
  return {
    value,
    rightDish,
    leftDish,
  };
};

export async function startGame(): Promise<void> {
  await inquirer.prompt({
    name: "inicio",
    type: "input",
    message: "Pense em um prato",
    default() {
      return "Ok";
    },
  });

  startQuiz(pratos);
}

export async function createNewDish(dish: dish): Promise<dish> {
  const answerOne: inquirerResponse = await inquirer.prompt({
    name: "response",
    type: "input",
    message: "Qual prato você pensou?",
  });
  const answerOneResponse =
    answerOne.response === "" ? "PRATO NAO ADICIONADO" : answerOne.response;

  const answerTwo: inquirerResponse = await inquirer.prompt({
    name: "response",
    type: "input",
    message: `${answerOneResponse} é ________, mas ${dish.value} não?`,
  });
  const answerTwoResponse =
    answerTwo.response === "" ? "PRATO NAO ADICIONADO" : answerTwo.response;

  return dishFactory(
    answerTwoResponse,
    {
      value: answerOneResponse,
    },
    { value: dish.value }
  );
}

export async function startQuiz(dishes: dish): Promise<void> {
  const spinner = createSpinner();

  const answer: inquirerResponse = await inquirer.prompt({
    name: "response",
    type: "list",
    message: `O prato que você escolheu é ${dishes.value}?`,
    choices: ["SIM", "NAO"],
  });
  const res = answer.response;

  if (res === "SIM") {
    if (dishes.rightDish) {
      await startQuiz(dishes.rightDish);
    } else {
      spinner.success({
        text: count < 1 ? "Acertei!" : "Acertei de novo! 😎",
      });

      count += 1;
      startGame();
    }
  }
  if (res === "NAO") {
    if (dishes.leftDish) {
      await startQuiz(dishes.leftDish);
    } else {
      const newDish = await createNewDish(dishes);

      dishes.value = newDish.value;
      dishes.leftDish = newDish.leftDish;
      dishes.rightDish = newDish.rightDish;

      startGame();
    }
  }
}

startGame();
