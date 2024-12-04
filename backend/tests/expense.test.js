describe("Expense API Tests", () => {
    let token;
  
    beforeAll(async () => {
      const res = await request(app)
        .post("/api/users/login")
        .send({ email: "sauravKharat@gmail.com", password: "password12345" });
  
      token = res.body.token;
    });
  
    it("should add a new expense", async () => {
      const res = await request(app)
        .post("/api/expenses")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Groceries",
          amount: 100,
          category: "Food",
          date: "2024-12-01"
        });
  
      expect(res.statusCode).toEqual(201);
      expect(res.body.expense).toHaveProperty("_id");
    });
  });
  