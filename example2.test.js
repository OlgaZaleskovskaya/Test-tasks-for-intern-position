const { isEven } = require("./myScript");

test("Returns true if **num** is even && pozitive || negative", () => {
  const result = isEven(200);
  expect(result).toBe(true);
});

test("Returns false if **num** is odd && pozitive || negative", () => {
    const result = isEven(-201);
    expect(result).toBe(false);
  });

test("Throws an error if **num** is not an integer number", () => {
  const result = isEven(200.1);
  expect(result).toThrow();
});


test("Returns true if **num** is equal 0", () => {
    const result = isEven(0);
    expect(result).toBeFalse();
  });
