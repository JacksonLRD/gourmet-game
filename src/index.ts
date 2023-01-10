import inquirer from "inquirer";
import { createSpinner } from "nanospinner";
import { dish } from "./@types/dishType.js";
import { InquirerResponse } from "./@types/InquirerResponse.js";

const pratos: dish = {
  value: "Massa",
  branchDish: {
    value: "Lasanha",
  },
  leafDish: {
    value: "Bolo de chocolate",
  },
};

let count = 0;

export const dishFactory = (value: string, branchDish?: dish, leafDish?: dish): dish => {
  return {
    value,
    branchDish,
    leafDish,
  };
};

export const inputQuestion = async (
  message: string,
  defaultValue?: string
): Promise<InquirerResponse> => {
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
): Promise<InquirerResponse> => {
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
    if (dishes.branchDish) {
      await quizMain(dishes.branchDish);
    } else {
      spinner.success({
        text: count < 1 ? "Acertei!" : "Acertei de novo! 😎",
      });

      count += 1;
      startGame();
    }
  }
  if (res === "NAO") {
    if (dishes.leafDish) {
      await quizMain(dishes.leafDish);
    } else {
      const newDish = await quizAddDish(dishes);

      dishes.value = newDish.value;
      dishes.leafDish = newDish.leafDish;
      dishes.branchDish = newDish.branchDish;

      startGame();
    }
  }
}

startGame();
