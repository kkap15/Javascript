const { expect } = require("@jest/globals");
const { getCompletedTasks, getTodoTasks } = require("./script");


//This tests the counter when "completed" parameter of json is true.
it("get number of tasks completed 1", async() => {
    const completedTasks = await getCompletedTasks(true, 8);
    expect(completedTasks).toEqual(9);
})

it("get number of tasks completed 2", async() => {
    const completedTasks = await getCompletedTasks(false, 2);
    expect(completedTasks).toEqual(2);
})
//This tests the counter when "completed" parameter of json is false.
it("get number of tasks left 1", async() => {
    const todoTasks = await getTodoTasks(false, 0);
    expect(todoTasks).toEqual(1);  
})

//This tests the counter when "completed" parameter of json is true.
it("get number of tasks left 2", async() => {
    const todoTasks = await getTodoTasks(true, 1);
    expect(todoTasks).toEqual(1);
})

