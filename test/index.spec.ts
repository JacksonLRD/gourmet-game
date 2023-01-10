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
      expect(novoPrato.branchDish).toEqual(pratoGalho);
      expect(novoPrato.leafDish).toEqual(pratoFolha);
    });
    it("Should create a new dish without all properties", () => {
      const nomeDoPrato = "Massa";

      const novoPrato = dishFactory(nomeDoPrato);

      expect(novoPrato.value).toEqual(nomeDoPrato);
      expect(novoPrato.branchDish).toBeUndefined();
      expect(novoPrato.leafDish).toBeUndefined();
    });
  });
});
