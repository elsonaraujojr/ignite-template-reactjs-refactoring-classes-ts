import { createServer, Model, Response } from "miragejs";

createServer({
  models: {
    food: Model,
  },

  seeds(server) {
    server.db.loadData({
      foods: [
        {
          id: 1,
          name: "Espaguete ao molho",
          description: "Macarrão ao molho branco, pudim e cheiro verde das montanhas",
          price: "19.90",
          available: true,
          image: "https://storage.googleapis.com/golden-wind/bootcamp-gostack/desafio-food/food1.png",
          createdAt: new Date("2020-01-01 09:00:00"),
        },
        {
          id: 2,
          name: "Veggie",
          description: "Macarrão com pimentão, ervilha e ervas finas colhidas no himalaia.",
          price: "21.90",
          available: true,
          image: "https://storage.googleapis.com/golden-wind/bootcamp-gostack/desafio-food/food2.png",
          createdAt: new Date("2020-01-02 09:00:00"),
        },
        {
          id: 3,
          name: "Espaguete",
          description: "Macarrão com vegetais de primeira linha e camarão dos 7 mares.",
          price: "25.99",
          available: false,
          image: "https://storage.googleapis.com/golden-wind/bootcamp-gostack/desafio-food/food3.png",
          createdAt: new Date("2020-01-03 09:00:00"),
        },
      ],
    });
  },

  routes() {
    this.namespace = "api";

    this.get("/foods", () => {
      return this.schema.all("food");
		});

		this.get("/movies/:id", (schema, request) => {
      let id = request.params.id;

      return this.schema.find( "foods" ,id);
    });

    this.post("/foods", (_schema, request) => {
			const newFood = JSON.parse(request.requestBody);

      const food = this.schema.create("food", newFood);

      return food;
		});
		
		this.delete("/foods/:id", (_schema, request) => {
			const { id } = request.params;
			const foodDeleted = this.schema.find("food", id)?.destroy();
			let status = foodDeleted ? 404 : 204;
			
			return new Response(status);
		});

		this.put("/foods/:id", (_schema, request) => {
      const { id } = request.params;
			const upFood = JSON.parse(request.requestBody);
      const food = this.schema.find("food", id)?.update(upFood);
			let headers = { };
			let data = food ? food : {};
			let status = food ? 201 : 404;

      return new Response(status, headers, data);
    });
  },
});