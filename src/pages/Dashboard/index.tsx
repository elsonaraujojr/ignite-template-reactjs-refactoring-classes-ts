import { useEffect, useState } from "react";
import Food from "../../components/Food";
import Header from "../../components/Header";
import ModalAddFood from "../../components/ModalAddFood";
import ModalEditFood from "../../components/ModalEditFood";
import { api } from "../../services/api";
import { FoodsContainer } from "./styles";

interface IFood {
  id: number;
  name?: string;
  description?: string;
  price?: number;
  available?: boolean;
  image?: string;
  createdAt?: string;
}

export default function Dashboard() {
  const [foods, setFoods] = useState<IFood[]>([]);
  const [editingFood, setEditingFood] = useState<IFood>({} as IFood);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    const getFoods = async () => {
      const foods = await api
        .get("/foods")
        .then((response) => response.data.foods);
      setFoods(foods);
    };
    getFoods();
  }, []);

  const handleAddFood = async (
    food: Omit<IFood, "id" | "available">
  ): Promise<void> => {
    try {
      const newFood = await api
        .post("/foods", {
          ...food,
          available: true,
          createdAt: new Date(),
        })
        .then((response) => response.data.food);

      setFoods([...foods, newFood]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateFood = async (
    food: Omit<IFood, "id" | "available">
  ): Promise<void> => {
    try {
      const foodUpdated = await api
        .put(`/foods/${editingFood.id}`, {
          ...editingFood,
          ...food,
        })
        .then((response) => response.data.food);

      const foodsUpdated = foods.map((food) =>
        food.id !== foodUpdated.id ? food : foodUpdated
      );

      setFoods(foodsUpdated);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteFood = async (id: number) => {
    try {
      const status = await api
        .delete(`/foods/${id}`)
        .then((response) => response.status);

      if (status === 204) {
        const foodsFiltered = foods.filter((food) => food.id !== id);
        setFoods(foodsFiltered);
      } else {
				throw new Error("Error deleting food from database");
			}
    } catch (err) {
      console.error(err);
    }
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const toggleEditModal = () => {
    setEditModalOpen(!editModalOpen);
  };

  const handleEditFood = (food: IFood) => {
    setEditModalOpen(true);
    setEditingFood(food);
  };

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map((food) => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  );
}
// const { modalOpen, editModalOpen, editingFood, foods } = this.state;
