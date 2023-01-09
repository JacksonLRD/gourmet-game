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

export const dishFactory = (value: string, rightDish?: dish, leftDish?: dish): dish => {
  return {
    value,
    rightDish,
    leftDish,
  };
};

export const inputQuestion = async (
  message: string,
  defaultValue?: string
): Promise<inquirerResponse> => {
  if (defaultValue) {
    return inquirer.prompt({
      name: "response",
      type: "input",
      message,
      default() {
        return defaultValue;
      },
    });
  }
  return inquirer.prompt({
    name: "response",
    type: "input",
    message,
  });
};

export const listQuestion = async (
  message: string,
  choices: string[]
): Promise<inquirerResponse> => {
  return inquirer.prompt({
    name: "response",
    type: "list",
    message,
    choices,
  });
};

export async function startGame(): Promise<void> {
  await inputQuestion("Pense em um prato", "Ok");

  quizMain(pratos);
}

export async function quizAddDish(dish: dish): Promise<dish> {
  const messageOne = "Qual prato você pensou?";
  const answerOne = await inputQuestion(messageOne);
  const answerOneResponse = answerOne.response === "" ? "PRATO NAO ADICIONADO" : answerOne.response;

  const messageTwo = `${answerOneResponse} é ________, mas ${dish.value} não?`;
  const answerTwo = await inputQuestion(messageTwo);
  const answerTwoResponse = answerTwo.response === "" ? "PRATO NAO ADICIONADO" : answerTwo.response;

  return dishFactory(
    answerTwoResponse,
    {
      value: answerOneResponse,
    },
    { value: dish.value }
  );
}

export async function quizMain(dishes: dish): Promise<void> {
  const spinner = createSpinner();
  const message = `O prato que você escolheu é ${dishes.value}?`;
  const choices = ["SIM", "NAO"];

  const answer = await listQuestion(message, choices);
  const res = answer.response;

  if (res === "SIM") {
    if (dishes.rightDish) {
      await quizMain(dishes.rightDish);
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
      await quizMain(dishes.leftDish);
    } else {
      const newDish = await quizAddDish(dishes);

      dishes.value = newDish.value;
      dishes.leftDish = newDish.leftDish;
      dishes.rightDish = newDish.rightDish;

      startGame();
    }
  }
}

startGame();
