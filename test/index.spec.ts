import { dishFactory } from "../src/index";

describe("index", () => {
  describe("dishFactory", () => {
    it("Should create a new dish", () => {
      const nomeDoPrato = "Massa";
      const pratoGalho = {
        value: "Lasanha",
      };
      const pratoFolha = {
        value: "Bolo de chocolate",
      };

      const novoPrato = dishFactory(nomeDoPrato, pratoGalho, pratoFolha);

      expect(novoPrato.value).toEqual(nomeDoPrato);
      expect(novoPrato.rightDish).toEqual(pratoGalho);
      expect(novoPrato.leftDish).toEqual(pratoFolha);
    });
    it("Should create a new dish without all properties", () => {
      const nomeDoPrato = "Massa";

      const novoPrato = dishFactory(nomeDoPrato);

      expect(novoPrato.value).toEqual(nomeDoPrato);
      expect(novoPrato.rightDish).toBeUndefined();
      expect(novoPrato.leftDish).toBeUndefined();
    });
  });
});
